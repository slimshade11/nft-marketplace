import { ROOT_REDUCERS } from '@store/root-reducer';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { PRIMENG_UI } from '@primeng-ui/primeng-ui';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NavbarComponent } from '@standalone/components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@standalone/components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const declarations: any[] = [AppComponent];
const imports: any[] = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  ...PRIMENG_UI,
  NavbarComponent,
  RouterModule,
  FooterComponent,

  // NgRx
  StoreModule.forRoot(ROOT_REDUCERS),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
];
const providers: any[] = [];

@NgModule({
  declarations,
  imports,
  providers,
  bootstrap: [AppComponent],
})
export class AppModule {}
