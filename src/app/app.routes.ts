import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: ListComponent },
            { path: ':id', component: DetailsComponent },
            { path: ':id/edit', component: EditComponent },
        ],
    },
    { path: 'error/404', component: PageNotFoundComponent },
    { path: '**', component: PageNotFoundComponent }
];
