import { Component, ElementRef, inject, NgZone, OnInit, signal, viewChild, OnDestroy } from '@angular/core';
import { CartService } from '../cart-service';
import { IBook } from '@models/iBook';
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { I18nPluralPipe } from '@angular/common';
import { filter, fromEvent, Subscription } from 'rxjs';
import { FormField } from "@angular/forms/signals"; 

@Component({
  imports: [RouterLink, I18nPluralPipe, FormField],
  selector: 'app-cart-notification-bar',
  styleUrl: './cart-notification-bar.scss',
  templateUrl: './cart-notification-bar.html',
})
export class CartNotificationBar implements OnInit, OnDestroy {
  private ngZone = inject(NgZone);
  private cartService = inject(CartService);
  private router = inject(Router);
  cart = this.cartService.cart;
  itemMapping: { [k: string]: string } = {
    '=0': 'items',
    '=1': 'item',
    'other': 'items' 
  };
  isCartPage = signal<boolean>(false);
  isSticky = signal<boolean>(false);

  private scrollSubscription: Subscription | null = null;
  
  stickyBar = viewChild<ElementRef<HTMLDivElement>>('stickyBar');

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe({
      next: route => {
        this.isCartPage.set(route.urlAfterRedirects === '/cart');
      }
    });

    // Listen to 'scroll', extract window metrics, safely query view height
    this.ngZone.runOutsideAngular(() => {
      this.scrollSubscription = fromEvent(document, 'scroll')
        .subscribe(() => {
          const currentScroll = window.scrollY || document.documentElement.scrollTop;
          const barHeight = this.stickyBar()?.nativeElement.clientHeight || 0;
          const barTop = this.stickyBar()?.nativeElement.offsetTop || 0;

          if (currentScroll > barHeight + barTop) {
            this.isSticky.set(true);
          } else {
            this.isSticky.set(false);
          }
        });
    });
  }
  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}