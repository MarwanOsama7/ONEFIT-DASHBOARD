import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    handleError(error: HttpErrorResponse) {
        // Suppress specific error messages
        if (error.status === 404) {
            // Handle 404 errors silently
            return throwError('Not Found'); // You can throw a custom error message
        }

        // Log other errors if necessary
        console.error('An error occurred:', error);
        return throwError(error);
    }
}