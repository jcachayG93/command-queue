import {CommandQueueViewModel} from "../../../../jcg-command-queue/src/lib/api/CommandQueueViewModel";

export class PetsViewModel extends CommandQueueViewModel
{
  petNames : string[] = [];
  override version: number = 0;
}


