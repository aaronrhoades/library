import { Component, inject, OnInit, signal } from '@angular/core';
import { IUserRentalGroupDto } from '@models/iUserRentalGroupDto';
import { switchMap } from 'rxjs';
import { ReturnRentalItem } from "../return-rental-item/return-rental-item";
import { ReturnRentalService } from '../return-rental-service';
import { form, required, FormField } from '@angular/forms/signals';

interface UserSearchForm {
  email: string;
}

@Component({
  imports: [ReturnRentalItem, FormField],
  selector: 'app-return-rentals',
  styleUrl: './return-rentals.scss',
  templateUrl: './return-rentals.html',
})
export class ReturnRentals implements OnInit {
  returnRentalService = inject(ReturnRentalService);
  rentalsByUser = signal<IUserRentalGroupDto[]>([]);
  byUser = signal<boolean>(false);
  userSearchModel = signal<UserSearchForm>({email: ''});
  userSearchForm = form(this.userSearchModel, schema => {
    required(schema.email)
  });

  ngOnInit(): void {
    this.returnRentalService.getRentalsGroupByUserEmail().subscribe({
      next: (x) => this.rentalsByUser.set(x)
    });
  }

  searchByUser(event: Event) {
    event.preventDefault();
    const formValue = this.userSearchForm().value(); 
    this.returnRentalService.getRentalsByUserEmail(formValue.email).subscribe(
      res => {
        this.byUser.set(true);
        this.rentalsByUser.set(res)
      }
    );
  }
  clearUser(event: Event) {
    event.preventDefault();
    this.returnRentalService.getRentalsGroupByUserEmail().subscribe({
      next: (x) => {
        this.userSearchModel.set({email: ''});
        this.rentalsByUser.set(x)
        this.byUser.set(false);
      }
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
