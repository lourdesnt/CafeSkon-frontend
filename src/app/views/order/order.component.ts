import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    postalCode: [null, Validators.required, Validators.minLength(5), Validators.maxLength(5)],
    phone: [null, Validators.required, Validators.minLength(5), Validators.maxLength(9)],
    payment: ['Cash', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
