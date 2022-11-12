/*
 * Public API Surface of jcg-command-queue
 */


export * from './lib/jcg-command-queue.module';
export * from './lib/api/errors/concurrency-version-mismatch-error';
export * from './lib/api/errors/view-model-not-read-error';
export * from './lib/api/command-queue-data-manager.service';
export * from './lib/api/commandQueueDataManagerProvider';
export * from './lib/api/CommandQueueCommand';
export * from './lib/api/command-queue-data.service';
export * from './lib/api/IUpdateViewModelFunction';
export * from './lib/api/update-viewModel-function-factory.service';
export * from './lib/api/CommandQueueViewModel';
export * from './lib/api/CommandQueueViewModelReader';
