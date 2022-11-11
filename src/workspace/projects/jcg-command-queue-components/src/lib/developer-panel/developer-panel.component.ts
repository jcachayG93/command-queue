import { Component, OnInit } from '@angular/core';
import {CommandQueueDeveloperPanelService} from "./api/command-queue-developer-panel.service";

@Component({
  selector: 'jcg-developer-panel',
  templateUrl: './developer-panel.component.html',
  styleUrls: ['./developer-panel.component.scss']
})
export class DeveloperPanelComponent implements OnInit {

  constructor(private panelService : CommandQueueDeveloperPanelService) { }

  ngOnInit(): void {
  }

  get commandsInQueue():number
  {
    return this.panelService.commandsInQueue;
  }
  get progressBarPercentage():number
  {
    if (this.commandsInQueue>20)
    {
      return 100;
    }
    return this.commandsInQueue/20*100;
  }

  incrementModelVersion():void
  {
    this.panelService.incrementModelVersion();
  }

  get modelVersion():number
  {
    return this.panelService.modelVersion;
  }

  get viewModelVersion():number
  {
    return this.panelService.viewModelVersion;
  }

  get developerLogs():string[]
  {
    return this.panelService.developerLogs;
  }

  resetLogs():void
  {
    this.panelService.resetLogs();
  }



}
