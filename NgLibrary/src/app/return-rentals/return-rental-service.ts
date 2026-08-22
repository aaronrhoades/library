import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '@environments/environment';
import { IUserRentalGroupDto } from '@models/iUserRentalGroupDto';
import { Observable } from 'rxjs';

@Service()
export class ReturnRentalService {
    private apiUrl = environment.apiUrl;
    private http = inject(HttpClient);
    
    getRentalsGroupByUserEmail(): Observable<IUserRentalGroupDto[]>  {
        return this.http.get<IUserRentalGroupDto[]>(`${this.apiUrl}/book/rentals-by-user`);
    }

    getRentalsByUserEmail(userEmail: string) {

    }
    returnRental(bookId: string) {
        return this.http.patch(`${this.apiUrl}/book/return`, null, { params: { bookId } });
    }
}
