import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {JcgCommandQueueModule} from "../../../jcg-command-queue/src/lib/jcg-command-queue.module";


import { PetsGridComponent } from './pets-grid/pets-grid.component';
import {FormsModule} from "@angular/forms";
import {CommandQueueDataService} from "../../../jcg-command-queue/src/lib/api/command-queue-data.service";
import {PetsDataService} from "./data-manager/pets-data.service";
import {CommandQueueViewModelReader} from "../../../jcg-command-queue/src/lib/api/command-queue-view-model-reader.service";

import { DeveloperPanelComponent } from './developer-panel/developer-panel.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ConcurrencyVersionMismatchDialogComponent } from './services/concurrency-version-mismatch-dialog.component';
import {DataManagerProvider} from "./data-manager/DataManagerProvider";
import {ServerDataService} from "./server-data.service";

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
    {provide: ServerDataService},
    DataManagerProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
