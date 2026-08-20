import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { ICategory } from '@models/iCategory';
@Service()
export class CategoryService {
    http = inject(HttpClient);

    getAllCategories() {
        return this.http.get<ICategory[]>(`${environment.apiUrl}/category`);
    }
}
