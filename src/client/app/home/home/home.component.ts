import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { HomeService } from '../home.service';
import { environment } from '../../../environments/environment';
import { TutorialType } from '../../../../server/view-models/tutorial/tutorial-type.enum';
import { ActivatedRoute } from '@angular/router';
import { CampaignViewModel } from '../../../../server/view-models/campaign/campaign.view-model';
import * as marked from 'marked';
import { CampaignModel } from '../../../../server/models/campaign/campaign.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isProcessing = true;
  tutorialTypeEnum = TutorialType;
  campaigns: CampaignViewModel[];

  constructor(private route: ActivatedRoute,
    private homeService: HomeService) { }

  ngOnInit() {
    this.getCampaigns();
  }

  getCampaigns() {
    this.homeService.getCampaigns().subscribe(data => {
      this.campaigns = data.map(x => new CampaignViewModel(x.campaign, x.owner, x.milestones, x.products));
      this.isProcessing = false;
    });
  }
}
