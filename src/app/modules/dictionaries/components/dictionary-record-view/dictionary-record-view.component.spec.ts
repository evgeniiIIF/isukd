import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryRecordViewComponent } from './dictionary-record-view.component';

describe('DictionaryRecordViewComponent', () => {
  let component: DictionaryRecordViewComponent;
  let fixture: ComponentFixture<DictionaryRecordViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictionaryRecordViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionaryRecordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
