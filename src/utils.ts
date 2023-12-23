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
  });
}

/**
 * Takes a Classable value and returns the string representation of it.
 *
 * Whether the output contains one or multiple classes depends on the input.
 * It might return an empty string, but will always return a string.
 *
 * Improved version of clsx: https://github.com/lukeed/clsx/blob/master/src/index.js
 */
function toClassName(raw: GClass.Classable): string {
  // Any falsy value is ignored.
  if (!raw) return "";

  // Strings are returned as-is.
  if (typeof raw === "string") {
    return raw;
  }

  // Objcts might be...
  if (typeof raw === "object") {
    let str = "";

    // ...arrays, in which case they're iterated over...
    if (Array.isArray(raw)) {
      let parsed: GClass.ClassName;

      for (const item of raw) {
        if (item && (parsed = toClassName(item))) {
          str && (str += " ");
          str += parsed;
        }
      }

      return str;
    }

    // ...or objects, in which case we use the keys as class names and the values as booleans to determine whether to include them.
    for (const key in raw) {
      if (raw[key]) {
        str && (str += " ");
        str += key;
      }
    }

    return str;
  }

  // Functions are called and their return value passed through the same process.
  if (typeof raw === "function") {
    return toClassName(raw());
  }

  // Numbers and booleans are simply ignored.

  return "";
}

export { getNamespacedClasses, toClassName };
