import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WordSearch } from 'src/app/models/word-search';
import { AuthService } from 'src/app/services/auth/auth.service';
import { WordSetService } from 'src/app/services/word-set/word-set.service';
import { SearchWordValidations } from 'src/app/validations/search-word-validations';

@Component({
  selector: 'app-search-dictionary',
  templateUrl: './search-dictionary.component.html',
  styleUrls: ['./search-dictionary.component.css']
})
export class SearchDictionaryComponent {
  public wordSearchGroup!: FormGroup;
  public displayedColumns: string[] = ['id', 'word', 'meaning', 'type_jp'];
  public element_data: TableElements[] = [];

  constructor(
    public wordService: WordSetService,
    private authService: AuthService,
    private searchWordValidations: SearchWordValidations
  ){
    this.wordSearchGroup = searchWordValidations.getSearchWordInputs();
  }

  ngOnInit(): void {
    this.initialize();
  }

  private initialize(){
    const wordParams = new WordSearch();
    console.log(this.authService.usernameSubject.value);
    wordParams.username = this.authService.usernameSubject.value;
    this.wordService.getWordTypes();
    this.getWordList(wordParams);
  }

  public searchWordList(){
    
  }

  public getWordList(wordParams: WordSearch){
    this.wordService.getWordList(wordParams).subscribe({
      next: (res: any) => {
        this.wordService.wordListSubject.next(res.data);
        this.element_data = res.data;
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
