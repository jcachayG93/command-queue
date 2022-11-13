import {CommandQueueViewModel} from "../../../../jcg-command-queue/src/lib/api/CommandQueueViewModel";

export class PetsViewModel implements CommandQueueViewModel
{
  petNames : string[] = [];
  version: number = 0;
}


