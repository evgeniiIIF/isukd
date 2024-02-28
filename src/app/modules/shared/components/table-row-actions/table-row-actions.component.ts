import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-table-row-actions',
  templateUrl: './table-row-actions.component.html',
  styleUrls: ['./table-row-actions.component.scss'],
})
export class TableRowActionsComponent implements OnInit {
  @Input() public id: number | undefined;
  @Input() public actionMenu: MenuItem[] = [];

  constructor() {}

  public ngOnInit(): void {
    this.setMenuItemsId();
  }

  private setMenuItemsId(): void {
    this.actionMenu = this.actionMenu.map((menuItem) => ({
      ...menuItem,
      id: this.id?.toString(),
    }));
  }
}
