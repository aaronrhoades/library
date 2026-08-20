import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IBook } from '@models/iBook';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Service()
export class BookService {
    private http: HttpClient = inject(HttpClient);
    
    searchBooks(searchTerm: string) : Observable<IBook[]> {
        const params = new HttpParams().set('searchTerm', searchTerm);

        return this.http.get<IBook[]>(`${environment.apiUrl}/book/search`, { params });
    }
    getAllBooks() : Observable<IBook[]> {
        return this.http.get<IBook[]>(`${environment.apiUrl}/book`);
    }
    getBookById(id: string) : Observable<IBook> {
        return this.http.get<IBook>(`${environment.apiUrl}/book/${id}`);
    }
    saveBook(book: Omit<IBook, 'id'>) : Observable<IBook> {
        return this.http.post<IBook>(`${environment.apiUrl}/book`, book);
    }
    updateBook(book: IBook) : Observable<IBook> {
        return this.http.put<IBook>(`${environment.apiUrl}/book/${book.id}`, book);
    }
    deleteBook(id: string) : Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/book/${id}`);
    }
}
