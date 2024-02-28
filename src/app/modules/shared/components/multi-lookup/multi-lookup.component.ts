import { Component, Input } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MultiLookupModalComponent } from './multi-lookup-modal/multi-lookup-modal.component';

@Component({
  selector: 'app-multi-lookup',
  templateUrl: './multi-lookup.component.html',
  styleUrls: ['./multi-lookup.component.scss'],
})
export class MultiLookupComponent {
  @Input() public dictionaryId: number | undefined;
  @Input() public lookupDictionaryId: number | undefined;
  @Input() public recordId: number | undefined;
  @Input() public fieldName: string | undefined;

  private readonly dialogWidth: string = '90%';

  constructor(private dialogService: DialogService) {}

  openMultiLookupModal(event: Event): void {
    event.preventDefault();

    this.dialogService.open(MultiLookupModalComponent, {
      data: {
        dictionaryId: this.dictionaryId,
        lookupDictionaryId: this.lookupDictionaryId,
        recordId: this.recordId,
        fieldName: this.fieldName,
      },
      header: this.fieldName,
      width: this.dialogWidth,
      maximizable: true,
    });
  }
}
