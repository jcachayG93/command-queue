/*
 * Public API Surface of jcg-command-queue
 */


export * from './lib/jcg-command-queue.module';
export * from './lib/api/errors/concurrency-version-mismatch-error';
export * from './lib/api/errors/view-model-not-read-error';
export * from './lib/api/command-queue-data-manager.service';
export * from './lib/api/commandQueueDataManagerProvider';
export * from './lib/api/DataManagerCommand';
export * from './lib/api/DataService';
export * from './lib/api/IUpdateViewModelFunction';
export * from './lib/api/UpdateViewModelFunctionFactory';
export * from './lib/api/ViewModel';
export * from './lib/api/ViewModelReader';
