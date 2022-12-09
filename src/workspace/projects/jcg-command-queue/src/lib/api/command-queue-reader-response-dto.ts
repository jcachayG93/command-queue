import {CommandQueueViewModel} from "./command-queue-view-model";
import {ConcurrencyToken} from "./concurrency-token";

/**
 * Wraps the read response that contains the ViewModel and the
 * concurrencyToken
 */
export class CommandQueueReaderResponseDto {


  constructor(viewModel: CommandQueueViewModel, token: ConcurrencyToken) {
    this.viewModel = viewModel;
    this.token = token;
  }

  viewModel: CommandQueueViewModel;
  token: ConcurrencyToken;
}
