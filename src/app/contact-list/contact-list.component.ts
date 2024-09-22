import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { Contact } from '../interface/Contact';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ContactIdService } from '../service/contact-id.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  private contactService = inject(ContactService)
  private contactServiceId = inject(ContactIdService)
  private router = inject(Router)
  contacts: Contact[] = []
  idContact: number | null = null;

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.contactService.list()
      .subscribe(contacts => {
        this.contacts = contacts
      })
  }

  deleteContact(contact: Contact): void {
    this.contactService.delete({ id: contact.id })
      .subscribe(() => {
        this.loadAll();
      })
  }

  editContact(id: number): void {
    this.contactServiceId.setContactId(id)
    this.router.navigate(['/edit']);
  }

}
