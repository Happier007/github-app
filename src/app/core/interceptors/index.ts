import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChangeCaseInterseptor } from './change-case.interseptor';
import { LoaderInterseptor } from './loader.interseptor';
import { ShowErrorsInterseptor } from './show-errors.interseptor';

export const INTERCEPTORS = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ChangeCaseInterseptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterseptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ShowErrorsInterseptor,
        multi: true,
    }
];

