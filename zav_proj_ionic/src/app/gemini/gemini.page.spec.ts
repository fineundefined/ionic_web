import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeminiPage } from './gemini.page';

describe('GeminiPage', () => {
  let component: GeminiPage;
  let fixture: ComponentFixture<GeminiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeminiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
