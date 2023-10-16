import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OktaAuthStateService, OKTA_AUTH } from "@okta/okta-angular";
import { AuthState, OktaAuth } from "@okta/okta-auth-js";
import { filter, map, Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent  {

}
