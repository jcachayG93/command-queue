import {CommandQueueViewModelReaderService} from "../api/command-queue-view-model-reader.service";
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
    s.readOLD()).returns(of(this.readReturns));
  }
  private moq : Mock<CommandQueueViewModelReaderService>;

  get object():CommandQueueViewModelReaderService
  {
    return this.moq.object();
  }

  verifyRead():void
  {
    this.moq.verify(s=>s.readOLD());
  }

  readReturns : ViewModelImp;

}
