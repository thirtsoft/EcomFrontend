import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public authenticated: boolean;
  public authenticatedUser;
  private users=[
    {username:'admin',password:'1234',roles:['ADMIN','USER']},
    {username:'user1',password:'1234',roles:['USER']},
    {username:'user2',password:'1234',roles:['USER']}
  ];

  public token:string;

  constructor(private http:HttpClient) { 

  }

  public login(username:string,password:string) {
    let user = undefined;
    this.users.forEach(u=> {
      if(u.username === username && u.password === password) {
        user = u;
        //this.token = btoa(JSON.stringify({username:u.username,roles:u.roles}));
      }
    });
    if(user) {
      this.authenticated = true;
      this.authenticatedUser = user;
      localStorage.setItem("authenticatedUser",JSON.stringify(this.authenticatedUser));
    }else {
      this.authenticated = false;
      //this.userAuthenticated = undefined;
    }
  }

  loadUser() {
    let user = localStorage.getItem('authenticatedUser');
    if(user) {
      this.authenticatedUser = JSON.parse(user);
      this.authenticated = true;
    }
  }

  public isAdmin() {
    if(this.authenticatedUser) {
      return this.authenticatedUser.roles.indexOf('ADMIN')>-1;
    }else {
      return false;
    }
    
  }

  isAuthenticated() {
    return this.authenticated;
  }

  logout() {
    this.authenticated = false;
    this.authenticatedUser = undefined;
    localStorage.removeItem('authenticatedUser');
  }

  /* public saveAuthentificatedUser() {
    if(this.userAuthenticated) {
      localStorage.setItem('authToken',this.token);
    }
  }

  public loadUserAuthenticatedUserFromLocalStorgae() {
    let t = localStorage.getItem('authToken');
    if(t) {
      let user = JSON.parse(atob(t));
      this.userAuthenticated = {username:user.username,roles:user.roles};
      this.isAuthenticated = true;
      this.token = t;
    }
    
  }
/*Suppression du token après déconnection et réinitialisation des
paramètres de connexion
  public removeTokenFromLocalStorage() {
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.token = undefined;
    this.userAuthenticated = undefined;

  } */

}
