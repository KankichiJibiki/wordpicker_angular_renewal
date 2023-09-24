import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { YesOrNoDialogComponent } from './yes-or-no-dialog/yes-or-no-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    YesOrNoDialogComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
  ]
})
export class DialogModule { }
