import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthModule } from './views/auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogModule } from './views/components/dialog/dialog.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { NavigationComponent } from './views/components/navigation/navigation.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { ProgressSpinnerComponent } from './views/components/progress-spinner/progress-spinner/progress-spinner.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexModule } from './views/index/index.module';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { ErrorInterceptor } from './services/error/error.interceptor';
import { DictionaryComponent } from './views/dictionary/dictionary.component';
import { DictionaryModule } from './views/dictionary/dictionary.module';

@NgModule({
  declarations: [
    AppComponent,
    ProgressSpinnerComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    IndexModule,
    DashboardModule,
    DialogModule,
    OverlayModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    DictionaryModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
