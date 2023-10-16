import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OktaAuthStateService, OKTA_AUTH } from "@okta/okta-angular";
import { AuthState, OktaAuth } from "@okta/okta-auth-js";
import { filter, map, Observable } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router,
    private _oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit(): void {
    // vavigate vers home si user connecter
    this._oktaStateService.authState$.subscribe((authState) => {
      if (authState.isAuthenticated) {
        this._router.navigate(["/home"]);
      }
    });
  }

    public async signIn(): Promise<void> {
    try {
      await this._oktaAuth.signInWithRedirect();
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  }

}
