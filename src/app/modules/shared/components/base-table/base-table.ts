import { Paginated, IQueryParams, ITableColumn } from '../../interfaces';
import { CancelToken } from '@shared/helpers';

export abstract class BaseTable {
  public columns: Array<ITableColumn> | undefined;
  public tableData: Paginated<any> | undefined;

  public isLoading: boolean = false;
  public qp: IQueryParams = {
    pageIndex: 0,
    pageSize: 10,
    totalCount: undefined,
    totalPages: undefined,
  };

  public buttons: Array<any> = [];
  public actionMenu: Array<any> = [];
  toolbarButtons: Array<any> = [];

  cancelToken = new CancelToken();

  public abstract getTableData(qp: IQueryParams): void;

  public setQueryParams(tableData: Paginated<any>): void {
    this.qp = {
      ...this.qp,
      pageIndex: tableData!.pageIndex,
      pageSize: tableData!.pageSize,
      totalCount: tableData!.totalCount,
      totalPages: tableData!.totalPages,
    };
  }

  public onPagination(pgParams: IQueryParams): void {
    const qp = {
      ...this.qp,
      pageIndex: pgParams.pageIndex,
      pageSize: pgParams.pageSize,
    };

    this.getTableData(qp);
  }
}
