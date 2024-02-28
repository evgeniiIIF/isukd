import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryRecordBaseComponent } from './dictionary-record-base.component';

describe('DictionaryRecordBaseComponent', () => {
  let component: DictionaryRecordBaseComponent;
  let fixture: ComponentFixture<DictionaryRecordBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictionaryRecordBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DictionaryRecordBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
