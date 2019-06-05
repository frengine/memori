import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../login/authentication.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private auth: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (this.auth.currentUser && this.auth.currentUser.token)
            request.headers["Authorization"] = "Bearer " + this.auth.currentUser.token
        return next.handle(request)
    }
}
