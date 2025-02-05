import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.less',
  imports: [NzButtonModule, NzResultModule],
  standalone: true
})
export class ServerErrorComponent {
 private router: Router = inject(Router);
    goHome() {
        this.router.navigate(['/']);
    }
}
