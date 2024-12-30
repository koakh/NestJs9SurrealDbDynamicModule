import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { GqlExecutionContext } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { METADATA_KEY } from '../constants';
import { DataloaderFactory } from '../interfaces/dataloader-factory.interface';
import { InstanceToken } from '../types';

/**
 * Maps dataloader provider tokens to dataloader instances.
 */
export type DataloaderMap = Map<InstanceToken, DataLoader<any, any, any>>;

/**
 * Service that dynamically discovers providers decorated with `@DataloaderProvider()`
 * and acts as a factory for new dataloader instances.
 */
@Injectable()
export class DataloaderDiscoveryService implements OnModuleInit {
  private providers?: InstanceWrapper<DataloaderFactory<any, any, any>>[];

  constructor(private readonly discovery: DiscoveryService) {}

  onModuleInit() {
    this.providers = this.discoverDataloaders();
  }

  discoverDataloaders(): InstanceWrapper<DataloaderFactory>[] {
    return this.discovery
      .getProviders()
      .filter((provider) => provider.metatype && Reflect.getMetadata(METADATA_KEY, provider.metatype));
  }

  createDataloaderMap(ctx: GqlExecutionContext): DataloaderMap {
    if (!this.providers) {
      throw new InternalServerErrorException(`discoverDataloaders() must be called before createDataloaderMap(...)`);
    }
    return new Map(this.providers.map((factory) => [factory.token, factory.instance.createDataloader(ctx)]));
  }
}
