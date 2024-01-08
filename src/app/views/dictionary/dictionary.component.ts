import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { WordSet } from 'src/app/models/word-set';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent {
  public username: string = "";
  public wordSet!: any;
  @ViewChild('detailSidenav') sidenav!: MatSidenav;

  constructor(
    private authService: AuthService,
  ){
    this.username = authService.usernameSubject.value;
  }

  public openDetailSidenav(wordSet: WordSet){
    this.wordSet = wordSet;
    this.sidenav.open();
  }
}
