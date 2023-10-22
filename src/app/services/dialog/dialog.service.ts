import { DialogResult, YesOrNoDialogComponent } from './../../views/components/dialog/yes-or-no-dialog/yes-or-no-dialog.component';
import { ErrorDialogComponent } from './../../views/components/dialog/error-dialog/error-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { EditDictionaryComponent } from 'src/app/views/components/dialog/edit-dictionary/edit-dictionary.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  isOpen: boolean = false;

  constructor(
    private dialog: MatDialog,
  ) { }

  public openErrDialog(errMsg: string): MatDialogRef<ErrorDialogComponent, DialogResult> | any{
    this.isOpen = true;
    return this.dialog.open(ErrorDialogComponent, {
      data: errMsg ,
    });
  }

  public openYesOrNoDialog(msg: string, type: boolean)
    : MatDialogRef<YesOrNoDialogComponent, DialogResult>
  {
    return this.dialog.open(YesOrNoDialogComponent, {
      data: [msg, type],
    });
  }

  public openEditWordSet(id: number|undefined, wordSet: FormGroup): MatDialogRef<EditDictionaryComponent, DialogResult>{
    return this.dialog.open(EditDictionaryComponent, {
      data: {
        id: id,
        wordSet: wordSet
      }
    });
  }
}



