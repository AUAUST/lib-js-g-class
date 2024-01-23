import { type GClass } from "./types";

/**
 * Takes a CSS Module object as an input and return the array of all the namespaced classes it would generate.
 */
function getNamespacedClasses(
  namespace: string,
  module: GClass.CSSModuleClasses
): [GClass.NamespacedClassName, string][] {
  return Object.keys(module).map(function (className) {
    return [`${namespace}:${className}`, module[className]!] as const;
  }); // [`ns:className`: `_ns_class-name_1234`][]
}

/**
 * The `cn` function, for Class Name, takes a wide range of input values and returns the string representation of it.
 *
 * Whether the output contains one or multiple classes depends on the input.
 * It might return an empty string, but will always return a string.
 *
 * Values that wouldn't make sense as a class name are ignored. (Falsy values, booleans and numbers)
 *
 * Improved version of clsx: https://github.com/lukeed/clsx/blob/master/src/index.js
 */
function cn(raw: GClass.Classable): string {
  // Any falsy value is ignored.
  if (!raw) return "";

  switch (typeof raw) {
    // Strings are returned as-is.
    case "string":
      return raw;

    // Functions are called and their return value passed through the same process.
    case "function":
      return cn(raw());

    // Objects and arrays are iterated through.
    case "object": {
      let str = "";

      // Arrays are flattened and each value passed through the same process.
      if (Array.isArray(raw)) {
        let parsed: GClass.ClassName;

        for (const item of raw) {
          if (item && (parsed = cn(item))) {
            str && (str += " ");
            str += parsed;
          }
        }

        return str;
      }

      // Objects are looped through, using the keys as class names and the values as booleans to determine whether to include them.
      for (const key in raw) {
        if (raw[key]) {
          str && (str += " ");
          str += key;
        }
      }

      return str;
    }
  }

  // Numbers and booleans are simply ignored.

  return "";
}

export { getNamespacedClasses, cn };
