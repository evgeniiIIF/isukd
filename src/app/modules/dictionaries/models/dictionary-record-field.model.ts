import { DictionarySchemaField } from '@dictionaries/models/dictionary-schema-field.model';

export interface RecordField {
  title: string;
  name: string;
  type: number;
  value: string | any;
  size: number | null;
  isVisibleInCard: boolean;
  isVisibleInView: boolean;
  isVisibleInAdd: boolean;
  isVisibleInEdit: boolean;
  isDisabled: boolean;
  isRequired: boolean;
  options: Array<any>;
  lookupDictionaryId: number;
}

export function mapRecordToApiModel(
  recordFields: Array<DictionarySchemaField>,
  record: any
) {
  let obj: any = {
    fields: {},
  };

  recordFields.forEach((field) => {
    if (field.type === 7) {
      obj.fields[field.name] = record[field.name]
        ? record[field.name].id
        : null;
    } else {
      obj.fields[field.name] = record.fields[field.name];
    }
  });

  return obj;
}
