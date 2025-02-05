import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzExceptionStatusType, NzResultModule } from 'ng-zorro-antd/result';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrl: './error.component.less',
    imports: [NzButtonModule, NzResultModule],
    standalone: true
})
export class ErrorComponent implements OnInit {
    private router: Router = inject(Router);
    private route: ActivatedRoute = inject(ActivatedRoute);

    status: NzExceptionStatusType = '404';
    title = '404';
    subtitle = 'Sorry, the page you visited does not exist.';

    ngOnInit(): void {
      const errorCode = this.route.snapshot.data?.['error'];
      if(errorCode && errorCode === 500) {
        this.status = '500';
        this.title = '500';
        this.subtitle = 'Sorry, there is an error on server.'
      }
    }

    goHome() {
        this.router.navigate(['/']);
    }
}
