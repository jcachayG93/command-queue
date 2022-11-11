import {UpdateViewModelFunctionFactory} from "../../../../jcg-command-queue/src/lib/api/UpdateViewModelFunctionFactory";
import {PetsViewModel} from "./pets-view-model";
import {DataManagerCommand} from "../../../../jcg-command-queue/src/lib/api/DataManagerCommand";
import {IUpdateViewModelFunction} from "../../../../jcg-command-queue/src/lib/api/IUpdateViewModelFunction";
import {AddPetCommand} from "./add-pet-command";

export class PetsUpdateViewModelFunctionFactory
  extends UpdateViewModelFunctionFactory<PetsViewModel>
{
  create(cmd: DataManagerCommand): IUpdateViewModelFunction<PetsViewModel> {
    if (cmd instanceof AddPetCommand)
    {
      return this.handle_AddPet(cmd);
    }
    throw new Error('Unhandled command');
  }

  private handle_AddPet(cmd : AddPetCommand) : IUpdateViewModelFunction<PetsViewModel>
  {
    return (vm)=>{
      vm.petNames.push(cmd.name);
    }
  }

}
