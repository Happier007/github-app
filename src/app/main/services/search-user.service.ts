// ANGULAR
import { Injectable } from '@angular/core';

// CORE
import { IUser } from '@core/interfaces';

@Injectable({providedIn: 'root'})
export class SearchUserService {
    public saveUserToLocalStorage(token: string, username: string): void {
        const newUser: IUser = {
            username,
            token
        };
        localStorage.setItem('token', JSON.stringify(newUser));
    }

    public readUserFromLocalStorage(): IUser {
        return JSON.parse(localStorage.getItem('token'));
    }
}
