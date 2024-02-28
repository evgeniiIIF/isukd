import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../../shared/components';
import { DictionaryService } from '../../services';
import { switchMap } from 'rxjs';
import { DictionarySchema } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent extends BasePage implements OnInit {
  public dictionarySchema?: DictionarySchema;

  constructor(
    router: Router,
    route: ActivatedRoute,
    private dictionaryService: DictionaryService
  ) {
    super(router, route);
  }

  ngOnInit(): void {
    this.setParameters$()
      .pipe(switchMap(() => this.getDictionarySchema$(this.id!)))
      .subscribe((schema) => {
        this.setDictionarySchema(schema);
        console.log(this.dictionarySchema);

        this.pageTitle = this.dictionarySchema!.title;
      });
  }

  private getDictionarySchema$(id: number) {
    return this.dictionaryService.getDictionarySchema$(id);
  }

  private setDictionarySchema(schema: DictionarySchema): void {
    console.log(schema);

    this.dictionarySchema = { ...schema };
  }
}
