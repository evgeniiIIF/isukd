import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLookupOptionsTableComponent } from './multi-lookup-options-table.component';

describe('MultiLookupOptionsTableComponent', () => {
  let component: MultiLookupOptionsTableComponent;
  let fixture: ComponentFixture<MultiLookupOptionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiLookupOptionsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiLookupOptionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
