import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsRecordViewComponent } from './logs-record-view.component';

describe('LogsRecordViewComponent', () => {
  let component: LogsRecordViewComponent;
  let fixture: ComponentFixture<LogsRecordViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsRecordViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsRecordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
