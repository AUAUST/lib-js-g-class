import { cl } from "~/classList";
import { type GClass } from "~/types";

/**
 * The `gc` function, for Global Class, provides a way to access globally-targeted classes.
 * Instead of having to import the namespace and then the class in every file, you can simply use this function.
 *
 * It works by taking a string in the format of `namespace:className` and returning the class.
 *
 * When used as a function, it can take multiple arguments and will return a string of all the classes.
 * If only global classes are used, it's unnecessary to wrap it in `cl`.
 *
 * @example ```tsx
 * import gridStyles from "./grid.module.scss";
 * import clearStyles from "./clear.module.scss";
 * import textStyles from "./text.module.scss";
 * import { cl } from "./helpers";
 *
 * <div class={cl(gridStyles.container, clearStyles.link, textStyles.xl)}>
 *
 * // can effectively be replaced with
 *
 * import { gc } from "./helpers";
 *
 * <div class={gc("grid:container", "clear:link", "text:xl")}>
 * ```
 *
 * @example ```tsx
 * // Some more advanced examples
 * <div class={gc("grid:container", "text:large")}> </div>
 * <div class={cl("other-class", gc("grid:container", "text:large"), gc["text:colorBlack"])}> </div>
 * <div class={cl({[gc("grid:container")]: booleanFunction() })}> </div>
 * ```
 *
 * @example ```tsx
 * // Note it can be used both as a function and as an object if only one class is needed.
 * gc("grid:container") === gc["grid:container"]
 * ```
 */
const gc = function (...classes): string {
  return cl(...classes.map((cl) => gc[cl]));
} as TGlobalClassesFunction;

type TGlobalClassesFunction = {
  (...classes: GClass.RegisteredGlobalClasses[]): string;
} & {
  [K in GClass.RegisteredGlobalClasses]: string;
};

export { gc };
