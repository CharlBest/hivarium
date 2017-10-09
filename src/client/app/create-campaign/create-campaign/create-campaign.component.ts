import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { CreateCampaignService } from '../create-campaign.service';
import { CreateUserViewModel } from '../../../../server/view-models/create-user/create-user.view-model';
import { LoginViewModel } from '../../../../server/view-models/create-user/login.view-model';
import { LoginService } from '../../login/login.service';
import { Validators } from '../../../../server/validation/validators';
import { FormService } from '../../shared/form.service';
import { TutorialType } from '../../../../server/view-models/tutorial/tutorial-type.enum';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {

  form: FormGroup;
  serverErrors;
  isProcessing = false;

  constructor(private fb: FormBuilder,
    private createUserService: CreateCampaignService,
    private router: Router,
    private authService: AuthService,
    private formService: FormService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  onSubmit() {
    this.isProcessing = true;

    const viewModel = new CreateUserViewModel();
    viewModel.email = this.form.get('email').value;
    viewModel.username = this.form.get('username').value;
    viewModel.password = this.form.get('password').value;

    this.createUserService.createCampaign(viewModel).subscribe(
      data => {
      }, error => {
        this.isProcessing = false;
        this.serverErrors = this.formService.getServerErrors(error);
      });
  }
}
