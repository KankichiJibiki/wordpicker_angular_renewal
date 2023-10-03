import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AppMessages } from 'src/app/constants/app-messages';
import { WordSet } from 'src/app/models/word-set';
import { ChatgptService } from 'src/app/services/chatgpt/chatgpt.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { OverlayService } from 'src/app/services/overlay/overlay.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { WordSetService } from 'src/app/services/word-set/word-set.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  wordFormGroup: FormGroup[] = [];
  wordSetToCreate: WordSet[] = [];

  constructor(
    public wordService: WordSetService,
    private dialogService: DialogService,
    public spinnerService: SpinnerService,
    private overlayService: OverlayService
  ){}

  ngOnInit(): void {
    this.initializeWordBox();
  }

  private initializeWordBox(){
    this.overlayService.createOverlay();
    this.spinnerService.start();
    this.wordService.getWordTypes().subscribe({
      next: (res: any) => {
        console.log(res);
        this.wordService.storageWordType(res.data);
      },
      complete: () => {
        this.wordFormGroup.push(this.wordService.addWordForm());
        this.overlayService.disposeOverlay();
        this.spinnerService.stop();
      }
    });
  }

  //* 5 boxes at maximum
  public addCreateBox(): void{
    if(this.wordFormGroup.length < 5){
      this.wordFormGroup.push(this.wordService.addWordForm());
    }
  }

  public async setToCreateWord(){
    const dialogRef = this.dialogService.openYesOrNoDialog(AppMessages.WORD_PROCEED_CREATE, true);
    let dialogResult = await lastValueFrom(dialogRef.afterClosed());
    if(!dialogResult) return;
    
    this.wordFormGroup.forEach(wordBox => {
      this.wordSetToCreate.push(wordBox.value);
    });
    this.registerWordSets();
  }

  public registerWordSets(){
    this.overlayService.createOverlay();
    this.spinnerService.start();
    console.log(this.wordSetToCreate);
    this.wordService.createWordList(this.wordSetToCreate).subscribe({
      next: async (res: Response | any) => {
        const dialogRef = this.dialogService.openYesOrNoDialog(res.message, false);
        await lastValueFrom(dialogRef.afterClosed());
        this._resetWordList();
      },
      complete: () => { 
        this.overlayService.disposeOverlay();
        this.spinnerService.stop();
      }
    });
  }

  public async confirmResetWordList(): Promise<void>{
    const dialogRef = this.dialogService.openYesOrNoDialog(AppMessages.WORD_RESET_BOX, true);
    let dialogResult = await lastValueFrom(dialogRef.afterClosed());
    if(!dialogResult) return;
    this._resetWordList();
  }

  private _resetWordList(){
    this.wordFormGroup = [];
    this.wordFormGroup.push(this.wordService.addWordForm());
  }
}
