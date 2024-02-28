import { DictionarySchema } from '../dictionary-schema.model';
import { RecordLookupFieldApi } from './record-lookup-field-api.model';
import { RecordFieldsApi } from './record-field-api.model';
import { RecordData } from '../record-data.model';

export interface RecordDataApi {
  lookupFields: Array<RecordLookupFieldApi>;
  fields: RecordFieldsApi;
}

export function mapRecordToModel(
  dictionarySchema: DictionarySchema,
  record: RecordDataApi
): RecordData {
  let obj: any = {};

  dictionarySchema.fields.forEach((field) => {
    if (field.type === 7) {
      const lookupField = record.lookupFields.find(
        (lookupField) => lookupField.lookupName === field.name
      );

      if (lookupField) {
        obj[field.name] = lookupField.fields._ID_ ? lookupField.fields : null;
      }
    } else {
      obj[field.name] = record.fields[field.name];
    }
  });

  return obj as RecordData;
}
