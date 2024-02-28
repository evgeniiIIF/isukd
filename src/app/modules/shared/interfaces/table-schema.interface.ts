import { ITableColumn } from './index';

export interface ITableSchema {
  title?: string;
  columns: ITableColumn[];
}
