import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../interface/Contact';
import { IdDeteleContact } from '../interface/ContactDeleteRequest';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient)

  list(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:8080/api/contacts');
  }

  get(id: number) {
    return this.http.get<Contact>(`http://localhost:8080/api/contacts/${id}`);
  }

  create(contact: Contact) {
    return this.http.post('http://localhost:8080/api/contacts', contact);
  }

  update(contact: Contact) {
    return this.http.put<Contact>('http://localhost:8080/api/contacts', contact);
  }

  delete(id: IdDeteleContact) {
    return this.http.put<void>(`http://localhost:8080/api/contacts/delete`, id);
  }
}
