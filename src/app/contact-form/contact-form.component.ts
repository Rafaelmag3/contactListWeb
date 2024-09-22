import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ContactService } from '../service/contact.service';
import { Contact } from '../interface/Contact';
import { ContactIdService } from '../service/contact-id.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export default class ContactFormComponent implements OnInit {
  // Injeccion de servicio creado para realizar peticiones a la API
  private contactService = inject(ContactService)
  private fb = inject(FormBuilder);
  private contactServiceId = inject(ContactIdService)
  private router = inject(Router)

  form?: FormGroup;
  contact?: Contact;

  ngOnInit(): void {
    const id = this.contactServiceId.getContactId();
    if (id) {
      this.contactService.get(id)
        .subscribe(contact => {
          this.contact = contact;
          this.form = this.fb.group({
            name: [contact.name, [Validators.required]],
            email: [contact.email, [Validators.required]]
          })
        })
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]]
      })
    }
  }

  action() {
    const contactForm = this.form!.value;
    if (this.contact) {
      this.contactService.update({ id: this.contact?.id, ...contactForm })
        .subscribe(() => {
          this.router.navigate(['/'])
          this.form!.reset();
          this.contactServiceId.clearContactId();
        });
    } else {
      this.contactService.create(contactForm)
        .subscribe(() => {
          this.router.navigate(['/'])
          this.form!.reset();
        });
    }
  }

}
