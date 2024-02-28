import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLookupOptionsModalComponent } from './multi-lookup-options-modal.component';

describe('MultiLookupOptionsModalComponent', () => {
  let component: MultiLookupOptionsModalComponent;
  let fixture: ComponentFixture<MultiLookupOptionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiLookupOptionsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiLookupOptionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
