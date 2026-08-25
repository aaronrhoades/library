import { Component, ElementRef, inject, OnDestroy, viewChild } from '@angular/core';
import { CartService } from '../cart-service';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-receipt',
  styleUrl: './receipt.scss',
  templateUrl: './receipt.html',
})
export class Receipt implements OnDestroy {
  cartService = inject(CartService);
  receipt = this.cartService.receipt;
  ngOnDestroy(): void {
    this.cartService.clearReceipt();
  }

  print(): void {
    window.print();
  }
}
