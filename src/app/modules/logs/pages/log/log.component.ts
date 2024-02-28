import {Component, Injector, OnInit} from '@angular/core';
import {Observable, tap} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  public id: number | undefined;
  private route: ActivatedRoute;

  constructor(injector: Injector) {
    this.route = injector.get(ActivatedRoute);
  }

  public ngOnInit(): void {
    this.setRouteParameters();
  }

  /**
   * Get route parameters.
   * @public
   */
  private setRouteParameters(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
  }
}
