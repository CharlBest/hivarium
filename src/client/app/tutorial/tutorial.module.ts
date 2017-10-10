import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialRoutingModule } from '../tutorial/tutorial-routing.module';
import { TutorialComponent } from '../tutorial/tutorial/tutorial.component';
import { TutorialService } from '../tutorial/tutorial.service';
import { FirstTimeUserComponent } from './first-time-user/first-time-user.component';
import { CreatePostComponent } from './create-post/create-post.component';
import {
  MatButtonModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TutorialRoutingModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [
    TutorialComponent,
    FirstTimeUserComponent,
    CreatePostComponent,
  ],
  providers: [
    TutorialService
  ]
})
export class TutorialModule { }
