import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../environments/environments';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("intterceoto");
    
    const baseUrl = environments.baseUrl;
    console.log(baseUrl);
    
    let modifiedRequest = request.clone({
      url: baseUrl + request.url,
      withCredentials: true,
    });
    return next.handle(modifiedRequest);

  }
  
}
