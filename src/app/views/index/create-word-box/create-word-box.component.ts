import { WordSetService } from 'src/app/services/word-set/word-set.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChatgptService } from 'src/app/services/chatgpt/chatgpt.service';

@Component({
  selector: 'app-create-word-box',
  templateUrl: './create-word-box.component.html',
  styleUrls: ['./create-word-box.component.css']
})
export class CreateWordBoxComponent{
  @Input() wordSet!: FormGroup;
  @Input() indexCount!: number;
  @Output() validityChanged = new EventEmitter<boolean>();
  @Output() removeIndex = new EventEmitter<number>();

  constructor(
    public wordService: WordSetService,
    private chatgptService: ChatgptService,
  ){}

  ngOnInit() {
    this.wordSet.valueChanges.subscribe(() => {
      console.log(this.wordSet);
      console.log(this.wordSet.valid);
      this.validityChanged.emit(this.wordSet.valid);
    })
  }

  public removeWordBox(): void{
    this.removeIndex.emit(this.indexCount);
  }

  public resetWordList(): void{
    this.wordSet.value.word = "";
    this.wordSet.value.meaning = "";
    this.wordSet.value.useCase = "";
    this.wordSet.value.synonymous = "";
    this.wordSet.value.typeId = null;
    this.wordSet.value.favorite_flg = 0;
  }

  public chatAboutMeaning(){
    let res = this.chatgptService.getMeaning(this.wordSet.value.word);
    console.log(res);
  }
}

