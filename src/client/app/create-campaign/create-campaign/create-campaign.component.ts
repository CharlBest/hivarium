import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { CreateCampaignService } from '../create-campaign.service';
import { CreateUserViewModel } from '../../../../server/view-models/create-user/create-user.view-model';
import { LoginViewModel } from '../../../../server/view-models/create-user/login.view-model';
import { LoginService } from '../../login/login.service';
import { Validators } from '../../../../server/validation/validators';
import { FormService } from '../../shared/form.service';
import { TutorialType } from '../../../../server/view-models/tutorial/tutorial-type.enum';
import { CreateCampaignViewModel } from '../../../../server/view-models/campaign/create-campaign.view-model';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  serverErrors;
  isProcessing = false;
  products: FormArray;
  milestones: FormArray;

  constructor(private fb: FormBuilder,
    private createCampaignService: CreateCampaignService,
    private router: Router,
    private formService: FormService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.firstFormGroup = this.fb.group({
      title: '',
      description: '',
      daysDuration: '',
      fullDescription: '',
      media: '',
      referralPercentage: ''
    });

    this.secondFormGroup = this.fb.group({
      milestones: this.buildMilestonesArray()
    });

    this.thirdFormGroup = this.fb.group({
      products: this.buildProductsArray()
    });
  }

  //#region Milestone

  buildMilestonesArray() {
    this.milestones = this.fb.array([
      this.buildMilestoneGroup()
    ]);
    return this.milestones;
  }

  buildMilestoneGroup(): FormGroup {
    return this.fb.group({
      unlockAtValueOfSales: null,
      percentageDiscount: ''
    });
  }

  addMilestone() {
    this.milestones.push(this.buildMilestoneGroup());
  }

  //#endregion

  //#region Product

  buildProductsArray() {
    this.products = this.fb.array([
      this.buildProductGroup()
    ]);
    return this.products;
  }

  buildProductGroup(): FormGroup {
    return this.fb.group({
      uId: null,
      title: '',
      description: '',
      cost: '',
      quantity: '',
      media: ''
    });
  }

  addProduct() {
    this.products.push(this.buildProductGroup());
  }

  //#endregion

  onSubmit() {
    this.isProcessing = true;

    const viewModel = new CreateCampaignViewModel();
    viewModel.title = this.firstFormGroup.get('title').value;
    viewModel.description = this.firstFormGroup.get('description').value;
    viewModel.daysDuration = this.firstFormGroup.get('daysDuration').value;
    viewModel.fullDescription = this.firstFormGroup.get('fullDescription').value;
    viewModel.media = this.firstFormGroup.get('media').value;
    viewModel.referralPercentage = this.firstFormGroup.get('referralPercentage').value;
    viewModel.milestones = this.secondFormGroup.get('milestones').value;
    viewModel.products = this.thirdFormGroup.get('products').value;

    this.createCampaignService.createCampaign(viewModel).subscribe(
      data => {
        this.router.navigate([`/campaign/${data.uId}`]);
      }, error => {
        this.isProcessing = false;
        this.serverErrors = this.formService.getServerErrors(error);
      });
  }
}
