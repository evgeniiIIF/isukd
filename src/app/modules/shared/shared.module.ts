import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import {
  GenericTableComponent,
  PreloaderComponent,
  SpinnerComponent,
  TableRowActionsComponent,
} from './components';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { CardModule } from 'primeng/card';
import { TableToolbarComponent } from './components/table-toolbar/table-toolbar.component';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { YesNoPipe } from './pipes';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import { MultiLookupModalComponent } from './components/multi-lookup/multi-lookup-modal/multi-lookup-modal.component';
import { MultiLookupItemsTableComponent } from './components/multi-lookup/multi-lookup-items-table/multi-lookup-items-table.component';
import { MultiLookupComponent } from './components/multi-lookup/multi-lookup.component';
import { MultiLookupItemAddComponent } from './components/multi-lookup/multi-lookup-item-add/multi-lookup-item-add.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiLookupOptionsTableComponent } from './components/multi-lookup/multi-lookup-options-table/multi-lookup-options-table.component';
import { MultiLookupOptionsModalComponent } from './components/multi-lookup/multi-lookup-options-modal/multi-lookup-options-modal.component';
import { FilesFieldComponent } from './components/files-field/files-field.component';
import { FilesTableComponent } from './components/files-field/files-table/files-table.component';
import { FilesModalComponent } from './components/files-field/files-modal/files-modal.component';
import { FilesUploadComponent } from './components/files-field/files-upload/files-upload.component';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    GenericTableComponent,
    PreloaderComponent,
    TableRowActionsComponent,
    PageWrapperComponent,
    TableToolbarComponent,
    YesNoPipe,
    MultiLookupComponent,
    MultiLookupModalComponent,
    MultiLookupItemsTableComponent,
    MultiLookupItemAddComponent,
    SpinnerComponent,
    MultiLookupOptionsTableComponent,
    MultiLookupOptionsModalComponent,
    FilesFieldComponent,
    FilesTableComponent,
    FilesModalComponent,
    FilesUploadComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    MenuModule,
    ButtonModule,
    InputTextModule,
    ProgressBarModule,
    AutoCompleteModule,
    CalendarModule,
    CardModule,
    CheckboxModule,
    DropdownModule,
    InputNumberModule,
    InputTextareaModule,
    MultiSelectModule,
    PaginatorModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    FileUploadModule,
  ],
  exports: [
    TableModule,
    MenuModule,
    ButtonModule,
    ProgressBarModule,
    CardModule,
    InputTextModule,
    AutoCompleteModule,
    MultiSelectModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    InputNumberModule,
    InputTextareaModule,
    PaginatorModule,
    GenericTableComponent,
    TableToolbarComponent,
    PageWrapperComponent,
    PreloaderComponent,
    YesNoPipe,
    MultiLookupComponent,
    MultiLookupModalComponent,
    ProgressSpinnerModule,
    SpinnerComponent,
    ConfirmDialogModule,
    FilesFieldComponent,
    FileUploadModule,
  ],
})
export class SharedModule {}
