import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryRecordEditComponent } from './dictionary-record-edit.component';

describe('DictionaryRecordComponent', () => {
  let component: DictionaryRecordEditComponent;
  let fixture: ComponentFixture<DictionaryRecordEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DictionaryRecordEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DictionaryRecordEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
