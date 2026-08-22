import { DatePipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { IBook } from '@models/iBook';
import { ReturnRentalService } from '../return-rental-service';

@Component({
  imports: [DatePipe],
  selector: 'app-return-rental-item',
  styleUrl: './return-rental-item.scss',
  templateUrl: './return-rental-item.html',
})
export class ReturnRentalItem {
  rental = input.required<IBook>();
  returnRental = output<string>();
  returnRentalService = inject(ReturnRentalService);

  returnBook(bookId: string) {
    this.returnRental.emit(bookId);
  }
}
