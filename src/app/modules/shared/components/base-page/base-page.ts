import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export abstract class BasePage {
  id?: number;
  pageTitle?: string;
  params?: Params;

  router: Router;
  route: ActivatedRoute;

  protected constructor(router: Router, route: ActivatedRoute) {
    this.router = router;
    this.route = route;
  }

  setParameters$(): Observable<Params> {
    return this.route.params.pipe(
      tap((params) => {
        this.params = params;
        this.id = this.params['id'];
      })
    );
  }

  async navigateTo(path: any): Promise<void> {
    console.log(path);
    await this.router.navigate([path]);
  }
}
