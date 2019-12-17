import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from '../model/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentAmount:number;
  currentOrder:Order;
  public mode:number=0;
  panelStyle:string= "panel-default";
  constructor(private router:Router, private route:ActivatedRoute,
              public orderService:OrderService) { }

  ngOnInit() {
    let id=this.route.snapshot.params.orderID
    this.orderService.getOrder(id).subscribe(data=>{
      this.currentOrder=data;
    },err=>{
      console.log(err);
    })
  }

  onPayOrder(data) {
    console.log(data);
  }

  onOrder() {

  }

  onParOrder(data) {
    console.log(data);
  } 


}
