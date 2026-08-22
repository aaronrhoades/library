import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IBook } from '@models/iBook';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IBookSearchFilter } from '@models/iBookSearchFilter';

@Service()
export class BookService {
    private http: HttpClient = inject(HttpClient);
    
    searchBooks(searchTerm: IBookSearchFilter) : Observable<IBook[]> {
        let params = new HttpParams();
        if(!!searchTerm.title)
            params = params.set('title', searchTerm.title);
        if(!!searchTerm.author)
            params = params.set('author', searchTerm.author);
        console.log('here');
        if (searchTerm.available !== undefined) {
            params = params.set('available', String(searchTerm.available));
        }
        if (searchTerm.sortBy) {
        params = params.set('sortBy', searchTerm.sortBy);
        }

        if (searchTerm.sortDirection) {
        params = params.set('sortDirection', searchTerm.sortDirection);
        }
        return this.http.get<IBook[]>(`${environment.apiUrl}/book/search`, { params });
    }
    getAllBooks() : Observable<IBook[]> {
        return this.http.get<IBook[]>(`${environment.apiUrl}/book`);
    }
    getFeaturedBooks() : Observable<IBook[]> {
        return this.http.get<IBook[]>(`${environment.apiUrl}/book/featured`);
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
