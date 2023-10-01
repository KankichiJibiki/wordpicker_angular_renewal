import { WordSetService } from 'src/app/services/word-set/word-set.service';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-word-box',
  templateUrl: './create-word-box.component.html',
  styleUrls: ['./create-word-box.component.css']
})
export class CreateWordBoxComponent{
  @Input() wordSet!: FormGroup;

  constructor(public wordService: WordSetService){}
}

