import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class BasicAuthHttpInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (sessionStorage.getItem('username') && sessionStorage.getItem('jwt')) {
            req = req.clone({
                setHeaders: {
                    Authorization: sessionStorage.getItem('jwt')
                }
            })
        }
        return next.handle(req);
    }
}