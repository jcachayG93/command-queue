/**
 * Provides data to the developer panel, implement only the methods you need.
 * Most of these items can be obtained from the CommandQueueDataManager, except the
 * ones related to operations on the server side.
 */
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export abstract class DeveloperPanelService
{
  /**
   * The number of commands in the queue
   */
  abstract get commandsInQueue():number;

  /**
   * The version stored locally
   */
  abstract get localVersion():number;

  /**
   * The version of the ViewModel as it was when it was loaded the last time
   */
  abstract get localViewModelVersion():number;

  /**
   * Increments the version number in the server to simulate an optimistic concurrency
   * version mismatch (other user made a change, the data is no longer up to date)
   */
  abstract forceIncrementServerModelVersion();

  /**
   * The model version at the server
   */
  abstract get serverModelVersion():number;

  /**
   * Prints the logs to the console
   */
  abstract outputLogs():void;

  /**
   * Clears the logs (not on the console but in memory, so the next time you
   * output the logs the ones before calling this method will not be included)
   */
  abstract clearLogs():void;

  /**
   * Logs the current local version of the ViewModel
   */
  abstract logViewModel():void;
}
