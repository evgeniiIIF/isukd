export interface IQueryParams {
  pageIndex?: number;
  pageSize?: number;
  totalCount?: number;
  totalPages?: number;
  containsFieldName?: string;
  containsFieldValue?: string;
  fieldName?: string;
}

export function getQueryParamsApi(qp: IQueryParams) {
  return qp
    ? `PageIndex=${qp.pageIndex}&PageSize=${qp.pageSize}&OrderByFields=_ID_${
        qp.containsFieldName ? `&ContainsFieldName=${qp.containsFieldName}` : ''
      }${
        qp.containsFieldValue
          ? `&ContainsFieldValue=${qp.containsFieldValue}`
          : ''
      }${qp.fieldName ? `&FieldName=${qp.fieldName}` : ''}
    `
    : '';
}
