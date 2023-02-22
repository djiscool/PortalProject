import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(private contexts: ChildrenOutletContexts, private router: Router,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isUserAuthenticated();
    this.authService.authChanged
      .subscribe(res => {
        this.isAuthenticated = res;
        if (this.isAuthenticated != true)
          this.router.navigate(["/login"]);
      })
  }
}

