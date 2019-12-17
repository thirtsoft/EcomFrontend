import { CaddyService } from './services/caddy.service';
import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './services/catalogue.service';
import { Router } from '@angular/router';
import { AuthentificationService } from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  categories;
  currentCategorie;

  constructor(public catService: CatalogueService, private router:Router,
    public authService:AuthentificationService,public caddyService:CaddyService){}

  ngOnInit() {
   // this.authService.loadUserAuthenticatedUserFromLocalStorgae();
    this.getCategories();
    this.authService.loadUser();
    if(this.authService.isAuthenticated()) {
      this.caddyService.loadCaddyFromLocalStorage();
    }
  }

  private getCategories() {
    this.catService.getResource("/categories")
      .subscribe(data=> {
        this.categories = data;
      }, err=> {
        console.log(err);
      })

  }
  // affiché le produit par catégorie
  getProductsByCat(cat) {
    this.currentCategorie = cat;
    this.router.navigateByUrl('/products/2/'+cat.id);

  }

  onSelectedProducts() {
    this.currentCategorie = undefined;
    this.router.navigateByUrl("/products/1/0");

  }

  onProductsPromo() {
    this.currentCategorie = undefined;
    this.router.navigateByUrl("/products/3/0");

  }

  onProductsDispo() {
    this.currentCategorie = undefined;
    this.router.navigateByUrl("/products/4/0");

  }

  onLogin() {
    this.router.navigateByUrl('/login');
  }

  onLogout() {
    this.caddyService.emptyCaddy();
    this.authService.logout();
    this.router.navigateByUrl('/login')
   // this.authService.removeTokenFromLocalStorage();
    //this.router.navigateByUrl('/login');
  }

}
