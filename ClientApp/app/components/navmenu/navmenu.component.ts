import { AuthService } from './../../auth/auth.service';

import { Component } from '@angular/core';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }
}
