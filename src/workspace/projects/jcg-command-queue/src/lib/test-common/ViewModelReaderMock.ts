import {
  CommandQueueViewModelReader
} from "../api/command-queue-view-model-reader.service";
import {ViewModelImp} from "./ViewModelImp";
import {Mock} from "moq.ts";
import {of} from "rxjs";
import {ConcurrencyTokenImp} from "./ConcurrencyTokenImp";
import {visit} from "@angular/compiler-cli/src/ngtsc/util/src/visitor";
import {CommandQueueReaderResponseDto} from "../api/command-queue-reader-response-dto";

export class ViewModelReaderMock
{
  constructor() {
    this.moq = new Mock<CommandQueueViewModelReader>();
    let vm = new ViewModelImp();
    let token = new ConcurrencyTokenImp();
    this.readReturns = {
      token: token, viewModel: vm
    };


    this.moq.setup(s=>
    s.read()).returns(of(this.readReturns));
  }
  private moq : Mock<CommandQueueViewModelReader>;

  get object():CommandQueueViewModelReader
  {
    return this.moq.object();
  }

  verifyRead():void
  {
    this.moq.verify(s=>s.read());
  }

  readReturns : CommandQueueReaderResponseDto;


}
