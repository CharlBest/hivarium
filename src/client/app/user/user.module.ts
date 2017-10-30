import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserRoutingModule } from '../user/user-routing.module';
import { UserService } from './user.service';
import { TutorialModule } from '../shared/tutorial/tutorial.module';
import { MediaModule } from '../shared/media/media.module';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTabsModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MediaModule,
    MatTabsModule
  ],
  declarations: [
    UserComponent
  ],
  providers: [UserService]
})
export class UserModule { }
