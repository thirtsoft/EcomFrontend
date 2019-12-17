import { CaddyService } from './../services/caddy.service';
import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthentificationService } from '../services/authentification.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products;
  editPhoto:boolean;
  currentProduct:any;
  selectedFiles; // pour contenir l'ensemble des fichiers selectionné
  progress: number; // pour stocker l'evenement de la progression
  currentFileUpload;
  title:string;
  timestamp:number=0;

  constructor(public catService: CatalogueService, private route: ActivatedRoute,
    private router:Router, public auhtService:AuthentificationService,
    public caddyService:CaddyService) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        let url = val.url;
        console.log(url);
        let p1 = this.route.snapshot.params.p1;
        if(p1 == 1) {
          this.title = "Produits Selectionné";
            this.getProducts('/products/search/selectedProducts'); // affiche par défaut les produits selectionné
        }else if (p1 == 2) {
            let idCat = this.route.snapshot.params.p2;
            this.title = "Produits de la categorie "+idCat;
            this.getProducts('/categories/'+ idCat+'/products');
        }
        else if (p1 == 3) {
          this.title = "Produits en Promotions";
          this.getProducts('/products/search/promoProducts');
        }
        else if (p1 == 4) {
          this.title = "Produits Disponible";
          this.getProducts('/products/search/dispoProducts');
        }
        else if (p1 == 5) {
          this.title = "Recherche";
          this.getProducts('/products/search/dispoProducts');
        }

      }
    });
    let p1 = this.route.snapshot.params.p1;
    if(p1 == 1) {
      this.getProducts('/products/search/selectedProducts');
    } 
  }
  // Affichée les produits selectionnées par défaut
  private getProducts(url) {
    this.catService.getResource(url)
      .subscribe(data=> {
        this.products = data;
      }, err=> {
        console.log(err);
      })
  }

  onEditPhoto(prod) {
    this.currentProduct = prod;
    this.editPhoto = true;
  }

  onSelectFile(event) {
    this.selectedFiles = event.target.files;

  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProducts(this.currentFileUpload, this.currentProduct.id)
      .subscribe(event=> {
        if(event.type == HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log(this.progress);
        }else if(event instanceof HttpResponse) {
          this.timestamp = Date.now();
         // this.getProducts('/products/search/selectedProducts');          
        }

      }, err=> {
        alert("Problème de chargement");
      })
      this.selectedFiles = undefined;
  }

  getTS() {
    return this.timestamp;
  }

  isAdmin() {
    return this.auhtService.isAdmin();

  }

  onProductDetails(prod:Product) {
    //let url = btoa(prod._links.product.href);
    //this.router.navigateByUrl("product-details/"+url);
    this.router.navigateByUrl("/product/"+prod.id);
  }

  onAddProductToCaddy(prod:Product) {
    //this.caddyService.addProductToCaddy(prod);
    if(!this.auhtService.isAuthenticated()) {
      this.router.navigateByUrl("/login");
    }else {
      this.caddyService.addProduct(prod);
    }
    

  } 

 /*  onAddProductToCaddy(prod:Product) {
    //this.caddyService.addProductToCaddy(prod);
    
      this.caddyService.addProduct(prod);
    

  } */

}
