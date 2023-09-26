import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
export class CreateWordBoxComponent implements OnInit{
  @Input() wordSet!: FormGroup;

  constructor(
    private wService: WordSetService,
    private aService: AuthService,
    private dialogService: DialogService,
    public spinnerService: SpinnerService,
    private overlayService: OverlayService,
    private createWordValidations: CreateWordValidatoins
  ){}

  ngOnInit(): void {

  }

}

