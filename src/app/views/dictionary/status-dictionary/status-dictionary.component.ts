import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WordCount } from 'src/app/interfaces/word-count';
import { AuthService } from 'src/app/services/auth/auth.service';
import { WordSetService } from 'src/app/services/word-set/word-set.service';

@Component({
  selector: 'app-status-dictionary',
  templateUrl: './status-dictionary.component.html',
  styleUrls: ['./status-dictionary.component.css']
})
export class StatusDictionaryComponent {
  public username = "";
  public isFetching = false;
  public wordCountList: BehaviorSubject<WordCount | undefined> = new BehaviorSubject<WordCount | undefined>(undefined);

  constructor(
    private authService: AuthService,
    private wordService: WordSetService,
  ){
    this.wordService.wordSetModified$.subscribe(() => {
      this.getWordCount();
    })
    this.username = authService.usernameSubject.value;
    this.getWordCount();
  }

  public getWordCount(){
    this.isFetching = true;
    const username = this.authService.usernameSubject.value;
    this.wordService.getCountByType(username).subscribe({
      next: (res: any) => {
        this.wordCountList.next(res.data);
      },
      complete: () => {
        this.isFetching = false;
      }
    })
  }
}
