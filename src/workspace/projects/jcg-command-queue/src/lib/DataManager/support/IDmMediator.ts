/**
 * Mediates between parts that compose the DataManager
 */
import {CommandQueueViewModel} from "../../api/CommandQueueViewModel";

export interface IDmMediator
{
  /**
   * Tells the reader to read the view model from the server again.
   */
  read():void;

  /**
   * Tells the reader to set the model version.
   */
  setVersion(value:number):void;

  /**
   * Asks the DmReadRelated for the current Version Number
   */
  get version():number;

  /**
   * Gets the current view model from the DmReaderRelated
   */
  get viewModel() : CommandQueueViewModel | null;

  /**
   * commands the DmReaderRelated to emit onViewModelUpdated
   */
  emitViewModelUpdated():void;
}
