import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DictionaryService } from '@dictionaries/services';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss'],
})
export class FilesUploadComponent implements OnInit {
  @Input() dictionaryId?: number;
  @Input() recordId?: number;
  @Input() fieldName?: string;

  @Output() fileUploadedEvent = new EventEmitter();

  uploadedFiles: any[] = [];

  constructor(
    private dictionaryService: DictionaryService,
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.dictionaryId = this.config.data['dictionaryId'];
    this.recordId = this.config.data['recordId'];
    this.fieldName = this.config.data['fieldName'];
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  uploadFiles(event: any): void {
    this.uploadFileForRecord$(event.files[0]).subscribe(() => {
      this.dialogRef.close();
    });
  }

  uploadFileForRecord$(file: any) {
    return this.dictionaryService.uploadFileForRecord$(
      this.dictionaryId!,
      this.recordId!,
      this.fieldName!,
      file
    );
  }
}
