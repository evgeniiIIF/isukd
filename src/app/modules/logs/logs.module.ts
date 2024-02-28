import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogsRoutingModule} from "./logs-routing.module";
import {SharedModule} from "../shared/shared.module";
import {LogComponent} from './pages/log/log.component';
import {LogsTableComponent} from './components/logs-table/logs-table.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {InputTextModule} from "primeng/inputtext";
import { LogsRecordViewComponent } from './components/logs-record-view/logs-record-view.component';
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {ProgressSpinnerModule} from "primeng/progressspinner";


@NgModule({
  declarations: [
    LogComponent,
    LogsTableComponent,
    LogsRecordViewComponent
  ],
  imports: [
    CommonModule,
    LogsRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    InputTextModule,
    DynamicDialogModule,
    ProgressSpinnerModule,
  ]
})
export class LogsModule {
}
