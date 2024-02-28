import { Component, Input, OnInit } from '@angular/core';
import { DictionarySchema, RecordData } from '@dictionaries/models';
import {
  Paginated,
  IQueryParams,
  ITableColumn,
  ITableSchema,
} from '@shared/interfaces';
import { DictionaryService } from '@dictionaries/services';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { BaseTable } from '@shared/components';
import { FilesUploadComponent } from '@shared/components/files-field/files-upload/files-upload.component';

@Component({
  selector: 'app-files-table',
  templateUrl: './files-table.component.html',
  styleUrls: ['./files-table.component.scss'],
})
export class FilesTableComponent extends BaseTable implements OnInit {
  @Input() dictionaryId?: number;
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
  }

  getTableData(qp: IQueryParams): void {
    this.isLoading = true;
    this.dictionaryService
      .getFiles$(this.dictionaryId!, this.recordId!, qp)
      .subscribe((data) => {
        this.setTableData(data);
        this.setTableSchema();
        this.setActionMenu();
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
    return [
      {
        title: 'Название',
        name: 'FileName',
        width: 200,
        type: 5,
      },
      {
        title: 'Размер',
        name: 'FileLength',
        width: 200,
        type: 5,
      },
      {
        title: 'Тип',
        name: 'ContentType',
        width: 200,
        type: 5,
      },
    ];
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
    ];
  }

  private setActionMenu(): void {
    this.actionMenu = [];

    this.actionMenu.push({
      label: 'Удалить',
      icon: 'pi pi-times',
      command: (event: any) => this.onDeleteButtonClick(event),
    });
  }

  private onAddButtonClick(): void {
    const optionsDialogRef = this.dialogService.open(FilesUploadComponent, {
      data: {
        dictionaryId: this.dictionaryId,
        recordId: this.recordId,
        fieldName: this.fieldName,
      },
      header: 'Upload a file',
      width: '50%',
      maximizable: true,
    });

    optionsDialogRef.onClose.subscribe(() => {
      this.getTableData(this.qp);
    });
  }

  private onDeleteButtonClick(event: any): void {
    this.confirmationService.confirm({
      header: 'Подтверждение',
      message: 'Удалить файл??',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Да',
      acceptButtonStyleClass: 'p-button-sm',
      rejectLabel: 'Нет',
      rejectButtonStyleClass: 'p-button-sm p-button-secondary ',
      accept: () => this.deleteFile(event),
    });
  }

  private deleteFile(event: any): void {
    const data = {
      fieldName: this.fieldName,
      fileIds: [+event.item.id],
    };

    this.dictionaryService
      .deleteFile$(this.dictionaryId!, this.recordId!, data)
      .subscribe(() => {
        this.getTableData(this.qp);
      });
  }
}
