import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLookupItemAddComponent } from './multi-lookup-item-add.component';

describe('MultiLookupItemAddComponent', () => {
  let component: MultiLookupItemAddComponent;
  let fixture: ComponentFixture<MultiLookupItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiLookupItemAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiLookupItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
