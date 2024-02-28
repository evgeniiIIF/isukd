import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IQueryParams, ITableColumn } from '../../interfaces';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent {
  @Input() columns?: Array<ITableColumn> = [];
  @Input() items?: Array<any> = [];
  @Input() showCheckboxes: boolean = false;
  @Input() showActionMenu: boolean = false;
  @Input() actionMenu: Array<MenuItem> = [];
  @Input() selectionMode = 'single';
  @Input() qp!: IQueryParams;
  @Input() isLoading: boolean = false;

  @Output() rowSelectionEvent = new EventEmitter();
  @Output() paginationEvent = new EventEmitter<IQueryParams>();

  get rows(): number {
    return this.qp.pageSize!;
  }

  get totalRecords(): number {
    return this.qp.totalCount!;
  }

  public rowsPerPageOptions = [10, 25, 50, 100];

  constructor() {}

  public paginate(event: any) {
    const qp: IQueryParams = {
      pageIndex: event.page + 1,
      pageSize: event.rows,
    };

    this.paginationEvent.emit(qp);
  }

  onRowSelection(event: any) {
    this.rowSelectionEvent.emit(event);
  }
}
