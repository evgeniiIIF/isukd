import {Component, Injector, Input, OnInit} from '@angular/core';
import {LogsService} from "../../services/logs.service";
import {
  DictionaryRecordViewComponent
} from "../../../dictionaries/components/dictionary-record-view/dictionary-record-view.component";
import {DialogService} from "primeng/dynamicdialog";
import {LogsRecordViewComponent} from "../logs-record-view/logs-record-view.component";

@Component({
  selector: 'app-logs-table',
  templateUrl: './logs-table.component.html',
  styleUrls: ['./logs-table.component.scss']
})
export class LogsTableComponent implements OnInit {
  @Input() id!: number;
  public tableData: any;

  public columns = [
    {
      name: "dictionaryName",
      title: 'Справочник'
    },
    {
      name: "itemId",
      title: 'Запись'
    },
    {
      name: "message",
      title: 'Событие'
    }
  ]

  private logsService: LogsService;
  private dialogService: DialogService;

  constructor(injector: Injector) {
    this.logsService = injector.get(LogsService);
    this.dialogService = injector.get(DialogService);
  }

  public ngOnInit(): void {
    this.getLogs();
  }

  public onRowClick(id: number): void {
    this.dialogService.open(LogsRecordViewComponent, {
      data: {
        id: id,
        dictionaryId: this.id,
        mode: 'view',
      },
      header: 'View Log Record',
      width: '50%',
    });
  }

  private getLogs(): void {
    this.logsService.getLogs(this.id).subscribe(result => {
      this.tableData = result.items;
    });
  }


}
