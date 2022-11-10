
import {QueueMock} from "./queue-mock";
import {QueueFactory} from "../src/lib/Queue/QueueFactory";
import {Queue} from "../src/lib/Queue/Queue";

export class QueueFactoryMock {
  constructor() {

    this.returnsFirstTime = new QueueMock();
    this.returnsSecondTime = new QueueMock();
    this.moq = new QueueFactoryDouble(
      this.returnsFirstTime, this.returnsSecondTime
    );
  }

  private moq: QueueFactoryDouble;

  get object(): QueueFactory {
    return this.moq;
  }

  createWasCalled():boolean {
    return this.moq.createWasCalled;
  }

  resetCreateWasCalled()
  {
    this.moq.createWasCalled = false;
  }

  returnsFirstTime: QueueMock;

  returnsSecondTime : QueueMock;
}

class QueueFactoryDouble extends QueueFactory
{
  constructor(private firstReturn : QueueMock,
              private secondReturn : QueueMock) {
    super();
  }
  private isFirstCall = true;

  createWasCalled = false;
  override create(): Queue {
    this.createWasCalled = true;
    if (this.isFirstCall)
    {
      return this.firstReturn.object;
      this.isFirstCall = false;
    } else
    {
      return this.secondReturn.object;
    }

  }
}
