import { PRIMENG_UI } from '@common/primeng-ui/primeng-ui';
import { APP_CONFIG, APP_CONFIG_TOKEN } from '@common/config/app.config';
import { Web3Service } from '@common/web3/services/web3.service';
import { CreateNftFormService } from '@home/services/create-nft-form.service';
import { ROOT_REDUCERS } from '@store/root-reducer';
import { NgModule, isDevMode } from '@angular/core';
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
import { HomeFacade } from '@home/home.facade';
import { HttpClientModule } from '@angular/common/http';
import { HomeEffects } from '@home_store/home.effects';
import { NftListResolver } from '@home/resolvers/nft-list.resolver';
import { FormService } from '@common/services/form.service';
import { HomeService } from '@home/services/home.service';
import { AppFacade } from '@app/app.facade';
import { Web3Effects } from '@store/web3/web3.effects';
import { ProfileFacade } from '@profile/profile.facade';
import { ToastService } from '@common/services/toast.service';
import { MessageService } from 'primeng/api';
import { AuthGuard } from '@common/guards/auth.guard';

const declarations: any[] = [AppComponent];
const imports: any[] = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  NavbarComponent,
  RouterModule,
  FooterComponent,
  HttpClientModule,
  PRIMENG_UI,

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
  HomeFacade,
  NftListResolver,
  FormService,
  HomeService,
  CreateNftFormService,
  AppFacade,
  Web3Service,
  ProfileFacade,
  ToastService,
  MessageService,
  AuthGuard,
];

@NgModule({ declarations, imports, providers, bootstrap: [AppComponent] })
export class AppModule {}
