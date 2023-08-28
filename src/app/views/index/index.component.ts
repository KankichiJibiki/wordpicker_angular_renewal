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
import { CreateValidatoins } from 'src/app/validations/create-validatoin';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  words: WordSet[] = [];
  user: Signin[] | any = [];
  editWordSet = new WordSet();
  inputWordSet = new WordSet();
  userParams = new UserList();
  wordTypes: WordType[] = [];
  isEditMode: boolean = false;
  isTypeReady: boolean = false;
  editId?: number;
  wordForm: any;
  userId?: string | null;
  username?: string | null = "";

// table
  // displayColumns: string[] = ['id', 'voca', 'definition', 'created_date', 'updated_date', 'typeId', 'edit', 'delete'];
  displayColumns: string[] = ['id', 'voca', 'definition', 'typeId', 'edit', 'delete'];
  public pageSlice = this.words.slice(0, 11);

  constructor(
    private wService: WordSetService,
    private aService: AuthService,
    private dialogService: DialogService,
    public spinnerService: SpinnerService,
    private overlayService: OverlayService,
    private createWordV : CreateValidatoins,
  ){
    this.wordForm = this.createWordV.createWordForm;
  }


  ngOnInit(): void{
    this.getWordsList();
    this.getWordTypes();
    this.userId = localStorage.getItem('userId');
    this.username = localStorage.getItem('userName');
    this.username = localStorage.getItem('authToken');
    if(this.userId != null) this.inputWordSet.userId = +this.userId;
    this.getUser();
  }

  public getUser() {
    this.aService.getUser()
    .then(() => {

    }).catch((err) => {

    })
  }

  getWordsList(async: boolean = false){
    if(!async && !this.spinnerService.isLoading){
      this.spinnerService.start();
      this.overlayService.createOverlay();
    }
    this.userId = localStorage.getItem('userId');

    this.wService.getWordsList().subscribe({
      next: (res: Response | any) => {
        this.words = res.data;
        // Not pageSlice if this method being call by Fav
        if(!async)
          this.pageSlice = this.words.slice(0, 5);
      },
      complete: () => {
        this.spinnerService.stop();
        this.overlayService.disposeOverlay();
      }
    })
  }

  getWordTypes(){
    this.wService.getTypes().subscribe({
      next: (res: Response | any) => {
        this.wordTypes = res.data;
        this.isTypeReady = true;
      },
    })
  }

  
  createWords(){
    this.spinnerService.start();
    this.overlayService.createOverlay();

    this.wService.createWord(this.inputWordSet).subscribe({
      next: (res: Response | any) => {
        console.log(res.message);
        this.getWordsList();
        this._clearInput();
      },
      complete: () => {
        this.spinnerService.stop();
        this.overlayService.disposeOverlay();
        let msg = "Your word was successfully registered";
        this.dialogService.openYesOrNoDialog(msg, false);
      }
    });
  }

  editWord(i: number, edittedWord: WordSet){
    this.isEditMode = true;
    this.editId = i;
    this.editWordSet.id = edittedWord.id;
    this.editWordSet.voca = edittedWord.voca;
    this.editWordSet.definition = edittedWord.definition;
    this.editWordSet.typeId = edittedWord.typeId;
    let userId = localStorage.getItem('userId');
    if(userId != null) this.editWordSet.userId = +userId;
  };

  updateWord(){
    console.log(this.editWordSet);
    this.wService.updateWord(this.editWordSet).subscribe(
      (res : Response | any) => {
        console.log(res.message);
        this.getWordsList();
        this.isEditMode = false;
      },
    );
  }

  disableEditMode(){
    this.isEditMode = false;
  }

  delete(word: WordSet){
    this.wService.deleteWordSet(word).subscribe({
      next: (res: Response | any) => {
        console.log(res.message);
        this.getWordsList();
        this.pageSlice = this.words.slice(0, 5);
      },
      complete: () => {
        this.spinnerService.stop();
      }
    })
  }

  async deleteWord(word: WordSet): Promise<void>{
    console.log(word);
    let msg = 'Are you sure to delete this word?';
    const dialogRef =  this.dialogService.openYesOrNoDialog(msg, true);

    let res: DialogResult | undefined = await lastValueFrom(dialogRef.afterClosed());

    console.log(res);
    if(res == DialogResult.No) return;

    this.spinnerService.start();

    let resDelete = this.delete(word);
  }

  pickup(){
    let userId = localStorage.getItem('userId');
    if(userId == null) return;
    
    this.spinnerService.start();
    this.overlayService.createOverlay();
    this.wService.slotWord(+userId).subscribe({
      next: (res: Response | any) => {
        console.log(res);
        this.dialogService.openSlotDialog(res.data);
      },
      complete: () => {
        this.spinnerService.stop();
        this.overlayService.disposeOverlay();
      }
    })
  }

  OnPageChange(event: PageEvent){
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.words.length) endIndex = this.words.length;

    this.pageSlice = this.words.slice(startIndex, endIndex);
  }

  private _clearInput(){
    this.inputWordSet.voca = '';
    this.inputWordSet.definition = '';
    this.inputWordSet.typeId = {} as number;
  }
}
