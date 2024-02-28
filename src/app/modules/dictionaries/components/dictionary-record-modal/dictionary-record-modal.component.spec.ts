import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryRecordModalComponent } from './dictionary-record-modal.component';

describe('DictionaryRecordModalComponent', () => {
  let component: DictionaryRecordModalComponent;
  let fixture: ComponentFixture<DictionaryRecordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictionaryRecordModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionaryRecordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
