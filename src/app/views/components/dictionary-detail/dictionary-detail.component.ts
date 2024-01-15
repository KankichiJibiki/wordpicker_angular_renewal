import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dictionary-detail',
  templateUrl: './dictionary-detail.component.html',
  styleUrls: ['./dictionary-detail.component.css']
})
export class DictionaryDetailComponent {
  @Input() wordSet!: any;

  constructor(private route: Router){}

  public routeToPronouce(id: number) {
    this.route.navigate(['pronounce'], { queryParams: {id: id} })
  }
}
