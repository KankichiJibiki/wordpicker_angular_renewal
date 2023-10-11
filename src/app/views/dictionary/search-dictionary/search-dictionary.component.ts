import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WordSearch } from 'src/app/models/word-search';
import { AuthService } from 'src/app/services/auth/auth.service';
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
  public element_data: TableElements[] = [];
  public isFetching = false;

  constructor(
    public wordService: WordSetService,
    private authService: AuthService,
    private searchWordValidations: SearchWordValidations,
    private overlayService: OverlayService
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
        this.element_data = res.data;
      },
      complete: () => {
        this.isFetching = false;
      }
    });
  }
}

export interface TableElements {
  id: number,
  word: string,
  meaning: string,
  type_jp: string
}
