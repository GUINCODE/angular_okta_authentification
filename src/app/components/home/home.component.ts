import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OktaAuthStateService, OKTA_AUTH } from "@okta/okta-angular";
import { AuthState, OktaAuth } from "@okta/okta-auth-js";
import { filter, map, Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  userName: string = "";
  userEmail: string = "";

  constructor(
    private _router: Router,
    private _oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,
    @Inject(DOCUMENT) private _document: Document
  ) {}

   ngOnInit(): void {
    this._oktaStateService.authState$
      .pipe(
        filter((authState) => !!authState && !!authState.isAuthenticated), // Vérification de nullité
        map((authState) => authState?.idToken?.claims) // Récupère les informations de l'utilisateur depuis le jeton
      )
      .subscribe((userClaims) => {
        if (userClaims) {
          // Les informations de l'utilisateur, telles que le nom et le prénom, sont stockées dans les "claims" du jeton
          this.userName = `${userClaims.name}`;
          this.userEmail = `${userClaims.email}`;
        }
      });
  }
}

