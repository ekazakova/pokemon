import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

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
