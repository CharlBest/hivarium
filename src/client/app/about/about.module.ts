import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService } from './about.service';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';
import {
  MatButtonModule,
  MatCardModule,
  MatRadioModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule
  ],
  declarations: [
    AboutComponent
  ],
  providers: [
    AboutService
  ]
})
export class AboutModule { }
