import {Queue} from "./Queue";

export class QueueFactory
{
  create():Queue
  {
    return new Queue();
  }
}
