import { WordSetService } from 'src/app/services/word-set/word-set.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChatgptService } from 'src/app/services/chatgpt/chatgpt.service';
import { lastValueFrom } from 'rxjs';
import { AppMessages } from 'src/app/constants/app-messages';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-create-word-box',
  templateUrl: './create-word-box.component.html',
  styleUrls: ['./create-word-box.component.css']
})
export class CreateWordBoxComponent{
  @Input() wordSet!: FormGroup;
  @Output() validityChanged = new EventEmitter<boolean>();

  constructor(
    public wordService: WordSetService,
    private chatgptService: ChatgptService,
  ){}

  ngOnInit() {
    this.wordSet.valueChanges.subscribe(() => {
      this.validityChanged.emit(this.wordSet.valid);
    })
  }

  public confirmResetWordList(): void{
    console.log(this.wordSet);
  }

  public chatAboutMeaning(){
    console.log(this.wordSet.value.word);
    let res = this.chatgptService.getMeaning(this.wordSet.value.word);
    console.log(res);
  }
}

