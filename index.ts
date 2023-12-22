import { gc } from "~/globalClasses";
import { cl } from "~/classList";

export {
  cl,
  cl as classList,
  // `cl` being the core feature, makes sense to export it as default
  cl as default,
  gc,
  gc as globalClasses,
};
