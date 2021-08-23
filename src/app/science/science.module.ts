import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SciencePageRoutingModule } from './science-routing.module';

import { SciencePage } from './science.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SciencePageRoutingModule
  ],
  declarations: [SciencePage]
})
export class SciencePageModule {}
