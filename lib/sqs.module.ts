import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { SQSQueueOptions } from './interfaces/sqs-queue-options.interface';
import { SQSExplorer } from './sqs.explorer';
import { createProviders } from './sqs.providers';

@Module({})
export class SQSModule {
    static register(options: SQSQueueOptions[]): DynamicModule {
        const providers: Provider[] = createProviders(options)
        return {
            module: SQSModule,
            imports: [SQSModule.forRoot()],
            providers,
            exports: providers
        }
    }

    private static forRoot() {
        return {
            global: true,
            module: SQSModule,
            imports: [DiscoveryModule],
            providers: [SQSExplorer],
        }
    }
}
