import { Component, Input, OnInit } from '@angular/core';
import { MultiLookupModalComponent } from '@shared/components/multi-lookup/multi-lookup-modal/multi-lookup-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { FilesTableComponent } from '@shared/components/files-field/files-table/files-table.component';
import { FilesModalComponent } from '@shared/components/files-field/files-modal/files-modal.component';

@Component({
  selector: 'app-files-field',
  templateUrl: './files-field.component.html',
  styleUrls: ['./files-field.component.scss'],
})
export class FilesFieldComponent {
  @Input() dictionaryId?: number;
  @Input() recordId?: number;
  @Input() fieldName?: string;

  private readonly dialogWidth: string = '90%';

  constructor(private dialogService: DialogService) {}

  openFilesTableModal(event: Event): void {
    event.preventDefault();

    this.dialogService.open(FilesModalComponent, {
      data: {
        dictionaryId: this.dictionaryId,
        recordId: this.recordId,
        fieldName: this.fieldName,
      },
      header: this.fieldName,
      width: this.dialogWidth,
      maximizable: true,
    });
  }
}
