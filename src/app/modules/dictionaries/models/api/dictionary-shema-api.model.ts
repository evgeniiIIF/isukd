import { DictionarySchemaFieldApi } from './dictionary-schema-field-api.model';

export interface DictionarySchemaApi {
  id: number;
  title: string;
  singleTitle: string;
  description: string;
  dictionaryUsage: number[];
  hierarchical: boolean;
  settings: {
    cardActionsList: number[];
    resizableGrid: boolean;
    hiddenListColumns: number[];
    hiddenListMenus: string[];
    // to do
    // fileHandlers: [];
    fileHandlers?: [];
  };
  fields: DictionarySchemaFieldApi[];
}
