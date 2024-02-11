import { gc } from "~/globalClasses";
import { type GClass } from "~/types";
import { getNamespacedClasses } from "~/utils";

/**
 * Registers a CSS module under the specified namespace.
 * After being called, it can be accessed via the `gc` function.
 * Always returns `true`.
 *
 * WARNING: It must be called before any `gc` calls are made with the same namespace, or else it will be undefined.
 *
 * @example ```ts
 * import styles from "./styles.module.css";
 *
 * registerModule("styles", styles);
 *
 * myElement.classList.add(gc("styles:myClass"));
 * ```
 */
function registerModule(namespace: string, cssModule: GClass.CSSModuleClasses) {
  if (!namespace || !cssModule)
    throw new Error("Didn't receive enough arguments.");

  const classes = getNamespacedClasses(namespace, cssModule);

  for (const [className, classValue] of classes) {
    gc[className as keyof typeof gc] = classValue;
  }

  return true;
}

/**
 * Provides a simpler way to register multiple CSS modules at once.
 * It's a wrapper around `registerModule`, where the passed argument is an object where keys are the namespaces and values are the CSS modules.
 * Check `registerModule` for more information.
 *
 * @example ```ts
 * import textStyles from "./text.module.css";
 * import gridStyles from "./grid.module.css";
 * import colorStyles from "./color.module.css";
 *
 * registerModules({
 *   text: textStyles,
 *   grid: gridStyles,
 *   color: colorStyles,
 * });
 * ```
 */
function registerModules(modules: Record<string, GClass.CSSModuleClasses>) {
  for (const namespace in modules) {
    registerModule(namespace, modules[namespace]!);
  }

  return true;
}

/**
 * Removes a registered CSS module.
 * Returns a boolean indicating whether any classes were removed.
 */
function dropModule(namespace: string) {
  if (!namespace || typeof namespace !== "string") return false;

  let deleted = 0;

  for (const className in gc) {
    if (className.startsWith(`${namespace}:`))
      delete gc[className as keyof typeof gc] && deleted++;
  }

  return deleted > 0;
}

export { dropModule, registerModule, registerModules };
