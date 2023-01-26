import { Injectable } from '@angular/core';
import { CanMatch } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanMatch {
  constructor() {}

  canMatch(): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
