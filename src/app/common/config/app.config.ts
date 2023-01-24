import { InjectionToken } from '@angular/core';
import { AppConfig } from '@common_models/app-config.model';

export const AppConfigKey = 'app-config';

export const APP_CONFIG_TOKEN: InjectionToken<AppConfig> = new InjectionToken<AppConfig>(AppConfigKey);

export const APP_CONFIG: AppConfig = {
  networkId: 5777,
};
