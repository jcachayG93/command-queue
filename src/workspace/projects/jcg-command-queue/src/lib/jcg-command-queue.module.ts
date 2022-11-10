import { NgModule } from '@angular/core';
import {CommandQueueDataManagerFactory} from "./api/CommandQueueDataManagerFactory";



@NgModule({
  declarations: [
  ],
  imports: [
  ],
  providers:[
    {provide: CommandQueueDataManagerFactory}
  ]
})
export class JcgCommandQueueModule { }
