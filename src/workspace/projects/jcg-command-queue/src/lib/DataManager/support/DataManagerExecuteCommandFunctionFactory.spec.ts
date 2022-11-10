import {UpdateViewModelFunctionFactoryMock} from "../../../../test-common/update-view-model-factory-mock";
import {DataServiceMock} from "../../../../test-common/data-service-mock";
import {DataManagerExecuteCommandFunctionFactory} from "./DataManagerExecuteCommandFunctionFactory";
import {ViewModelImp} from "../../../../test-common/ViewModelImp";

describe("DataManagerExecuteCommandFunctionFactory",()=>{
  let vmUpdateFactory : UpdateViewModelFunctionFactoryMock;
  let dataService : DataServiceMock;
  let sut : DataManagerExecuteCommandFunctionFactory<ViewModelImp>;
  beforeEach(()=>{
    vmUpdateFactory = new UpdateViewModelFunctionFactoryMock();
    dataService = new DataServiceMock();
    sut = new DataManagerExecuteCommandFunctionFactory<ViewModelImp>(
      vmUpdateFactory.object,
      dataService.object
    );
  });
  // TODO: HERE!
});
