import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  setTheme(isLightMode: boolean): void {
    const themeLink = this.document.getElementById('theme-link') as HTMLLinkElement;
    themeLink.href = isLightMode ? 'light.css' : 'dark.css';
    localStorage.setItem('isLightMode', JSON.stringify(isLightMode));
  }

  public handleThemeMode(isLightMode: boolean): void {
    isLightMode = JSON.parse(localStorage.getItem('isLightMode')!);
    this.setTheme(isLightMode);
  }
}
