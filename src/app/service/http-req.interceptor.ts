import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const username = this.localStorageService.getUsername();
    const password = this.localStorageService.getPassword();

    if (username && password) {
      const base64 = btoa(`${username}:${password}`);
      request = request.clone({
        setHeaders: { Authorization: `Basic ${base64}` },
      });
    }

    return next.handle(request);
  }
}
