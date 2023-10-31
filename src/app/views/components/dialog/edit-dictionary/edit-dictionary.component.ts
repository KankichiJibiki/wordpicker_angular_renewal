import { OverlayService } from './../../../../services/overlay/overlay.service';
import { SpinnerService } from './../../../../services/spinner/spinner.service';
import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogResult } from '../yes-or-no-dialog/yes-or-no-dialog.component';
import { WordSetService } from 'src/app/services/word-set/word-set.service';
import { lastValueFrom } from 'rxjs';
import { AppMessages } from 'src/app/constants/app-messages';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-edit-dictionary',
  templateUrl: './edit-dictionary.component.html',
  styleUrls: ['./edit-dictionary.component.css']
})
export class EditDictionaryComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDictionaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, wordSet: FormGroup },
    public wordService: WordSetService,
    private dialogService: DialogService,
    public spinnerService: SpinnerService,
    private overlayService: OverlayService
  ){}

  public closeDialog(): void{
    this.dialogRef.close(DialogResult.Yes)
  }

  public toggleFav(event: any){
    this.data.wordSet.value.favoriteFlg !== event;
  }

  public async modifyWordSet(){
    const dialogRef = this.dialogService.openYesOrNoDialog(AppMessages.WORD_PROCEED_CREATE, true);
    let dialogResult = await lastValueFrom(dialogRef.afterClosed());
    if(!dialogResult) return;

    this.overlayService.createOverlay();
    this.spinnerService.start();
    let wordSet = this.data.wordSet.value;
    wordSet.id = this.data.id;
    this.wordService.modifyWordList(this.data.wordSet.value).subscribe({
      next: async (res: any) => {
        const successDialogRef = this.dialogService.openYesOrNoDialog(AppMessages.WORD_MODIFY_SUCCESS, false);
        await lastValueFrom(successDialogRef.afterClosed());
      },
      complete: () => {
        this.wordService.emitWordSetModified();
        this.overlayService.disposeOverlay();
        this.spinnerService.stop();
        this.closeDialog();
      }
    })
  }
}
