import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { SpinnerOverlayService } from '../../services/spinner-overlay.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin?: boolean;
  showError: boolean = false;
  errorMessage: string = '';
  emailStep: boolean = true;
 
  constructor(private router: Router, private http: HttpClient,
    private authService: AuthService, private overlayService: SpinnerOverlayService) { }

    ngOnInit(): void {
      this.emailStep = true;
    }


  loginUser = (form: NgForm) => {
    this.showError = false;

    this.overlayService.show();
    this.authService.loginUser('login', form.value)
      .subscribe(res => {
        this.invalidLogin = false;
          localStorage.setItem("token", res.token);
          this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
          this.router.navigate(["/new-request"]);
          this.overlayService.hide();
        },
        err => {
          this.invalidLogin = true;
          this.errorMessage = err.message;
          this.showError = true;
          this.overlayService.hide();
        }
      )
  }

  handleNext(form: NgForm) {
    if(form.form.controls['email'].valid)
      this.emailStep = false;
    else {
      this.errorMessage = "Please enter a valid email address";
      this.showError = true;
    }
  }

  handleGoBack() {
    this.emailStep = true;
  }
}
