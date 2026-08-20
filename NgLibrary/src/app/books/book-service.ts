import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IBook } from '@models/iBook';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Service()
export class BookService {
    private http: HttpClient = inject(HttpClient);
    
    getAllBooks() : Observable<IBook[]> {
        return this.http.get<IBook[]>(`${environment.apiUrl}/book`);
    }
    getBookById(id: string) : Observable<IBook> {
        return this.http.get<IBook>(`${environment.apiUrl}/book/${id}`);
    }
    saveBook(book: Omit<IBook, 'id'>) : Observable<IBook> {
        return this.http.post<IBook>(`${environment.apiUrl}/book`, book);
    }
}
