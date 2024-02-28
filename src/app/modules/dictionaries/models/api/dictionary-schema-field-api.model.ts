export interface DictionarySchemaFieldApi {
  id: number;
  guid: string;
  title: string;
  listTitle: string;
  internalName: string;
  description: string;
  fieldType: number;
  choices: Array<any>;
  hidden: boolean;
  hiddenListDefault: boolean;
  listWidth: number;
  fieldUsage: number[];
  displayMode: number;
  visibility: number[];
  lookupDictionaryId: number;
  readOnly: boolean;
  required: boolean;
  size: number;
}
