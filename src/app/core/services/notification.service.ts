// ANGULAR
import { Injectable } from '@angular/core';

// MATERIAL
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class NotificationService {

    private _defaultConfig = new MatSnackBarConfig();

    constructor(private snackBar: MatSnackBar) {}

    public showMessage(message: string, type: string): void {
        this._defaultConfig.duration = 2000;
        this._defaultConfig.horizontalPosition = 'right';
        this._defaultConfig.verticalPosition = 'top';
        this._defaultConfig.panelClass = type;

        this.snackBar.open(message, '', this._defaultConfig);
    }
}
