import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DictionaryService } from '@dictionaries/services';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import {
  IQueryParams,
  ITableColumn,
  ITableSchema,
  Paginated,
} from '@shared/interfaces';
import { takeWhile } from 'rxjs';
import { BaseTable } from '@shared/components';
import { DictionaryRecordModalComponent } from '@dictionaries/components';
import { ViewModeEnum } from '@shared/enums';

@Component({
  selector: 'app-dictionaries-table',
  templateUrl: './dictionaries-table.component.html',
  styleUrls: ['./dictionaries-table.component.scss'],
})
export class DictionariesTableComponent
  extends BaseTable
  implements OnInit, OnDestroy
{
  tableSchema?: ITableSchema;

  @Output() rowSelectEvent = new EventEmitter();

  constructor(
    private dictionaryService: DictionaryService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getTableData(this.qp);
  }

  ngOnDestroy(): void {
    this.cancelToken.cancel();
  }

  getTableData(qp: IQueryParams): void {
    this.isLoading = true;
    this.dictionaryService
      .getDictionaries$(qp)
      .pipe(takeWhile(() => this.cancelToken.isActive))
      .subscribe((data) => {
        this.setTableSchema();
        this.setTableData(data);
        this.isLoading = false;
      });
  }

  public onRowSelect(event: any): void {
    console.log(event);

    const { dictionaryId } = event;
    const path = `dictionaries/${dictionaryId}`;
    this.rowSelectEvent.emit(path);
  }

  private setTableSchema(): void {
    this.tableSchema = {
      title: 'Справочники',
      columns: this.setTableColumns(),
    };
  }

  private setTableColumns(): ITableColumn[] {
    return [
      {
        name: 'dictionaryId',
        title: 'ID',
      },
      {
        name: 'dictionaryTitle',
        title: 'Название',
      },
    ];
  }

  private setTableData(data: Paginated<any>): void {
    this.tableData = { ...data };
    this.setQueryParams(this.tableData);
  }
}
