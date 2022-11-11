import { NgModule } from '@angular/core';
import { DeveloperPanelComponent } from './developer-panel/developer-panel.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {NgForOf} from "@angular/common";

@NgModule({
  declarations: [
    DeveloperPanelComponent
  ],
    imports: [
        MatCardModule,
        MatProgressBarModule,
        MatButtonModule,
        NgForOf
    ],
  exports: [
    DeveloperPanelComponent
  ]
})
export class JcgCommandQueueComponentsModule { }
