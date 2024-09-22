import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactIdService {

  private contactId?: number; 

  setContactId(id: number) {
    this.contactId = id;
  }

  getContactId(): number | undefined {
    return this.contactId;
  }

  clearContactId() {
    this.contactId = undefined;
  }

}
