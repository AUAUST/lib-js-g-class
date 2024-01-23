import { type GClass } from "./types";
import { toClassName } from "./utils";

/**
 * The `cl` function, for Class List, takes a wide range of inputs and parses them into a final class string.
 *
 * Arrays, which can be nested, are flattened and end values parsed.
 * Functions are called and their return values are parsed.
 * Objects are looped through, using the keys as class names and the values as booleans to determine whether to include them.
 * Falsy values, booleans and numbers are ignored from the final string.
 *
 * @example ```tsx
 * import { cl } from "@auaust/g-class";
 *
 * <div class={cl("class1", "class2")}> </div> // "class1 class2"
 * <div class={cl("class1", "class2", false && "class3")}> </div> // "class1 class2"
 * <div class={cl("class1", "class2", true && "class3")}> </div> // "class1 class2 class3"
 * <div class={cl(undefined, () => ["class1", () => "class2"])}> </div> // "class1 class2"
 * <div class={cl(["class1", { class2: true, class3: false }])}> </div> // "class1 class2"
 * ```
 */
function cl(...classes: GClass.Classable[]): string {
  let str = "";
  let parsed: GClass.Classable;

  for (const cls of classes) {
    if ((parsed = toClassName(cls))) {
      str && (str += " ");
      str += parsed;
    }
  }

  return str;
}

export { cl };
