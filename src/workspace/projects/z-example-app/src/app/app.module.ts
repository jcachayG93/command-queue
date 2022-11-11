import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {JcgCommandQueueModule} from "../../../jcg-command-queue/src/lib/jcg-command-queue.module";

import {
  JcgCommandQueueComponentsModule
} from "../../../jcg-command-queue-components/src/lib/jcg-command-queue-components.module";
import { PetsGridComponent } from './pets-grid/pets-grid.component';
import {FormsModule} from "@angular/forms";
import { SpyServerModelVersionComponent } from './spy-server-model-version/spy-server-model-version.component';
import {commandQueueDataManagerProvider} from "../../../jcg-command-queue/src/lib/api/commandQueueDataManagerProvider";
import {PetsDataManager} from "./data-manager/pets-data-manager";
import {DataService} from "../../../jcg-command-queue/src/lib/api/DataService";
import {PetsDataService} from "./data-manager/pets-data-service";
import {ViewModelReader} from "../../../jcg-command-queue/src/lib/api/ViewModelReader";
import {PetsReader} from "./data-manager/pets-reader";
import {UpdateViewModelFunctionFactory} from "../../../jcg-command-queue/src/lib/api/UpdateViewModelFunctionFactory";
import {PetsUpdateViewModelFunctionFactory} from "./data-manager/pets-update-view-model-function-factory";

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
    {provide: PetsDataManager},
    commandQueueDataManagerProvider,
    { provide: DataService, useClass: PetsDataService},
    { provide: ViewModelReader, useClass: PetsReader},
    { provide: UpdateViewModelFunctionFactory, useClass: PetsUpdateViewModelFunctionFactory}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
