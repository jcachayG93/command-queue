import {CommandQueueUpdateViewModelFunctionFactoryService} from "../../../../jcg-command-queue/src/lib/api/command-queue-update-view-model-function-factory.service";
import {PetsViewModel} from "./pets-view-model";
import {CommandQueueCommand} from "../../../../jcg-command-queue/src/lib/api/command-queue-command";
import {IUpdateViewModelFunction} from "../../../../jcg-command-queue/src/lib/api/IUpdateViewModelFunction";
import {AddPetCommand} from "./add-pet-command";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class PetsUpdateViewModelFunctionFactory
  extends CommandQueueUpdateViewModelFunctionFactoryService
{
  create(cmd: CommandQueueCommand): IUpdateViewModelFunction {
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
