import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { HomeService } from '../home.service';
import { environment } from '../../../environments/environment';
import { TutorialType } from '../../../../server/view-models/tutorial/tutorial-type.enum';
import * as marked from 'marked';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isProcessing = false;
  tutorialTypeEnum = TutorialType;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
  }
}
