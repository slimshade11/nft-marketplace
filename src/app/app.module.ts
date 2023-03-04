import { APP_CONFIG, APP_CONFIG_TOKEN } from '@common/config/app.config';
import { ROOT_REDUCERS } from '@store/root-reducer';
import { NgModule, isDevMode, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NavbarComponent } from '@standalone/components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@standalone/components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeEffects } from '@store/home/home.effects';
import { Web3Effects } from '@store/web3/web3.effects';
import { MessageService } from 'primeng/api';
import { AppInitService } from '@common/services/app-init.service';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';

const declarations: any[] = [AppComponent];
const imports: any[] = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  NavbarComponent,
  RouterModule,
  FooterComponent,
  HttpClientModule,
  HttpClientModule,
  ToastModule,
  ProgressBarModule,

  // NgRx //
  StoreModule.forRoot(ROOT_REDUCERS),
  EffectsModule.forRoot([HomeEffects, Web3Effects]),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
];
const providers: any[] = [
  {
    provide: APP_CONFIG_TOKEN,
    useValue: APP_CONFIG,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: injectThemeLink,
    deps: [AppInitService],
    multi: true,
  },
  MessageService,
];

@NgModule({ declarations, imports, providers, bootstrap: [AppComponent] })
export class AppModule {}

function injectThemeLink(appInitService: AppInitService): () => Promise<void> {
  return (): Promise<void> => appInitService.injectThemeLink();
}
