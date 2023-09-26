import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AppMessages } from 'src/app/constants/app-messages';
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
export class IndexComponent implements OnInit{
  wordSetList: FormGroup[] = [];

  constructor(
    public wService: WordSetService,
    private aService: AuthService,
    private dialogService: DialogService,
    public spinnerService: SpinnerService,
    private overlayService: OverlayService,
    private createWordValidations: CreateWordValidatoins
  ){
  }

  ngOnInit(): void {
    this.wordSetList.push(this.wService.addWordForm());
  }

  public addCreateBox(): void{
    this.wordSetList.push(this.wService.addWordForm());
  }

  public async resetWordList(): Promise<void>{
    const dialogRef = this.dialogService.openYesOrNoDialog(AppMessages.WORD_RESET_BOX, true);
    let dialogResult = await lastValueFrom(dialogRef.afterClosed());
    if(!dialogResult) return;

    this.wordSetList = [];
    this.wordSetList.push(this.wService.addWordForm());
  }
}
