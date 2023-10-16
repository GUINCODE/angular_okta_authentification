
import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OktaAuthStateService, OKTA_AUTH } from "@okta/okta-angular";
import { AuthState, OktaAuth } from "@okta/okta-auth-js";
import { filter, map, Observable } from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isAuthenticated$!: Observable<boolean>;
  constructor(
    private _router: Router,
    private _oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth
  ) {}

  public ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
  }

  public async signIn(): Promise<void> {
    try {
      await this._oktaAuth.signInWithRedirect();
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  }

  public async signOut(): Promise<void>{
    try {
      await this._oktaAuth.signOut();
    
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  }

}
