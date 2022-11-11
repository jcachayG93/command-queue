import {UpdateViewModelFunctionFactory} from "../../../../jcg-command-queue/src/lib/api/UpdateViewModelFunctionFactory";
import {PetsViewModel} from "./pets-view-model";
import {DataManagerCommand} from "../../../../jcg-command-queue/src/lib/api/DataManagerCommand";
import {IUpdateViewModelFunction} from "../../../../jcg-command-queue/src/lib/api/IUpdateViewModelFunction";
import {AddPetCommand} from "./add-pet-command";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class PetsUpdateViewModelFunctionFactory
  extends UpdateViewModelFunctionFactory
{
  create(cmd: DataManagerCommand): IUpdateViewModelFunction {
    if (cmd instanceof AddPetCommand)
    {
      return this.handle_AddPet(cmd);
    }
    throw new Error('Unhandled command');
  }

  private handle_AddPet(cmd : AddPetCommand) : IUpdateViewModelFunction
  {
    return (vm)=>{
      const cast = vm as PetsViewModel;
      cast.petNames.push(cmd.name);
    }
  }

}
