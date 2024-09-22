import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';

// Establecer las rutas de mi aplicación
export const routes: Routes = [
    {
        path: '',
        component: ContactListComponent
    },
    {
        path: 'new',
        loadComponent: () => import('./contact-form/contact-form.component')
    },
    {
        path: 'edit',
        loadComponent: () => import('./contact-form/contact-form.component')
    }
];
