import { Caddy } from './../model/caddy.model';
import { ProductItem } from './../model/product-item.model';
import { CaddyService } from './../services/caddy.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from '../services/catalogue.service';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.scss']
})
export class CaddiesComponent implements OnInit {
  currentCaddyName:string = "Caddy1";
 // caddy:Caddy= new Caddy(this.currentCaddyName); 
  public caddy: Caddy;
  

  constructor(public caddyService:CaddyService, private router:Router,
    private catService:CatalogueService, private authService:AuthentificationService) { }

  ngOnInit() {
   // this.caddy = this.caddyService.getCurrentCaddy();
   if(!this.authService.isAuthenticated())
     this.router.navigateByUrl('/login');
   this.caddy=this.caddyService.getCaddy();
   console.log(this.caddy);
   
  }

  onRemoveProductFromCaddy(p: ProductItem) {

  }

  getTotal() {
    return this.caddyService.getTotalCurrentCaddy();
  }

  onNewOrder() {
    this.router.navigateByUrl("/client");
  }

  onAddCaddy() {

  }

  onSelectCaddy(caddy: {num:number; name: string}) {

  }

}
