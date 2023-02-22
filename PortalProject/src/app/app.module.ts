import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// should probably move all these material imports to a different file at some point.
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { RouterModule, Routes } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './guards/auth-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { NewRequestComponent } from './pages/requests/new-request/new-request.component';
import { RequestsComponent } from './pages/requests/requests/requests.component';
import { CheckElegibilityComponent } from './pages/check-elegibility/check-elegibility.component';
import { AgenciesComponent } from './pages/agencies/agencies.component';
import { CaseManagersComponent } from './pages/case-managers/case-managers.component';
import { RamziAltamimiComponent } from './pages/ramzi-altamimi/ramzi-altamimi.component';
import { CompanySettingsComponent } from './pages/company-settings/company-settings.component';
import { PortalFaqsComponent } from './pages/portal-faqs/portal-faqs.component';
import { TitlebarComponent } from './shared/titlebar/titlebar.component';
import { NewUserComponent } from './pages/company-settings/new-user/new-user.component';


//all components routes
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'new-request', component: NewRequestComponent, canActivate: [AuthGuard] },
  { path: 'requests', component: RequestsComponent, canActivate: [AuthGuard] },
  { path: 'check-elegibility', component: CheckElegibilityComponent, canActivate: [AuthGuard] },
  { path: 'agencies', component: AgenciesComponent, canActivate: [AuthGuard] },
  { path: 'case-managers', component: CaseManagersComponent, canActivate: [AuthGuard] },
  { path: 'ramzi', component: RamziAltamimiComponent, canActivate: [AuthGuard] },
  { path: 'company-settings', component: CompanySettingsComponent, canActivate: [AuthGuard] },
  { path: 'portal-faqs', component: PortalFaqsComponent, canActivate: [AuthGuard] },
  { path: 'new-user', component: NewUserComponent, canActivate: [AuthGuard] },
];

//function is use to get jwt token from local storage
export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    SpinnerOverlayComponent,
    NewRequestComponent,
    RequestsComponent,
    CheckElegibilityComponent,
    AgenciesComponent,
    CaseManagersComponent,
    RamziAltamimiComponent,
    CompanySettingsComponent,
    PortalFaqsComponent,
    TitlebarComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatInputModule,
    MatCheckboxModule, MatIconModule, MatButtonModule, MatListModule, MatSidenavModule, MatSelectModule,
    MatCardModule, MatProgressSpinnerModule, MatToolbarModule, MatChipsModule, MatGridListModule, MatStepperModule,
    MatFormFieldModule, MatTabsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSnackBarModule,
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7200"],
        disallowedRoutes: []
      }
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
