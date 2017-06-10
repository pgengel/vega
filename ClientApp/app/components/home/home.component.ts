import { AuthService } from './../../auth/auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(public auth: AuthService) { }
}
