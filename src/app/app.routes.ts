import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: ListComponent },
            { path: ':id', component: DetailsComponent },
            { path: ':id/edit', component: EditComponent },
        ],
    },
];
