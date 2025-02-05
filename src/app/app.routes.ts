import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';
import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: ListComponent },
            { path: ':id', component: DetailsComponent },
            { path: ':id/edit', component: EditComponent },
        ],
    },
    { path: 'error/404', component: ErrorComponent, data: { error: 404 } },
    { path: 'error/500', component: ErrorComponent, data: { error: 500 } },
    { path: '**', component: ErrorComponent }
];
