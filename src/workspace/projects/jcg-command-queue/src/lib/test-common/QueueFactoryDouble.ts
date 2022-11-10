import {QueueFactory} from "../Queue/QueueFactory";
import {Queue} from "../Queue/Queue";
import {QueueDouble} from "./Queue-Double";

export class QueueFactoryDouble
  extends QueueFactory
{
  override create(): Queue {
    this.timesCreateWasCalled ++;
    return this.returns;
  }

  timesCreateWasCalled = 0;

  returns = new QueueDouble();
}
