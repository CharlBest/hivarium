import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { FormService } from '../../shared/form.service';
import { UserViewModel } from '../../../../server/view-models/user/user.view-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  serverErrors;
  isProcessing = true;
  userId: number = null;
  user: UserViewModel = null;

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id');

      this.getPublicUser();
    });
  }

  getPublicUser() {
    this.userService.getPublicUser(this.userId).subscribe(data => {
      this.user = data;
      this.isProcessing = false;
    }, error => {
      this.isProcessing = false;
      this.serverErrors = this.formService.getServerErrors(error);
    });
  }
}
