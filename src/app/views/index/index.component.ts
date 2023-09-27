import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AppMessages } from 'src/app/constants/app-messages';
import { WordSet } from 'src/app/models/word-set';
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
    private overlayService: OverlayService,
  ){}

  ngOnInit(): void {
    this.wordFormGroup.push(this.wordService.addWordForm());
  }

  //* 5 boxes at maximum
  public addCreateBox(): void{
    this.wordFormGroup.push(this.wordService.addWordForm());
  }

  public async setToCreateWord(){
    const dialogRef = this.dialogService.openYesOrNoDialog(AppMessages.WORD_PROCEED_CREATE, true);
    let dialogResult = await lastValueFrom(dialogRef.afterClosed());
    if(!dialogResult) return;
    
    this.wordFormGroup.forEach(wordBox => {
      this.wordSetToCreate.push(wordBox.value);
    });
    // this.overlayService.createOverlay();
    console.log(this.wordSetToCreate);
    // this.wordService.createWordList(this.wordSetList).subscribe({
    //   next: (res: Response) => {

    //   },
    //   complete: () => { 

    //   }
    // });
  }

  public async resetWordList(): Promise<void>{
    const dialogRef = this.dialogService.openYesOrNoDialog(AppMessages.WORD_RESET_BOX, true);
    let dialogResult = await lastValueFrom(dialogRef.afterClosed());
    if(!dialogResult) return;

    this.wordFormGroup = [];
    this.wordFormGroup.push(this.wordService.addWordForm());
  }
}
