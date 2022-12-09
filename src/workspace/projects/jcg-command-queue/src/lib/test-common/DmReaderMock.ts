import {ViewModelImp} from "./ViewModelImp";
import {IDmReader} from "../DataManager/support/IDmReader";
import {Mock} from "moq.ts";
import {Observable, Subject} from "rxjs";

export class DmReaderMock
{
  constructor() {
    this.moq = new Mock<IDmReader>();
    this.moq.setup(s=>s.readViewModel()).returns(new Observable<void>());
    this.moq.setup(s=>s.viewModel).returns(new ViewModelImp());
    this.moq.setup(s=>s.onViewModelChanged).returns(new Subject<void>());
    this.moq.setup(s=>s.onViewModelReadFromServer).returns(new Subject<void>());
  }
  private moq : Mock<IDmReader>;

  get object():IDmReader
  {
    return this.moq.object();
  }

}
