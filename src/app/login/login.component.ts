import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { CaddyService } from '../services/caddy.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthentificationService,private router:Router,
    private caddyService:CaddyService) { }

  ngOnInit() {
  }

  onLogin(dataForm: any) {
    this.authService.login(dataForm.username, dataForm.password);
    if(this.authService.isAuthenticated) {
      this.caddyService.loadCaddyFromLocalStorage();
      this.router.navigateByUrl('');
      //this.authService.saveAuthentificatedUser();
      //this.router.navigateByUrl('');
    }
  }

}
