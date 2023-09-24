import { Component, Input } from '@angular/core';
import { WordSet } from 'src/app/models/word-set';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { OverlayService } from 'src/app/services/overlay/overlay.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { WordSetService } from 'src/app/services/word-set/word-set.service';
import { CreateWordValidatoins } from 'src/app/validations/create-word-validatoin';

@Component({
  selector: 'app-create-word-box',
  templateUrl: './create-word-box.component.html',
  styleUrls: ['./create-word-box.component.css']
})
export class CreateWordBoxComponent {
  wordSet = new WordSet();
  create_word_validations: any;

  constructor(
    private wService: WordSetService,
    private aService: AuthService,
    private dialogService: DialogService,
    public spinnerService: SpinnerService,
    private overlayService: OverlayService,
    private createWordValidations: CreateWordValidatoins
  ){
    this.create_word_validations = this.createWordValidations.createWordForm;
  }

}
