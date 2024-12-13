import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeeplPage } from './deepl.page';

describe('DeeplPage', () => {
  let component: DeeplPage;
  let fixture: ComponentFixture<DeeplPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeeplPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
