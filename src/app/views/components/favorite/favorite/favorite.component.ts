import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToggleFavorite } from 'src/app/interfaces/toggleFavorites';
import { UserList } from 'src/app/model/user-list';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FavoriteService } from 'src/app/service/favorite/favorite.service';
import { Subject, concatMap } from 'rxjs';
import { Signin } from 'src/app/model/signin';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  favList?: ToggleFavorite;
  username?: string | null = "";
  userParams = new UserList();
  user: Signin[] | any = [];
  private subject = new Subject<ToggleFavorite>();

  constructor(
    public fService: FavoriteService,
    public aService: AuthService,
  ){
    let username = localStorage.getItem('userName');
    let token = localStorage.getItem('authToken');
    if(username != null && token != null){
      this.userParams.username = username;
      this.userParams.token = token;
    }

    //* Favs observable
    this.subject
      .pipe(
        concatMap(favs => {
          return this.fService.toggleFav(favs);
        }),
      ).subscribe(val => {
        console.log("Requested" + val);
        this.getUser();
      })
  }
  
  userId?: string | null;
  @Input() isFav?: boolean;
  @Input() id?: number;
  @Input() wordId?: number;
  @Output() wordEmitter: EventEmitter<boolean> = new EventEmitter();

  public good(event: any)
  {
    if(!this.fService.isClickable) return;

    this._setFavoriteList();
    console.log(this.favList);
    this.isFav = !this.isFav;
    
    if(this.favList == null) return;
    this.subject.next(this.favList);
  }

  public getUser() {
    this.aService.getUser(this.userParams).subscribe({
      next: (res: Response | any) => {
        this.user = res.data;
        this.fService.createFavList(this.user.favorites);
        this._getWordsList(true);
      },
      complete: () => {}
    });
  }

  private _getWordsList(async: boolean)
  {
    this.wordEmitter.emit(async);
  }

  private _setFavoriteList()
  {
    this.userId = localStorage.getItem("userId");
    if(
      this.wordId != undefined && 
      this.isFav != undefined && 
      this.userId != undefined
    )
    {
      this.favList = {
        id : null,
        userId : +this.userId,
        wordId : this.wordId,
        isFav : this.isFav,
      }
    }
    if(this.id != undefined)
      this.favList!.id = this.id;
  }
}
