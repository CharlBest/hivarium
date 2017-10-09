import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../../shared/form.service';
import { ForgotPasswordService } from '../forgot-password.service';
import { ForgotPasswordViewModel } from '../../../../server/view-models/forgot-password/forgot-password.view-model';
import { Validators } from '../../../../server/validation/validators';
import { TutorialType } from '../../../../server/view-models/tutorial/tutorial-type.enum';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  serverErrors;
  isProcessing = false;
  emailSent = false;
  tutorialTypeEnum = TutorialType;

  constructor(private fb: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private route: ActivatedRoute,
    private router: Router,
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
      ]]
    });
  }

  onSubmit() {
    this.isProcessing = true;

    const viewModel = new ForgotPasswordViewModel();
    viewModel.email = this.form.get('email').value;

    this.forgotPasswordService.forgotPassword(viewModel).subscribe(
      data => {
        this.isProcessing = false;
        this.emailSent = true;
      }, error => {
        this.isProcessing = false;
        this.serverErrors = this.formService.getServerErrors(error);
      });
  }
}
