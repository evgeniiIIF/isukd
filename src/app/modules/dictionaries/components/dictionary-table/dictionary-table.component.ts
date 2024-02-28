import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DictionaryRecordModalComponent } from '@dictionaries/components';
import { BaseTable } from '@shared/components';
import { DictionaryService } from '@dictionaries/services';
import { DictionarySchemaField, DictionarySchema } from '@dictionaries/models';
import {
  Paginated,
  IQueryParams,
  ITableColumn,
  ITableSchema,
} from '@shared/interfaces';
import { ViewModeEnum } from '@shared/enums';

import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-dictionary-table',
  templateUrl: './dictionary-table.component.html',
  styleUrls: ['./dictionary-table.component.scss'],
})
export class DictionaryTableComponent
  extends BaseTable
  implements OnInit, OnDestroy
{
  @Input() dictionaryId?: number;
  @Input() dictionarySchema?: DictionarySchema;

  tableSchema?: ITableSchema;

  constructor(
    private dictionaryService: DictionaryService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.setToolbarButtons();
    this.getTableData(this.qp);
  }

  ngOnDestroy(): void {
    this.cancelToken.cancel();
  }

  getTableData(qp: IQueryParams): void {
    this.isLoading = true;
    this.dictionaryService
      .getRecords$(this.dictionarySchema!, this.dictionaryId!, qp)
      .pipe(takeWhile(() => this.cancelToken.isActive))
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
        click: () => this.onAddButtonClick(),
      },
    ];
  }

  private setActionMenu(): void {
    this.actionMenu = [];

    if (!this.dictionarySchema?.grid?.hideViewButton) {
      this.actionMenu.push({
        label: 'Посмотреть карточку',
        icon: 'pi pi-eye',
        command: (event: any) => this.onViewButtonClick(event),
      });
    }

    if (!this.dictionarySchema?.grid?.hideEditButton) {
      this.actionMenu.push({
        label: 'Редактировать',
        icon: 'pi pi-pencil',
        command: (event: any) => this.onEditButtonClick(event),
      });
    }

    if (!this.dictionarySchema?.grid?.hideAttachmentButton) {
      this.actionMenu.push({
        label: 'Вложение',
        icon: 'pi pi-paperclip',
        command: (event: any) => this.onAttachmentButtonClick(event),
      });
    }

    if (!this.dictionarySchema?.grid?.hideDeleteButton) {
      this.actionMenu.push({
        label: 'Удалить',
        icon: 'pi pi-times',
        command: (event: any) => this.onDeleteButtonClick(event),
      });
    }

    if (this.dictionarySchema?.actions.createCopy) {
      this.actionMenu.push({
        label: 'Создать копию',
        icon: 'pi pi-copy',
        command: (event: any) => this.onCreateCopyButtonClick(event),
      });
    }

    if (this.dictionarySchema?.actions.merge) {
      this.actionMenu.push({
        label: 'Объединить',
        icon: 'pi pi-clone',
        command: (event: any) => this.onMergeButtonClick(event),
      });
    }

    if (this.dictionarySchema?.actions.viewLinked) {
      this.actionMenu.push({
        label: 'Связанные записи',
        icon: 'pi pi-link',
        command: (event: any) => this.onViewLinkedButtonClick(event),
      });
    }

    if (this.dictionarySchema?.actions.viewSimilar) {
      this.actionMenu.push({
        label: 'Похожие записи',
        icon: 'pi pi-search-plus',
        command: (event: any) => this.onViewSimilarButtonClick(event),
      });
    }

    if (this.dictionarySchema?.actions.compare) {
      this.actionMenu.push({
        label: 'Сравнить',
        icon: 'pi pi-chart-bar',
        command: (event: any) => this.onCompareButtonClick(event),
      });
    }
  }

  public onAddButtonClick(): void {
    console.log(`Add button clicked`);

    const createRecordDialogRef = this.dialogService.open(
      DictionaryRecordModalComponent,
      {
        data: {
          mode: ViewModeEnum.Create,
          dictionaryId: this.dictionaryId,
        },
        header: 'Add Dictionary Record',
        width: '50%',
        maximizable: true,
      }
    );

    createRecordDialogRef.onClose.subscribe(() => {
      this.getTableData(this.qp);
    });
  }

  private onViewButtonClick(event: any): void {
    this.dialogService.open(DictionaryRecordModalComponent, {
      data: {
        id: event.item.id,
        dictionaryId: this.dictionaryId,
        mode: ViewModeEnum.View,
      },
      header: 'View Dictionary Record',
      width: '50%',
      maximizable: true,
    });
  }

  private onEditButtonClick(event: any): void {
    const editRecordDialogRef = this.dialogService.open(
      DictionaryRecordModalComponent,
      {
        data: {
          id: event.item.id,
          dictionaryId: this.dictionaryId,
          mode: ViewModeEnum.Edit,
        },
        header: 'Edit Dictionary Record',
        width: '50%',
        maximizable: true,
      }
    );

    editRecordDialogRef.onClose.subscribe(() => {
      this.getTableData(this.qp);
    });
  }

  // private onRecordUpdate(): void {
  //   this.getTableData(this.qp);
  // }

  private onAttachmentButtonClick(event: any): void {
    console.log(`Attachment button clicked ${event.item.id}`);
  }

  private onDeleteButtonClick(event: any): void {
    this.confirmationService.confirm({
      header: 'Подтверждение',
      message: 'Удалить запись?',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Да',
      acceptButtonStyleClass: 'p-button-sm',
      rejectLabel: 'Нет',
      rejectButtonStyleClass: 'p-button-sm p-button-secondary ',
      accept: () => this.deleteRecord(event.item.id),
    });
  }

  private deleteRecord(id: number): void {
    this.dictionaryService
      .deleteRecord$(this.dictionaryId!, id)
      .subscribe(() => {
        this.getTableData(this.qp);
      });
  }

  private onCreateCopyButtonClick(event: any): void {
    console.log(`Create copy button clicked ${event.item.id}`);
  }

  private onMergeButtonClick(event: any): void {
    console.log(`Merge button clicked ${event.item.id}`);
  }

  private onViewLinkedButtonClick(event: any): void {
    console.log(`View linked button clicked ${event.item.id}`);
  }

  private onViewSimilarButtonClick(event: any): void {
    console.log(`View similar button clicked ${event.item.id}`);
  }

  private onCompareButtonClick(event: any): void {
    console.log(`Compare button clicked ${event.item.id}`);
  }
}
