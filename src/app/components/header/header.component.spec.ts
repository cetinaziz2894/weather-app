import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have h1', () => {
    const h1: HTMLElement = fixture.nativeElement.querySelector('h1');
    const el = fixture.nativeElement.querySelector('.title');
    expect(h1.textContent).not.toBeNull;
    expect(h1.textContent).toBe("Europe Weather App");
    expect(h1.classList).toContain("font-weight-bold");
    expect(el).not.toBeNull;
  })
});
