import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-toolbar',
  templateUrl: './table-toolbar.component.html',
  styleUrls: ['./table-toolbar.component.scss'],
})
export class TableToolbarComponent {
  @Input() buttons: Array<any> = [];

  constructor() {}
}
