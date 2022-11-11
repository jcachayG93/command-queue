import {ViewModelReaderMock} from "../../../test-common/ViewModelReaderMock";
import {DmReader} from "./DmReader";
import {Logger} from "../Logger";

describe("DmReader",()=>{
  let reader : ViewModelReaderMock;
  let sut : DmReader;
  beforeEach(()=>{
    reader = new ViewModelReaderMock();
    sut = new DmReader(reader.object, new Logger());
  });
  it('readViewModel delegates to reader, ' +
    'sets viewModel, emits onViewModelUpdated and ' +
    'sets version',
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
      expect(sut.version).toBe(reader.readReturns.version);
    });
  it('emitViewModelUpdated does that',
    () => {
      // ********* ARRANGE ***********
      let emitted = false;
      sut.onViewModelUpdated.subscribe(()=>
      emitted = true);
      // ********* ACT ***************
      sut.emitViewModelUpdated();
      // ********* ASSERT ************
      expect(emitted).toBeTrue();
    });
  it('read, readsViewModel, ' +
    'sets version with viewModel version value' +
    'emits view model updated',
    (done) => {
      // ********* ARRANGE ***********
      let emitted = false;
      sut.onViewModelUpdated.subscribe(()=>
        emitted = true);
      // ********* ACT ***************
      sut.read();
      // ********* ASSERT ************
      setTimeout(()=>{
        reader.verifyRead();
        expect(sut.version).toBe(reader.readReturns.version);
        expect(emitted).toBeTrue();
        done();
      },10);
    });
  it('setVersion does that',
    () => {
      // ********* ARRANGE ***********

      // ********* ACT ***************
      sut.setVersion(100);
      // ********* ASSERT ************
      expect(sut.version).toBe(100);
    });

});
