import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrl: './page-not-found.component.less',
    imports: [NzButtonModule, NzResultModule],
    standalone: true
})
export class PageNotFoundComponent {
    private router: Router = inject(Router);
    goHome() {
        this.router.navigate(['/']);
    }
}
