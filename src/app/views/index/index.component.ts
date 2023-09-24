import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DialogResult } from '../components/dialog/yes-or-no-dialog/yes-or-no-dialog.component';
import { lastValueFrom } from 'rxjs';
import { WordType } from 'src/app/models/word-type';
import { Signin } from 'src/app/models/signin';
import { UserList } from 'src/app/models/user-list';
import { WordSet } from 'src/app/models/word-set';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { OverlayService } from 'src/app/services/overlay/overlay.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { WordSetService } from 'src/app/services/word-set/word-set.service';
import { CreateWordValidatoins } from 'src/app/validations/create-word-validatoin';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  wordSetList: WordSet[] = [];

  constructor(
    public wService: WordSetService,
    private aService: AuthService,
    private dialogService: DialogService,
    public spinnerService: SpinnerService,
    private overlayService: OverlayService,
    private createWordValidations: CreateWordValidatoins
  ){

  }

  public addCreateBox(): void{
    console.log(this.wordSetList);
    const newWordSet = new WordSet();
  }

}
