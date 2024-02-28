import { RecordField } from './dictionary-record-field.model';

export interface DictionarySchemaField {
  title: string;
  name: string;
  type: number;
  width: number;
  size: number | null;
  isVisibleInList: boolean;
  isVisibleInCard: boolean;
  isVisibleInView: boolean;
  isVisibleInAdd: boolean;
  isVisibleInEdit: boolean;
  isRequired: boolean;
  lookupDictionaryId: number;
  options: Array<any>;
}

export function mapToRecordField(
  record: any,
  field: DictionarySchemaField
): RecordField {
  return {
    title: field.title,
    name: field.name,
    type: field.type,
    value: record && record[field.name] ? record[field.name] : null,
    size: field.size,
    isVisibleInCard: field.isVisibleInCard,
    isVisibleInView: field.isVisibleInView,
    isVisibleInAdd: field.isVisibleInAdd,
    isVisibleInEdit: field.isVisibleInEdit,
    isDisabled: false,
    isRequired: field.isRequired,
    options: field.options,
    lookupDictionaryId: field.lookupDictionaryId,
  };
}
