import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { CreateUserService } from '../create-user.service';
import { CreateUserViewModel } from '../../../../server/view-models/create-user/create-user.view-model';
import { LoginViewModel } from '../../../../server/view-models/create-user/login.view-model';
import { LoginService } from '../../login/login.service';
import { Validators } from '../../../../server/validation/validators';
import { FormService } from '../../shared/form.service';
import { TutorialType } from '../../../../server/view-models/tutorial/tutorial-type.enum';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  form: FormGroup;
  serverErrors;
  isProcessing = false;
  returnUrl: string = null;

  constructor(private fb: FormBuilder,
    private createUserService: CreateUserService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private formService: FormService) {
  }

  ngOnInit() {
    this.buildForm();

    this.route.queryParamMap.subscribe(params => {
      if (params.has('returnUrl')) {
        this.returnUrl = params.get('returnUrl') || null;
      }
    });
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

    this.createUserService.createUser(viewModel).subscribe(
      data => {
        this.setUserToken();
      }, error => {
        this.isProcessing = false;
        this.serverErrors = this.formService.getServerErrors(error);
      });
  }

  setUserToken() {
    const model = new LoginViewModel();
    model.emailOrUsername = this.form.get('email').value;
    model.password = this.form.get('password').value;

    this.loginService.login(model).subscribe(
      data => {
        if (data !== null && data.token !== null) {
          this.authService.setToken(data.token, data.userId);

          if (this.returnUrl === null) {
            this.router.navigate(['/profile'], { queryParams: { tut: TutorialType.ProfileShare } });
          } else {
            this.router.navigateByUrl(this.returnUrl);
          }
        } else {
          // TODO: show material dialog (shared auth failed dialog)
          alert('Authentication failed');
        }
      }, error => {
        this.isProcessing = false;
        this.serverErrors = this.formService.getServerErrors(error);
      });
  }
}
