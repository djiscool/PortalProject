import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { SpinnerOverlayService } from '../../../services/spinner-overlay.service';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  @ViewChild(NgForm) userForm!: NgForm;
  title: string = 'New User';

  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    role: ['', Validators.required],
    email: ['', Validators.required],
    loginMethod: ['', Validators.required],
    password: ['', Validators.required]
  });

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private http: HttpClient, private overlayService: SpinnerOverlayService,
    private authService: AuthService, private _snackBar: MatSnackBar, private _formBuilder: FormBuilder,
    private router: Router) {

  }

  inviteUser = () => {
    if (!this.firstFormGroup.valid) {
      this.firstFormGroup.markAllAsTouched();
      return;
    }
    this.overlayService.show();
    this.http.post<any>(environment.apiUrl + '/users/create', this.firstFormGroup.value)
      .subscribe(res => {
        this.overlayService.hide();
        this.router.navigate(["/company-settings"]);
      },
        err => {
          this._snackBar.open('An Error Occured', err.message, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
          this.overlayService.hide();
        }
      )
  }

  cancel() {

  }

  logout(): void {
    this.authService.logout();
  }


}
