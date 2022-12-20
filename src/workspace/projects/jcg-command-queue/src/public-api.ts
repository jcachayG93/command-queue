/*
 * Public API Surface of jcg-command-queue
 */


export * from './lib/jcg-command-queue.module';
export * from './lib/api/errors/concurrency-version-mismatch-error';
export * from './lib/api/concurrency-token';
export * from './lib/api/errors/view-model-not-read-error';
export * from './lib/api/command-queue-data-manager.service';
export * from './lib/api/command-queue-command';
export * from './lib/api/command-queue-data.service';
export * from './lib/api/IUpdateViewModelFunction';
export * from './lib/api/command-queue-update-view-model-function-factory.service';
export * from './lib/api/command-queue-view-model';
export * from './lib/api/command-queue-view-model-reader.service';
export {CommandQueueReaderResponseDto} from "./lib/api/command-queue-reader-response-dto";
export * from './lib/DataManager/CommandQueueDataManagerV2';
export * from './lib/QueueV2/IQueue';
export * from './lib/QueueV2/QueueFactory';

