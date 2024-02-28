import { Component, OnInit } from '@angular/core';
import { BasePage } from '@shared/components';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dictionaries',
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.scss'],
})
export class DictionariesComponent extends BasePage {
  constructor(router: Router, route: ActivatedRoute) {
    super(router, route);
  }

  async navigateToDictionary(path: string) {
    await this.navigateTo(path);
  }
}
