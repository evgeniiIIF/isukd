import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogComponent} from "./pages/log/log.component";

const routes: Routes = [
  {
    path: 'logs/:id',
    component: LogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogsRoutingModule {
}
