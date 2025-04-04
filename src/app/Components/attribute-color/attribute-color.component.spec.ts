import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeColorComponent } from './attribute-color.component';

describe('AttributeColorComponent', () => {
  let component: AttributeColorComponent;
  let fixture: ComponentFixture<AttributeColorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttributeColorComponent]
    });
    fixture = TestBed.createComponent(AttributeColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
