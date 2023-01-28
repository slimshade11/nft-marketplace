import { InjectionToken } from '@angular/core';
import { AppConfig } from '@common/models/app-config.model';

export const AppConfigKey = 'App config';

export const APP_CONFIG_TOKEN: InjectionToken<AppConfig> = new InjectionToken<AppConfig>(AppConfigKey);

export const APP_CONFIG: AppConfig = {
  networkId: 5777,
};
