import {Queue} from "./Queue";
import {Logger} from "../DataManager/support/Logger";

/**
   * @deprecated The method should not be used
   * // TODO: Remove deprecated code
   */
export class QueueFactory
{
  constructor(private logger : Logger) {
  }
   create():Queue
  {
    return new Queue(this.logger);
  }
}
