export const formatMetadataKey = Symbol('Properties');

/**
 * Properties
 * @param props
 */
export const Properties = (props?: {
  fieldName?: string;
  // if one or more returnField is defined in one property, default DecoratedProperties.queryReturnFields is override by the returnField's
  // ex [ "n.title AS title","n.name AS name" ] vs default ["n"]
  returnField?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  map?: Object[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  transform?: Function;
}) => {
  return Reflect.metadata(formatMetadataKey, props);
};

/**
 * getProperties
 * @param target
 * @param propertyKey
 */
export const getProperties = (target: any, propertyKey: string) => {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
};