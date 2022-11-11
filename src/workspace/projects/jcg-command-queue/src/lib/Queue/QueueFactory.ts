import {Queue} from "./Queue";
import {Logger} from "../DataManager/support/Logger";

export class QueueFactory
{
  constructor(private logger : Logger) {
  }
  create():Queue
  {
    return new Queue(this.logger);
  }
}
