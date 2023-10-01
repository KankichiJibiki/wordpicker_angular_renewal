import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { DialogService } from '../dialog/dialog.service';
import { SpinnerService } from '../spinner/spinner.service';
import { OverlayService } from '../overlay/overlay.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(
    private dialogService: DialogService,
    private spinnerService: SpinnerService,
    private overlayService: OverlayService
  ){}

  async handle(error: any): Promise<void> {
    if(this.spinnerService.isLoading){
      this.spinnerService.stop();
      this.overlayService.disposeOverlay();
    }
    const dialogRef = this.dialogService.openErrDialog(error.error.message);
    await lastValueFrom(dialogRef.afterClosed());
  }
}
