import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {StorageService} from "../services/storage.service";

//Forma antigua deprecada de AuthGuard...
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private storageService: StorageService, private router: Router) {
//   }
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (!this.storageService.isLoggedIn()) {
//       this.router.navigateByUrl('/login').then();
//       return false;
//     } else {
//       return true;
//     }
//   }
//
// }
export const canActivateAdmin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  if (!storageService.isLoggedIn()) {
    router.navigateByUrl('/login').then();
    return false;
  } else if (!storageService.isAdmin()) {
    // Redirigir a una página de acceso denegado o mostrar un mensaje
    // dependiendo de cómo quieras manejar este caso.
    router.navigateByUrl('/access-denied').then();
    return false;
  } else {
    return true;
  }
}
export const canActivateProfesor: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  if (!storageService.isLoggedIn()) {
    router.navigateByUrl('/login').then();
    return false;
  } else if (!storageService.isProfesor()) {
    // Redirigir a una página de acceso denegado o mostrar un mensaje
    // dependiendo de cómo quieras manejar este caso.
    router.navigateByUrl('/access-denied').then();
    return false;
  } else {
    return true;
  }
}
export const canActivateEstudiante: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  if (!storageService.isLoggedIn()) {
    router.navigateByUrl('/login').then();
    return false;
  } else if (!storageService.isEstudiante()) {
    // Redirigir a una página de acceso denegado o mostrar un mensaje
    // dependiendo de cómo quieras manejar este caso.
    router.navigateByUrl('/access-denied').then();
    return false;
  } else {
    return true;
  }
}
