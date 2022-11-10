
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
  getVersion():number;

}
