import { Injectable, Inject, OnInit  } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { AuthState, OktaAuth } from "@okta/okta-auth-js";

import { OktaAuthStateService, OKTA_AUTH } from "@okta/okta-angular";
import { filter, map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OktaAuthGuard implements CanActivate {

  //  public isAuthenticated$!: Observable<boolean>;

  constructor(
    private _router: Router,
     private _oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth
  ) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._oktaStateService.authState$.pipe(
      filter((s) => !!s),
      map((authState) => {
        if (!authState.isAuthenticated) {
          // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion.
          this._router.navigate(["/login"]);
          return true;
        }
        return true;
      })
    );
  }
}
