import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DictionariesRoutingModule } from './dictionaries-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import {
  DictionariesTableComponent,
  DictionaryRecordBaseComponent,
  DictionaryRecordEditComponent,
  DictionaryRecordModalComponent,
  DictionaryRecordViewComponent,
  DictionaryTableComponent,
} from '@dictionaries/components';
import { SharedModule } from '@shared/shared.module';
import {
  DictionariesComponent,
  DictionaryComponent,
} from '@dictionaries/pages';
@NgModule({
  declarations: [
    DictionaryComponent,
    DictionaryTableComponent,
    DictionaryRecordEditComponent,
    DictionaryRecordViewComponent,
    DictionaryRecordBaseComponent,
    DictionaryRecordModalComponent,
    DictionariesComponent,
    DictionariesTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DictionariesRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    InputTextModule,
    TooltipModule,
    MenuModule,
    DynamicDialogModule,
    ConfirmDialogModule,
  ],
  providers: [DialogService, ConfirmationService],
  entryComponents: [DictionaryRecordEditComponent],
})
export class DictionariesModule {
  constructor() {}
}
