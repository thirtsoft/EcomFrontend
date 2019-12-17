import { CaddyService } from './../services/caddy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service';
import { Product } from '../model/product.model';
import { AuthentificationService } from '../services/authentification.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  currentProduct;
  public editPhoto: boolean;
  selectedFiles: any; // pour contenir l'ensemble des fichiers selectionné
  progress: number; // pour stocker l'evenement de la progression
  currentFileUpload;
  public currentTime: number;
  public mode: number=0;

  constructor(private route:ActivatedRoute,private router:Router,
    public catService:CatalogueService, public authService:AuthentificationService,
    public caddyService:CaddyService) { }

  /* ngOnInit() {
    let url = atob(this.route.snapshot.params.url);
    this.catService.getProduct(url).subscribe(data=> {
      this.currentProduct = data;
    })
    
  } */

  ngOnInit() {
    let id=this.route.snapshot.params.id;
   // let id=this.route.snapshot.params.id;
    //this.catService.getProduct(id)
   // this.catService.getResource(this.catService.host+"/products/"+id)
    this.catService.getProduct(this.catService.host+"/products/"+id)
      .subscribe(data=> {
        this.currentProduct = data;
      },err=> {
        console.log(err);
      })
  }

  onEditProduct() {
    this.mode = 1;

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
          this.currentTime = Date.now();         
        }

      }, err=> {
        alert("Problème de chargement");
      })
      this.selectedFiles = undefined;
  }

  getTS() {
    return this.currentTime;
  }

  public onUpdateProduct(data) {

  }

  
  onAddProductToCaddy(prod:Product) {
    if(!this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/login");
    }else {
      this.caddyService.addProduct(prod);

    }

  }


}
