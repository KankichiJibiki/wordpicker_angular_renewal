import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OverlayService } from 'src/app/services/overlay/overlay.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent {
  username: string = "";
  constructor(
    private authService: AuthService,
  ){
    this.username = authService.usernameSubject.value;
  }
}
