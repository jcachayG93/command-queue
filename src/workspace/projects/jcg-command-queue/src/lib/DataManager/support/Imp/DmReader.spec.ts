import {ViewModelReaderMock} from "../../../test-common/ViewModelReaderMock";
import {DmReader} from "./DmReader";
import {ViewModelImp} from "../../../test-common/ViewModelImp";

describe("DmReader",()=>{
  let reader : ViewModelReaderMock;
  let sut : DmReader<ViewModelImp>;
  beforeEach(()=>{
    reader = new ViewModelReaderMock();
    sut = new DmReader<ViewModelImp>(reader.object);
  });
  it('readViewModel delegates to reader, sets viewModel, emits onViewModelUpdated',
    () => {
      // ********* ARRANGE ***********
      let emitted = false;
      sut.onViewModelUpdated
        .subscribe({next:()=>emitted = true});
      // ********* ACT ***************
      sut.readViewModel().subscribe();
      // ********* ASSERT ************
      reader.verifyRead();
      expect(sut.viewModel).toBe(reader.readReturns);
      expect(emitted).toBeTrue();
    });
});
