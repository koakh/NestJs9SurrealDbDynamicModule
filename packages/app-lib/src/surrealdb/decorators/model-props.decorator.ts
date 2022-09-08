export const nameKey = Symbol('ModelProps');
export interface Props { tableName: string };

/**
 * To preserve class name though mangling.
 * @example
 * @ModelProps('person')
 * class Person {}
 * @param props
 */
export const ModelProps = (props: Props): ClassDecorator => {
  return (Reflect as any).metadata(nameKey, props);
}

/**
 * @example
 * const type = Customer;
 * getName(type); // 'Customer'
 * @param type
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const getModelProps = (type: Function): string => {
  return (Reflect as any).getMetadata(nameKey, type);
}

/**
 * @example
 * const instance = new Person();
 * getInstanceModelProps(instance);
 * @param instance
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function getInstanceModelProps(instance: Object): Props {
  return (Reflect as any).getMetadata(nameKey, instance.constructor);
}