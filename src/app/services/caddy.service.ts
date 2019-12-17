import { Client } from './../model/client.model';
import { Product } from './../model/product.model';
import { Injectable } from '@angular/core';
import { Caddy } from '../model/caddy.model';
import { ProductItem } from '../model/product-item.model';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {
  public currentCaddyName:string = "Caddy1";
  public listCaddies:Array<{num:number,name:string}>=[{num:1,name:'Caddy1'}];
  public caddies:Map<string,Caddy> = new Map();

  constructor(private authService:AuthentificationService) {
    if(this.authService.isAuthenticated()) {
      this.loadCaddyFromLocalStorage();
    }else {
      this.caddies[this.currentCaddyName] = new Caddy(this.currentCaddyName);
    }
  }
    /* let caddies = localStorage.getItem("myCaddies");
    if(caddies) {
      this.caddies = JSON.parse(caddies);
    } else {
      this.caddies[this.currentCaddyName]=new Caddy(this.currentCaddyName);;
      //this.caddies.set(this.currentCaddyName,caddy);
    }
    
  } */

  public addProductToCaddy(id:number,name:string,price:number,quantity:number):void {
    //let caddy = this.caddies.get(this.currentCaddyName);
    //let productItem:ProductItem = caddy.items.get(product.id);
    let caddy=this.caddies[this.currentCaddyName];
    console.log(caddy);
    let item=caddy.items[id];
    if(item===undefined) {
      item=new ProductItem(); item.id=id; item.name=name;
      item.price=price; item.quantity=quantity;
      caddy.items[id]=item;
    }else {
      item.quantity+=quantity;
    }
    //let productItem:ProductItem = caddy.items[product.id];
    /* if(productItem) {
      productItem.quantity+= product.quantite;
    }else {
      productItem = new ProductItem();
      productItem.price = product.currentPrice;
      productItem.quantity = product.quantite;
      productItem.product = product;
      //caddy.items.set(product.id,productItem);
      caddy.items[product.id] = productItem;
      this.saveCaddies();
    } */

  }

  public removeProduct(id:number) {
    let caddy = this.caddies[this.currentCaddyName];
    delete caddy.items[id];
    this.saveCaddy();
  }

  public addProduct(product:Product) {
    this.addProductToCaddy(product.id,product.name,product.currentPrice,product.quantity);
    this.saveCaddy();
  }

  public loadCaddyFromLocalStorage(){
    let myCaddiesList=localStorage.getItem("ListCaddies_"+this.authService.authenticatedUser.username);
    this.listCaddies=myCaddiesList==undefined?[{num:1,name:'Caddy1'}]:JSON.parse(myCaddiesList);
    this.listCaddies.forEach(c=>{
      let cad=localStorage.getItem("myCaddy_"+this.authService.authenticatedUser.username+"_"+c.name);
      this.caddies[c.name]=cad==undefined?new Caddy(c.name):JSON.parse(cad);
    })
  }

  public getCaddy():Caddy{
    let caddy=this.caddies[this.currentCaddyName];
    return caddy;
  }

  saveCaddy() {
    let caddy=this.caddies[this.currentCaddyName];
    localStorage.setItem("myCaddy_"+this.authService.authenticatedUser.username+"_"+this.currentCaddyName,JSON.stringify(caddy));
  }


 /*  getCurrentCaddy(): Caddy {
    let caddy=this.caddies[this.currentCaddyName];
    return caddy;
   //return this.caddies[this.currentCaddyName];
   // return this.caddies.get(this.currentCaddyName);
  } */

 /*  public saveCaddy() {
    let caddy = this.caddies[this.currentCaddyName];
    localStorage.setItem("myCaddy_"+this.authService.authenticatedUser.username+"_"+this.currentCaddyName, JSON.stringify(caddy));
  } */

  getCaddySize() {
    let caddy = this.caddies[this.currentCaddyName];
    //let caddy = this.getCurrentCaddy();
    return Object.keys(caddy.items).length;
  }

  emptyCaddy() {
    this.caddies = new Map();
    this.listCaddies = [];
  }

  getTotalCurrentCaddy() {
    let caddy=this.caddies[this.currentCaddyName];
    let total=0;
    for(let key in caddy.items ){
      total+=caddy.items[key].price*caddy.items[key].quantity;
    }
    return total;
  }

 /*  public getTotalCaddy():number {
    let total = 0;
    let caddy = this.caddies[this.currentCaddyName];
    for(let key in caddy.items) {
      total+=caddy.items[key].price*caddy.items[key].quantity;
    }
    return total;

  } */

  addNewCaddy(c: { num: number; name: string }) {
    this.listCaddies.push(c);
    this.caddies[c.name]=new Caddy(c.name);
    localStorage.setItem("ListCaddies_"+this.authService.authenticatedUser.username,JSON.stringify(this.listCaddies));
  }

 /*  addNewCaddy(c: {num:number; name:string}) {
    this.listCaddies.push(c);
    this.caddies[c.name]=new Caddy(c.name);
    localStorage.setItem("ListCaddies_"+this.authService.authenticatedUser.username, JSON.stringify(this.listCaddies));
  } */

  setClient(client: Client) {
    this.getCaddy().client = client;
    this.saveCaddy();

  
  //this.getCurrentCaddy().client = client;
 // this.saveCaddy();
}
 

 // 1ère methode
 /*  public getTotal():number {
    let total = 0;
    //let items:Array<ProductItem>=this.getCurrentCaddy().items.values();
    let items:IterableIterator<ProductItem>=this.getCurrentCaddy().items.values();
    for (let pi of items) {
      total+=pi.price*pi.quantity

    }

    return total; 

  }
 */

}
