import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MediaTypeModule } from '../shared/media-type/media-type.module';
import { HomeService } from './home.service';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { TutorialModule } from '../shared/tutorial/tutorial.module';
import {
  MatInputModule,
  MatChipsModule,
  MatListModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MediaTypeModule,
    TutorialModule
  ],
  declarations: [
    HomeComponent,
    SearchBarComponent
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
