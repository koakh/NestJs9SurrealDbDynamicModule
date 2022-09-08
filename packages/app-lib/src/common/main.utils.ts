/**
 * map object keys to lowercase, used for ex to convert header keys to lowercase
 * @param obj
 */
export const mapKeysToLowerCase = (obj: object) => {
  const keys: string[] = Object.keys(obj);
  // initialize result
  const result: { [key: string]: string; } = {};
  keys.forEach((e) => {
    result[e.toLowerCase()] = obj[e];
  });
  return result;
};

/**
 * generic function to get Enum key from a Enum value
 * @param enumType a typescript Type
 * @param enumValue string value
 */
export const getEnumKeyFromEnumValue = (
  enumType: any,
  enumValue: string | number,
): any => {
  const keys: string[] = Object.keys(enumType).filter(
    x => enumType[x] === enumValue,
  );
  if (keys.length > 0) {
    return keys[0];
  } else {
    // throw error to caller function
    // throw new Error(`Invalid enum value '${enumValue}'! Valid enum values are ${Object.keys(myEnum)}`);
    throw new Error(
      `Invalid enum value '${enumValue}'! Valid enum value(s() are ${Object.values(
        enumType,
      )}`,
    );
  }
};

/**
 * generic function to get Enum value from a Enum key
 * @param enumType a typescript Type
 * @param enumValue string value
 */
export const getEnumValueFromEnumKey = (
  enumType: any,
  enumKey: string | number,
): any => {
  // use getEnumKeyByEnumValue to get key from value
  const keys = Object.keys(enumType).filter(
    x => getEnumKeyFromEnumValue(enumType, enumType[x]) === enumKey,
  );
  if (keys.length > 0) {
    // return value from equality key
    return enumType[keys[0]];
  } else {
    // throw error to caller function
    throw new Error(
      `Invalid enum key '${enumKey}'! Valid enum key(s() are ${Object.keys(
        enumType,
      )}`,
    );
  }
};

/**
 * ES7 / 2016 remove json empty properties recursivly
 * @param obj
 */
export const removeEmpty = obj => {
  Object.entries(obj).forEach(
    ([key, val]) =>
      (val && typeof val === 'object' && removeEmpty(val)) ||
      ((val === undefined || val === null || val === '') && delete obj[key]),
  );
  return obj;
};

/**
 * ES7 / 2016 map object to other object, keep only target properties from source object
 * and do some magic like convert strings to json objects
 * @param source object
 * @param target object
 */
export const mapToObjectAndKeepProperties = (source: any, target: any) => {
  Object.entries(source).forEach(
    ([key, val]) => {
      // catch neo4j string json objects and parse to objects
      if (val.toString().startsWith('{"')) {
        val = JSON.parse(val.toString());
      }
      // if key exists in target and source as value
      if (key in target && (
        source[key] !== undefined && source[key] !== null && source[key] !== '')
      ) {
        // assign source value to target value
        target[key] = val;
      };
    }
  );
  return removeEmpty(target);
};
