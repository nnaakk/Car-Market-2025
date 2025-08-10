import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { user } from '@angular/fire/auth';


export const authGuard: CanActivateFn = () => {

 const authService = inject(AuthService)
 const router = inject(Router)

 return authService.user$.pipe(
  take(1),
  map(user => {
    const isAuthenticated = !!user
    console.log('check ', isAuthenticated);
    if(!isAuthenticated){
    router.navigate(['/login'])
    return false
    }
    return true;
  })
 )
  
};
