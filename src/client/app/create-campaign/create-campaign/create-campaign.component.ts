import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { CreateCampaignService } from '../create-campaign.service';
import { CreateUserViewModel } from '../../../../server/view-models/create-user/create-user.view-model';
import { LoginViewModel } from '../../../../server/view-models/create-user/login.view-model';
import { LoginService } from '../../login/login.service';
import { Validators } from '../../../../server/validation/validators';
import { FormService } from '../../shared/form.service';
import { TutorialType } from '../../../../server/view-models/tutorial/tutorial-type.enum';
import { CreateCampaignViewModel } from '../../../../server/view-models/campaign/create-campaign.view-model';
import { MilestoneModel } from '../../../../server/models/campaign/milestone.model';
import { ProductModel } from '../../../../server/models/campaign/product.model';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {

  loggedInUserId: number = this.authService.getloggedInUserId();

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  serverErrors;
  isProcessing = false;
  products: FormArray;
  milestones: FormArray;

  constructor(private fb: FormBuilder,
    private createCampaignService: CreateCampaignService,
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private authService: AuthService) {
  }

  ngOnInit() {
    const formData = this.route.snapshot.queryParams.data || null;
    if (formData !== null) {
      const data = JSON.parse(this.b64DecodeUnicode(formData));

      // data.milestones = Object.assign(new Array<MilestoneModel>(), data.milestones.milestones);
      // data.products = Object.assign(new Array<ProductModel>(), data.products.products);

      this.firstFormGroup = this.fb.group(data.details);

      this.secondFormGroup = this.fb.group({
        milestones: this.buildMilestonesArray(data.milestones.milestones)
      });

      this.thirdFormGroup = this.fb.group({
        products: this.buildProductsArray(data.products.products)
      });
    } else {
      this.buildForm();
    }
  }

  b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      (match, p1) => {
        return String.fromCharCode((<any>('0x' + p1)));
      }));
  }

  b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  save() {
    const data: CreateCampaignFormData = {
      details: this.firstFormGroup.value,
      milestones: this.secondFormGroup.value,
      products: this.thirdFormGroup.value,
    };

    const encodedData = this.b64EncodeUnicode(JSON.stringify(data));
    this.router.navigate([], { queryParams: { data: encodedData } });
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

  buildMilestonesArray(milestones: MilestoneModel[] = null): FormArray {
    const groupArray = new Array<any>();

    if (milestones !== null && milestones !== undefined) {
      for (const milestone of milestones) {
        groupArray.push(this.buildMilestoneGroup(milestone.unlockAtValueOfSales, milestone.percentageDiscount));
      }
    } else {
      groupArray.push(this.buildMilestoneGroup());
    }

    return this.milestones = this.fb.array(groupArray);
  }

  buildMilestoneGroup(unlockAtValueOfSales = null, percentageDiscount = null): FormGroup {
    return this.fb.group({
      unlockAtValueOfSales,
      percentageDiscount
    });
  }

  addMilestone(): void {
    this.milestones.push(this.buildMilestoneGroup());
  }

  //#endregion

  //#region Product

  buildProductsArray(products: ProductModel[] = null): FormArray {
    const groupArray = new Array<any>();

    if (products !== null && products !== undefined) {
      for (const product of products) {
        groupArray.push(this.buildProductGroup(product.uId, product.title, product.description, product.cost, product.quantity, product.media));
      }
    } else {
      groupArray.push(this.buildProductGroup());
    }

    return this.products = this.fb.array(groupArray);
  }

  buildProductGroup(uId = null, title = null, description = null, cost = null, quantity = null, media = null): FormGroup {
    return this.fb.group({
      uId,
      title,
      description,
      cost,
      quantity,
      media
    });
  }

  addProduct(): void {
    this.products.push(this.buildProductGroup());
  }

  //#endregion

  onSubmit(): void {
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

class CreateCampaignFormData {
  details: any;
  milestones: [MilestoneModel[]];
  products: ProductModel[];
}
