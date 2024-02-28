import { DictionarySchemaField } from './dictionary-schema-field.model';
import { DictionarySchemaFieldApi, DictionarySchemaApi } from './api';
import {
  DictionaryActionsEnum,
  DictionaryFieldUsageEnum,
  DictionaryFieldVisibilityEnum,
} from '../enums';
import { DictionaryTableButtonsEnum } from '../enums/dictionary-table-buttons.enum';

export interface DictionarySchema {
  id: number;
  title: string;
  singleTitle: string;
  actions: {
    compare: boolean;
    createCopy: boolean;
    createNew: boolean;
    merge: boolean;
    viewList: boolean;
    viewLinked: boolean;
    viewSimilar: boolean;
    viewInTree: boolean;
  };
  grid: {
    resizable: boolean;
    hideViewButton: boolean;
    hideEditButton: boolean;
    hideDeleteButton: boolean;
    hideAttachmentButton: boolean;
  };
  fields: DictionarySchemaField[];
}

export function mapDictionarySchemaToModel(
  schema: DictionarySchemaApi
): DictionarySchema {
  return {
    id: schema.id,
    title: schema.title,
    singleTitle: schema.singleTitle,
    actions: {
      compare: schema.settings.cardActionsList.includes(
        DictionaryActionsEnum.Compare
      ),
      createCopy: schema.settings.cardActionsList.includes(
        DictionaryActionsEnum.CreateCopy
      ),
      createNew: schema.settings.cardActionsList.includes(
        DictionaryActionsEnum.CreateNew
      ),
      merge: schema.settings.cardActionsList.includes(
        DictionaryActionsEnum.Merge
      ),
      viewList: schema.settings.cardActionsList.includes(
        DictionaryActionsEnum.ViewList
      ),
      viewLinked: schema.settings.cardActionsList.includes(
        DictionaryActionsEnum.ViewLinked
      ),
      viewSimilar: schema.settings.cardActionsList.includes(
        DictionaryActionsEnum.ViewSimilar
      ),
      viewInTree: schema.settings.cardActionsList.includes(
        DictionaryActionsEnum.ViewInTree
      ),
    },
    grid: {
      resizable: schema.settings.resizableGrid,
      hideViewButton: schema.settings.hiddenListColumns.includes(
        DictionaryTableButtonsEnum.View
      ),
      hideEditButton: schema.settings.hiddenListColumns.includes(
        DictionaryTableButtonsEnum.Edit
      ),
      hideDeleteButton: schema.settings.hiddenListColumns.includes(
        DictionaryTableButtonsEnum.Delete
      ),
      hideAttachmentButton: schema.settings.hiddenListColumns.includes(
        DictionaryTableButtonsEnum.Attachment
      ),
    },
    fields: schema.fields.map(
      (field: DictionarySchemaFieldApi): DictionarySchemaField => {
        return {
          type: field.fieldType,
          title: field.title,
          name: field.internalName,
          width: field.listWidth > 0 ? field.listWidth : 200,
          size: field.size,
          isVisibleInList: field.fieldUsage.includes(
            DictionaryFieldUsageEnum.List
          ),
          isVisibleInCard: field.fieldUsage.includes(
            DictionaryFieldUsageEnum.Card
          ),
          isVisibleInView: field.visibility.includes(
            DictionaryFieldVisibilityEnum.View
          ),
          isVisibleInAdd: field.visibility.includes(
            DictionaryFieldVisibilityEnum.Add
          ),
          isVisibleInEdit: field.visibility.includes(
            DictionaryFieldVisibilityEnum.Edit
          ),
          isRequired: field.fieldUsage.includes(
            DictionaryFieldUsageEnum.Required
          ),
          options: field.choices.map((item) => ({
            id: item.value,
            title: item.title,
          })),
          lookupDictionaryId: field.lookupDictionaryId,
        };
      }
    ),
  };
}
