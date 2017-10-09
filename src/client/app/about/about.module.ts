import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule, MdRadioModule } from '@angular/material';
import { AboutService } from './about.service';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    MdButtonModule,
    MdCardModule,
    MdRadioModule
  ],
  declarations: [
    AboutComponent
  ],
  providers: [
    AboutService
  ]
})
export class AboutModule { }
