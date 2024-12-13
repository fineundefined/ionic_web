import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private apiService: ApiService) {}

  
  canActivate(): Observable<boolean> {
    return this.apiService.validateToken().pipe(
      map(() => true), 
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false); 
      })
    );
  }
}