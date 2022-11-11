import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {JcgCommandQueueModule} from "../../../jcg-command-queue/src/lib/jcg-command-queue.module";
import {PetsDataManager} from "./data-manager/pets-data-manager";
import {petsDataManagerServiceProvider} from "./data-manager/petsDataManagerServiceProvider";
import {
  CommandQueueDeveloperPanelService
} from "../../../jcg-command-queue-components/src/lib/developer-panel/api/command-queue-developer-panel.service";
import {PetsDataManagerPanelService} from "./data-manager/pets-data-manager-panel.service";
import {
  JcgCommandQueueComponentsModule
} from "../../../jcg-command-queue-components/src/lib/jcg-command-queue-components.module";
import { PetsGridComponent } from './pets-grid/pets-grid.component';
import {FormsModule} from "@angular/forms";
import { SpyServerModelVersionComponent } from './spy-server-model-version/spy-server-model-version.component';

@NgModule({
  declarations: [
    AppComponent,
    PetsGridComponent,
    SpyServerModelVersionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    JcgCommandQueueModule,
    JcgCommandQueueComponentsModule,
    FormsModule
  ],
  providers: [
    petsDataManagerServiceProvider,
    {provide:CommandQueueDeveloperPanelService, useClass:PetsDataManagerPanelService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
