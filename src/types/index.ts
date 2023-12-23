/**
 * The registered CSS modules, where the user-chosen namespaces map to the CSS module objects.
 */
interface RegisteredCSSModules {}

namespace GClass {
  type IsEmptyInterface<T> = keyof T extends never ? true : false;

  /**
   * A CSS module object, where the keys are the source class names and the values are the generated class names at runtime.
   */
  export type CSSModuleClasses = { readonly [classname: string]: string };

  export type NamespacedClassName = `${string}:${string}`;

  /**
   * A union of all the registered global classes' namespaced class names.
   * `example:className`
   */

  export type RegisteredGlobalClasses =
    IsEmptyInterface<RegisteredCSSModules> extends true
      ? `${string}:${string}`
      : {
          [K in keyof RegisteredCSSModules]: RegisteredCSSModules[K] extends CSSModuleClasses
            ? `${K & string}:${keyof RegisteredCSSModules[K] & string}`
            : `${K & string}:${string}`;
        }[keyof RegisteredCSSModules];

  /**
   * A final value that can be handled as a class; either by applying it as-is or discarding it.
   */
  export type ClassName = string | boolean | null | undefined;

  /**
   * A pretty generic type of the different values that can be converted into a class name.
   *
   * Allows arrays of any depth which values are any of the other types,
   * functions that return any of the other types,
   * objects where the keys are the class names and the values are booleans whether to include them or not.
   *
   * All end values should be either strings or booleans.
   */
  export type Classable =
    | ClassName
    | (() => Classable)
    | ClassableArray
    | Record<string, unknown>;

  /**
   * A recursive array of Classable values.
   */
  interface ClassableArray extends Array<Classable | ClassableArray> {}
}

export { GClass, RegisteredCSSModules };
