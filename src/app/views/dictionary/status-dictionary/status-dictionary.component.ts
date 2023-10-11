import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-status-dictionary',
  templateUrl: './status-dictionary.component.html',
  styleUrls: ['./status-dictionary.component.css']
})
export class StatusDictionaryComponent {
  public username = "";
  constructor(private authService: AuthService){
    this.username = authService.usernameSubject.value;
  }
}
