import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChangeCaseInterceptor } from './change-case.interсeptor';
import { LoaderInterceptor } from './loader.interсeptor';
import { NotificationInterceptor } from './notification.interсeptor';

export const INTERCEPTORS = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ChangeCaseInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: NotificationInterceptor,
        multi: true,
    }
];

