import {CommandQueueViewModelReaderService} from "../api/CommandQueueViewModelReaderService";
import {ViewModelImp} from "./ViewModelImp";
import {Mock} from "moq.ts";
import {of} from "rxjs";

export class ViewModelReaderMock
{
  constructor() {
    this.moq = new Mock<CommandQueueViewModelReaderService>();
    this.readReturns = new ViewModelImp();
    this.readReturns.version = 10;
    this.moq.setup(s=>
    s.read()).returns(of(this.readReturns));
  }
  private moq : Mock<CommandQueueViewModelReaderService>;

  get object():CommandQueueViewModelReaderService
  {
    return this.moq.object();
  }

  verifyRead():void
  {
    this.moq.verify(s=>s.read());
  }

  readReturns : ViewModelImp;

}
