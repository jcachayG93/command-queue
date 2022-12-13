import {QueueFactory} from "../QueueV2/QueueFactory";
import {Logger} from "../DataManager/support/Logger";
import {IExecuteCommandFunctionFactory} from "../DataManager/support/IExecuteCommandFunctionFactory";
import {Mock} from "moq.ts";
import {IQueue} from "../QueueV2/IQueue";
import {QueueMock} from "./QueueMock";

export class QueueFactoryDoubleV2
  extends QueueFactory
{
  constructor() {
    super(new Logger(),
      new Mock<IExecuteCommandFunctionFactory>().object());
    this.returns = new QueueMock();
  }

  override create(): IQueue {
    this.timesCreateWasCalled++;
    return this.returns
  }

  timesCreateWasCalled = 0;
  returns : QueueMock;
}
