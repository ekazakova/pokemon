import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
    selector: 'app-page-not-found',
    imports: [NzButtonModule, NzResultModule],
    templateUrl: './page-not-found.component.html',
    styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
    private router: Router = inject(Router);
    goHome() {
        this.router.navigate(['/']);
    }
}
