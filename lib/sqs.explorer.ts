import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, ModuleRef, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { SQSQueue } from './sqs-queue';
import { SQS_CONSUMER_QUEUE_NAME, SQS_QUEUE_CONSUMER } from './sqs.constants';
import { getConsumerToken } from './utils/get-consumer-token.util';

@Injectable()
export class SQSExplorer implements OnModuleInit {

    constructor(
        private readonly moduleRef: ModuleRef,
        private readonly discoveryService: DiscoveryService,
        private readonly reflector: Reflector,
    ) { }

    onModuleInit(): void {
        this.explore();
    }

    explore(): void {
        const providers: InstanceWrapper[] = this.discoveryService
            .getProviders()
            .filter((wrapper: InstanceWrapper) => wrapper && wrapper.metatype && !!this.reflector.get(SQS_QUEUE_CONSUMER, wrapper.metatype));

        providers.forEach(provider => {
            const queueName = this.reflector.get(SQS_CONSUMER_QUEUE_NAME, provider.metatype);
            const queueToken = getConsumerToken(queueName);
            const queue = this.moduleRef.get<SQSQueue>(queueToken, { strict: false });

            queue.registerHandler(provider.instance);
        })
    }
}
