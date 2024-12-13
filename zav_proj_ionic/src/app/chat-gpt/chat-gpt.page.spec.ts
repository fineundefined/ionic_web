import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatGptPage } from './chat-gpt.page';

describe('ChatGptPage', () => {
  let component: ChatGptPage;
  let fixture: ComponentFixture<ChatGptPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
