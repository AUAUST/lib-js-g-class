import { cl } from "~/classList";
import { gc } from "~/globalClasses";
import {
  dropModule,
  registerModule,
  registerModules,
} from "~/globalClassesRegistry";
import { cn, getNamespacedClasses } from "~/utils";

import { type GClass, type RegisteredCSSModules } from "~/types";

export {
  GClass,
  RegisteredCSSModules,
  cl,
  cl as classList,
  cn as className,
  cn,
  dropModule,
  gc,
  getNamespacedClasses,
  gc as globalClasses,
  registerModule,
  registerModules,
};
