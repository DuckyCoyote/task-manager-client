import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  
  // En el servidor, siempre permitir el acceso
  if (!isPlatformBrowser(platformId)) {
    return true;
  }
  
  if (auth.getToken()) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};
