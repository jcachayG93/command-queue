import { Component, OnInit } from '@angular/core';
import {PetsDataManager} from "../data-manager/pets-data-manager";
import {PetsViewModel} from "../data-manager/pets-view-model";
import {AddPetCommand} from "../data-manager/add-pet-command";

@Component({
  selector: 'app-pets-grid',
  templateUrl: './pets-grid.component.html',
  styleUrls: ['./pets-grid.component.scss']
})
export class PetsGridComponent implements OnInit {

  constructor(private dm : PetsDataManager) { }

  ngOnInit(): void {
    this.dm.readViewModel().subscribe();
  }

  get viewModel():PetsViewModel | null
  {
    return this.dm.viewModel;
  }

  inputValue = "";

  addPet():void
  {
    if (this.inputValue != "")
    {
      const cmd = new AddPetCommand(this.inputValue);
      this.dm.executeCommand(cmd);
    }
  }

}
