import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { BaseTable } from '@shared/components';
import {
  DictionarySchemaField,
  DictionarySchema,
  RecordData,
} from '@dictionaries/models';
import {
  Paginated,
  IQueryParams,
  ITableColumn,
  ITableSchema,
} from '@shared/interfaces';
import { DictionaryService } from '@dictionaries/services';

@Component({
  selector: 'app-multi-lookup-options-table',
  templateUrl: './multi-lookup-options-table.component.html',
  styleUrls: ['./multi-lookup-options-table.component.scss'],
})
export class MultiLookupOptionsTableComponent
  extends BaseTable
  implements OnInit
{
  @Input() dictionaryId?: number;
  @Input() lookupDictionaryId?: number;
  @Input() recordId?: number;
  @Input() fieldName?: string;
  @Input() dictionarySchema?: DictionarySchema;

  @Output() closeModalEvent = new EventEmitter();

  selectedItems: Array<RecordData> = [];

  tableSchema?: ITableSchema;

  private dictionaryService: DictionaryService;
  private dialogService: DialogService;
  private confirmationService: ConfirmationService;

  constructor(
    dictionaryService: DictionaryService,
    dialogService: DialogService,
    confirmationService: ConfirmationService
  ) {
    super();
    this.dictionaryService = dictionaryService;
    this.dialogService = dialogService;
    this.confirmationService = confirmationService;
  }

  ngOnInit(): void {
    this.getTableData(this.qp);
  }

  onRowSelection(items: any) {
    this.selectedItems = [...items];
  }

  getTableData(qp: IQueryParams): void {
    this.isLoading = true;
    this.dictionaryService
      .getRecords$(this.dictionarySchema!, this.lookupDictionaryId!, qp)
      .subscribe((data) => {
        this.setTableData(data);
        this.setTableSchema();

        this.isLoading = false;
      });
  }

  private setTableSchema(): void {
    this.tableSchema = {
      title: this.dictionarySchema?.title,
      columns: this.setTableColumns(),
    };
  }

  private setTableColumns(): ITableColumn[] {
    if (!this.dictionarySchema) {
      return [];
    }

    return this.dictionarySchema.fields
      .filter((field: DictionarySchemaField) => field.isVisibleInList)
      .map(
        (field: DictionarySchemaField): ITableColumn => ({
          title: field.title,
          name: field.name,
          width: field.width,
          type: field.type,
        })
      );
  }

  private setTableData(data: Paginated<any>): void {
    this.tableData = { ...data };
    this.setQueryParams(this.tableData);
  }

  public addItems() {
    const data = {
      addItemIds: this.selectedItems.map((item) => item._ID_),
    };

    this.dictionaryService
      .saveMultiLookupField$(
        this.dictionaryId!,
        this.recordId!,
        this.fieldName!,
        data
      )
      .subscribe(() => {
        this.closeModalEvent.emit();
      });
  }
}
