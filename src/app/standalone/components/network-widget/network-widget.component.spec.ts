import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NetworkWidgetComponent } from '@standalone/components/network-widget/network-widget.component';

describe('NetworkWidgetComponent', () => {
  let component: NetworkWidgetComponent;
  let fixture: ComponentFixture<NetworkWidgetComponent>;
  let initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkWidgetComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(NetworkWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
