import { WordSetService } from 'src/app/services/word-set/word-set.service';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChatgptService } from 'src/app/services/chatgpt/chatgpt.service';

@Component({
  selector: 'app-create-word-box',
  templateUrl: './create-word-box.component.html',
  styleUrls: ['./create-word-box.component.css']
})
export class CreateWordBoxComponent{
  @Input() wordSet!: FormGroup;

  constructor(
    public wordService: WordSetService,
    private chatgptService: ChatgptService
  ){}

  public chatAboutMeaning(){
    console.log(this.wordSet.value.word);
    let res = this.chatgptService.getMeaning(this.wordSet.value.word);
    console.log(res);
  }
}

