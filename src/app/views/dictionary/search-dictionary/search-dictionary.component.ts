import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WordSetService } from 'src/app/services/word-set/word-set.service';
import { SearchWordValidations } from 'src/app/validations/search-word-validations';

@Component({
  selector: 'app-search-dictionary',
  templateUrl: './search-dictionary.component.html',
  styleUrls: ['./search-dictionary.component.css']
})
export class SearchDictionaryComponent {
  public wordSearchGroup!: FormGroup;

  constructor(
    public wordService: WordSetService,
    private searchWordValidations: SearchWordValidations
  ){
    this.wordSearchGroup = searchWordValidations.getSearchWordInputs();
  }

  ngOnInit(): void {
    this.wordService.getWordTypes();
  }


}
