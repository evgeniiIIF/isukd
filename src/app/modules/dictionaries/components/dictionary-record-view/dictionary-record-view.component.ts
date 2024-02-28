import { Component, Input } from '@angular/core';
import { DictionarySchemaField, RecordData } from '../../models';

@Component({
  selector: 'app-dictionary-record-view',
  templateUrl: './dictionary-record-view.component.html',
  styleUrls: ['./dictionary-record-view.component.scss'],
})
export class DictionaryRecordViewComponent {
  @Input() record?: RecordData;
  @Input() dictionaryFields?: Array<DictionarySchemaField>;
}
