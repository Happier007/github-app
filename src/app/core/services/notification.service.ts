// ANGULAR
import { Injectable } from '@angular/core';

// MATERIAL
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class NotificationService {

    constructor(
        private snackBar: MatSnackBar) {
    }

    public showError(message: string): void {
        this.snackBar.open(message, 'X', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
        });
    }
}
