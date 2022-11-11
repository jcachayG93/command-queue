import { Component, OnInit } from '@angular/core';
import {PetsDataService} from "../data-manager/pets-data-service";

@Component({
  selector: 'app-spy-server-model-version',
  templateUrl: './spy-server-model-version.component.html',
  styleUrls: ['./spy-server-model-version.component.scss']
})
export class SpyServerModelVersionComponent implements OnInit {

  constructor(private dataService : PetsDataService) { }

  ngOnInit(): void {
  }

  get modelVersion():number
  {
    return this.dataService.modelVersion;
  }

}
