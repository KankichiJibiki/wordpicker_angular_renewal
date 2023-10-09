import { Component } from '@angular/core';
import { MainFeature } from 'src/app/interfaces/main-feature';
import { Features } from 'src/app/models/features';
import { WordSetService } from 'src/app/services/word-set/word-set.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  features: MainFeature[] = new Features().features;

  constructor(private wordService: WordSetService){}

  ngOnInit(): void {
    this.wordService.getWordTypes();
  }
}
