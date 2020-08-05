import { FactoryProvider, ModuleMetadata, Type } from '@nestjs/common';
import { SQS } from 'aws-sdk';

export interface SQSQueueOptions {
    name: string;
    options?: SQS.ClientConfiguration;
}

export interface SQSQueueOptionsFactory {
    createSQSQueueOptions(): Promise<SQSQueueOptions> | SQSQueueOptions;
}

export interface SQSQueueAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    name: string;
    useExisting?: Type<SQSQueueOptionsFactory>;
    useClass?: Type<SQSQueueOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<SQSQueueOptions> | SQSQueueOptions;
    inject?: FactoryProvider['inject'];
}
