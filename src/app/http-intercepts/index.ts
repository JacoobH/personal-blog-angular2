import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {BasicAuthHttpInterceptor} from "./BasicAuthHttpInterceptor";

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptor, multi: true },
];