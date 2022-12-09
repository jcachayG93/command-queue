/**
 * Mediates between parts that compose the DataManager
 */
import {CommandQueueViewModel} from "../../api/command-queue-view-model";
import {ConcurrencyToken} from "jcg-command-queue";

export interface IDmMediator
{
  /**
   * Tells the reader to read the view model from the server again.
   */
  read():void;

  /**
   * TODO: Remove deprecated code
   * @deprecated The method should not be used
   */
  setVersion(value:number):void;

  /**
   * TODO: Remove deprecated code
   * @deprecated The method should not be used
   */
  get version():number;

  /**
   * Sets the DmReader current token
   * @param token
   */
  setCurrentToken(token:ConcurrencyToken):void;

  /**
   * Gets the DmReader current token
   */
  get currentToken():ConcurrencyToken | null;

  /**
   * Gets the current view model from the DmReaderRelated
   */
  get viewModel() : CommandQueueViewModel | null;

  /**
   * commands the DmReaderRelated to emit onViewModelUpdated
   */
  emitViewModelUpdated():void;
}
