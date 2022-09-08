import 'reflect-metadata';
import { Type } from '@nestjs/common';

/**
 * Persisted decorator
 */
export const metadataKey = 'Persisted';
export const Persisted = (target, propertyKey) => {
  Reflect.defineMetadata(metadataKey, true, target, propertyKey);
};

/**
 * used with class ex: PersistedUsingClass(MyClass, 'property2')
 * @param type
 * @param propertyKey
 */
export const PersistedUsingClass = <T>(type: Type<T>, propertyKey: string) => {
  return PersistedUsingInstance(new type(), propertyKey);
};

/**
 * used with instance ex: PersistedUsingInstance(instance, 'property1')
 * @param instance
 * @param propertyKey
 */
export const PersistedUsingInstance = <T>(instance: T, propertyKey: string) => {
  return !!Reflect.getMetadata(metadataKey, instance, propertyKey);
};