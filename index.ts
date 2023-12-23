import { gc } from "~/globalClasses";
import { cl } from "~/classList";
import { registerModule, dropModule } from "~/globalClassesRegistry";
import { getNamespacedClasses, toClassName } from "~/utils";

import { type GClass, type RegisteredCSSModules } from "~/types";

export {
  GClass,
  RegisteredCSSModules,
  cl,
  cl as classList,
  // `cl` being the core feature, makes sense to export it as default
  cl as default,
  gc,
  gc as globalClasses,
  registerModule,
  dropModule,
  getNamespacedClasses,
  toClassName,
};
