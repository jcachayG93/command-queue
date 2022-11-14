import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {JcgCommandQueueModule} from "../../../jcg-command-queue/src/lib/jcg-command-queue.module";


import { PetsGridComponent } from './pets-grid/pets-grid.component';
import {FormsModule} from "@angular/forms";
import {CommandQueueDataService} from "../../../jcg-command-queue/src/lib/api/command-queue-data.service";
import {PetsDataService} from "./data-manager/pets-data.service";
import {CommandQueueViewModelReaderService} from "../../../jcg-command-queue/src/lib/api/CommandQueueViewModelReaderService";
import {PetsReader} from "./data-manager/pets-reader";
import {CommandQueueUpdateViewModelFunctionFactoryService} from "../../../jcg-command-queue/src/lib/api/command-queue-update-view-model-function-factory.service";
import {PetsUpdateViewModelFunctionFactory} from "./data-manager/pets-update-view-model-function-factory";
import { DeveloperPanelComponent } from './developer-panel/developer-panel.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ConcurrencyVersionMismatchDialogComponent } from './services/concurrency-version-mismatch-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PetsGridComponent,
    DeveloperPanelComponent,
    ConcurrencyVersionMismatchDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    JcgCommandQueueModule,
    FormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    { provide: CommandQueueDataService, useClass: PetsDataService},
    { provide: CommandQueueViewModelReaderService, useClass: PetsReader},
    { provide: CommandQueueUpdateViewModelFunctionFactoryService, useClass: PetsUpdateViewModelFunctionFactory}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
