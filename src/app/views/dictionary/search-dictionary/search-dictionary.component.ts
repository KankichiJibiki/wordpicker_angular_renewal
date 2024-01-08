import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { AppMessages } from 'src/app/constants/app-messages';
import { WordSearch } from 'src/app/models/word-search';
import { WordSet } from 'src/app/models/word-set';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { OverlayService } from 'src/app/services/overlay/overlay.service';
import { WordSetService } from 'src/app/services/word-set/word-set.service';
import { SearchWordValidations } from 'src/app/validations/search-word-validations';

@Component({
  selector: 'app-search-dictionary',
  templateUrl: './search-dictionary.component.html',
  styleUrls: ['./search-dictionary.component.css']
})
export class SearchDictionaryComponent {
  public wordSearchGroup!: FormGroup;
  public displayedColumns: string[] = ['id', 'word', 'meaning', 'type_jp', 'menu'];
  public isFetching = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  wordListDataSource!: MatTableDataSource<TableWordListsElement>;
  @Output() openDetailsNavEvent = new EventEmitter<WordSet>();

  constructor(
    public wordService: WordSetService,
    private authService: AuthService,
    searchWordValidations: SearchWordValidations,
    private overlayService: OverlayService,
    private dialogService: DialogService
  ){
    this.wordSearchGroup = searchWordValidations.getSearchWordInputs();
  }

  ngOnInit(): void {
    this.initialize();
  }

  public initialize(){
    const searchParams: WordSearch = this.wordSearchGroup.value;
    searchParams.username = this.authService.usernameSubject.value;
    this.isFetching = true;
    this.wordService.getWordTypes();
    this.getWordList(searchParams);
  }

  public searchWordList(){
    const searchParams: WordSearch = this.wordSearchGroup.value;
    searchParams.username = this.authService.usernameSubject.value;
    this.isFetching = true;
    this.getWordList(searchParams);
  }

  public getWordList(wordParams: WordSearch){
    this.wordService.getWordList(wordParams).subscribe({
      next: (res: any) => {
        this.wordService.wordListSubject.next(res.data);
        this.wordListDataSource = new MatTableDataSource<TableWordListsElement>(res.data);
        this.wordListDataSource.paginator = this.paginator;
      },
      complete: () => {
        this.isFetching = false;
      }
    });
  }

  public refresh(){
    this.resetWordSearch();
    this.initialize();
  }

  public resetWordSearch(){
    this.wordSearchGroup.value.word = "";
    this.wordSearchGroup.value.meaning = "";
    this.wordSearchGroup.value.typeId = null;
    this.wordSearchGroup.value.favoriteFlg = false;
  }

  public async removeWordSet(wordList: WordSet){
    const dialogRef = this.dialogService.openYesOrNoDialog(AppMessages.WORD_PROCEED_REMOVE, true);
    let dialogResult = await lastValueFrom(dialogRef.afterClosed());
    if(!dialogResult) return;

    this.isFetching = true;
    this.wordService.removeWordList(wordList).subscribe({
      next: async (res: any) => {
        const successDialogRef = this.dialogService.openYesOrNoDialog(AppMessages.WORD_REMOVE_SUCCESS, false);
        await lastValueFrom(successDialogRef.afterClosed());

        this.wordService.emitWordSetModified();
        this.initialize();
      }
    })
  }

  public async openEditWordSet(wordSet: WordSet){
    //* open edit dialog
    let wordSetForm = this.wordService.insertWordFormToEdit(wordSet);
    const dialogRef = this.dialogService.openEditWordSet(wordSet.id, wordSetForm);
    await lastValueFrom(dialogRef.afterClosed());
    this.refresh();
  }

  public toggleDetailsSidenav(wordSet: WordSet): void{
    console.log(wordSet)
    this.openDetailsNavEvent.emit(wordSet);
  }
}

export interface TableWordListsElement {
  id: number,
  word: string,
  meaning: string,
  type_jp: string
}
