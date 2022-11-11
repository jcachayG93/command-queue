import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export abstract class CommandQueueDeveloperPanelService
{
  /**
   * Gets the number of commands in the queue from the data manager
   */
  abstract get commandsInQueue():number;

  /**
   * Increments the model version value for the data service (to simulate other user changing the data)
   */
  abstract incrementModelVersion():void;

  abstract get modelVersion():number;
}
