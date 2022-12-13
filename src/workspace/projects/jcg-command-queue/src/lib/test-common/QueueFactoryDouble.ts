import {QueueFactory} from "../Queue/QueueFactory";
import {Queue} from "../Queue/Queue";
import {QueueDouble} from "./Queue-Double";

/**
   * @deprecated The method should not be used
   * // TODO: Remove deprecated code
   */
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
