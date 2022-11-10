import { NgModule } from '@angular/core';
import { DeveloperPanelComponent } from './developer-panel/developer-panel.component';
import {JcgCommandQueueModule} from "jcg-command-queue";



@NgModule({
  declarations: [
    DeveloperPanelComponent
  ],
  imports: [
    JcgCommandQueueModule
  ],
  exports: [
  ]
})
export class JcgCommandQueueComponentsModule { }
