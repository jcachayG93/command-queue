import {ViewModel} from "../../../../jcg-command-queue/src/lib/api/ViewModel";

export class PetsViewModel extends ViewModel
{
  petNames : string[] = [];
  override version: number = 0;
}


