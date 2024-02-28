import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { MultiLookupOptionsModalComponent } from '../multi-lookup-options-modal/multi-lookup-options-modal.component';
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
  selector: 'app-multi-lookup-items-table',
  templateUrl: './multi-lookup-items-table.component.html',
  styleUrls: ['./multi-lookup-items-table.component.scss'],
})
export class MultiLookupItemsTableComponent
  extends BaseTable
  implements OnInit
{
  @Input() dictionaryId?: number;
  @Input() lookupDictionaryId?: number;
  @Input() recordId?: number;
  @Input() fieldName?: string;
  @Input() dictionarySchema?: DictionarySchema;

  tableSchema?: ITableSchema;
  selectedItems: Array<RecordData> = [];

  constructor(
    private dictionaryService: DictionaryService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.qp = {
      ...this.qp,
      fieldName: this.fieldName,
    };

    this.setToolbarButtons();
    this.getTableData(this.qp);
  }

  onRowSelection(items: any) {
    this.selectedItems = [...items];
    this.setToolbarButtons();
  }

  getTableData(qp: IQueryParams): void {
    this.isLoading = true;
    this.dictionaryService
      .getMultiLookupField$(
        this.dictionarySchema!,
        this.dictionaryId!,
        this.recordId!,
        qp
      )
      .subscribe((data) => {
        console.log(data);
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

  private setToolbarButtons(): void {
    this.toolbarButtons = [
      {
        title: 'Добавить',
        icon: 'pi pi-plus',
        disabled: false,
        click: () => this.onAddButtonClick(),
      },
      {
        title: 'Удалить',
        icon: 'pi pi-times',
        disabled: !this.selectedItems.length,
        click: () => this.onDeleteButtonClick(),
      },
    ];
  }

  private onAddButtonClick(): void {
    const optionsDialogRef = this.dialogService.open(
      MultiLookupOptionsModalComponent,
      {
        data: {
          dictionaryId: this.dictionaryId,
          lookupDictionaryId: this.lookupDictionaryId,
          dictionarySchema: this.dictionarySchema,
          recordId: this.recordId,
          fieldName: this.fieldName,
        },
        header: 'Add Multi-lookup Item',
        width: '90%',
        maximizable: true,
      }
    );

    optionsDialogRef.onClose.subscribe(() => {
      this.getTableData(this.qp);
    });
  }

  private onDeleteButtonClick(): void {
    this.confirmationService.confirm({
      header: 'Подтверждение',
      message: 'Удалить записи?',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Да',
      acceptButtonStyleClass: 'p-button-sm',
      rejectLabel: 'Нет',
      rejectButtonStyleClass: 'p-button-sm p-button-secondary ',
      accept: () => this.deleteItems(),
    });
  }

  private deleteItems(): void {
    const data = {
      itemIds: this.selectedItems.map((item) => item._ID_),
    };

    this.dictionaryService
      .deleteMultiLookupField$(
        this.dictionaryId!,
        this.recordId!,
        this.fieldName!,
        data
      )
      .subscribe(() => {
        this.selectedItems = [];
        this.setToolbarButtons();
        this.getTableData(this.qp);
      });
  }
}
