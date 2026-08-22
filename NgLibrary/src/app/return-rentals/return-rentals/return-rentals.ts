import { Component, inject, OnInit, signal } from '@angular/core';
import { IUserRentalGroupDto } from '@models/iUserRentalGroupDto';
import { switchMap } from 'rxjs';
import { ReturnRentalItem } from "../return-rental-item/return-rental-item";
import { ReturnRentalService } from '../return-rental-service';

@Component({
  imports: [ReturnRentalItem],
  selector: 'app-return-rentals',
  styleUrl: './return-rentals.scss',
  templateUrl: './return-rentals.html',
})
export class ReturnRentals implements OnInit {
  returnRentalService = inject(ReturnRentalService);
  rentalsByUser = signal<IUserRentalGroupDto[]>([]);

  ngOnInit(): void {
    this.returnRentalService.getRentalsGroupByUserEmail().subscribe({
      next: (x) => this.rentalsByUser.set(x)
    });
  }

  returnBook(bookId: string) {
    this.returnRentalService.returnRental(bookId)
    .pipe(switchMap(x => {
      return this.returnRentalService.getRentalsGroupByUserEmail()
    }))
    .subscribe({
      next: (x) => this.rentalsByUser.set(x)
    });
  }
}
