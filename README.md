###### AUAUST LIBRARIES — JavaScript — G-Class

> This repository is made public to open the codebase to contributors.
> When contributing to this repo, you agree to assign your copyrights to AUAUST.

# G-Class

G-Class provides a set of functions that helps you deal with CSS modules and classes from JavaScript. Alike the Mercedes-Benz G-Class, it is robust, elegant and powerful. Unlike the Mercedes-Benz G-Class, it is lightweight, free, and isn't a car.

## Overview

```tsx
cl(
  "my-class-1",
  false && "my-class-2",
  true && "my-class-3",
  () => "my-class-4",
  [
    "my-class-5",
    {
      "my-class-6": true,
      "my-class-7": false,
    },
  ],
  gc("myNamespace:myCSSModuleClass")
); // => "my-class-1 my-class-3 my-class-4 my-class-5 my-class-6 _generated_css_module_class_123abc"
```

## Key Features

- **Type Safety** – Strongly typed. Even for CSS classes.
- **Framework Agnostic** – Integrates with any framework (or no framework at all).
- **No config** - The handling of CSS Modules should already be done by your bundler, which means any configuration is already done when G-Class receives values.
- **Easy** – WYSIWYG.
- **Robust** – A layer of type safety and convenience without any black magic that will break tomorrow.
- **No Dependencies** – No external dependencies.
- **Isomorphic** – No usage of special APIs. Only JavaScript.

## Installation

```sh
pnpm add @auaust/g-class
```

or if you prefer Bun:

```sh
bun add @auaust/g-class
```

## Usage

The most simple and common use case is to use the `cl()` function to generate a string of CSS classes from a set of arguments.
G-Class, however, also provides a set of functions that specifically targets CSS Modules in a type-safe manner.

### `cl()`(Class List)

To `cl()` you can pass pretty much anything. All arguments will be converted to a string and concatenated into CSS-usable classes.
The following are supported, and will be converted as follows:

- A non-empty string will be returned as is.
- A function will be called and its return value will be re-injected into `cl()`.
- Each entry of an array will be re-injected into `cl()`.
- Objects will be looped through, and each key which value is truthy will be included in the output.
- Any falsy value will be ignored, including `undefined`, `null` and empty strings. 
- A number will be ignored.
- All booleans will be ignored.

#### Type Safety

The `cl()` function expects inputs of type `GClass.Classable`. That's a wide type that includes objects, arrays, functions, strings and falsy values that can all be recursive. For example, an array can contain another array which can contains a function returning another function returning a string to be used. This is especially useful with frameworks where you need to pass down class names while adding your own on the way. There's no risk of runtime errors with `cl()` even if you pass invalid values.

### `gc()`(Global Classes)

The advantage of using CSS modules is that you can easily type them with existing packages such as [`typed-css-modules`](https://www.npmjs.com/package/typed-css-modules). This means you can import a CSS file in your project and be sure to only apply valid CSS classes to your elements. A rather annoying downside of using CSS modules, tho, is the need to constantly import a bunch of CSS files and then use them in complex template literals.

The `cl()` function was the first step to solve this issue, as passing a few arguments to a function is much easier and safer than building a template literal. We still end up with a bunch of imports which are also often globally-targetted CSS Modules (especially when using utility-first design patterns). The `gc()` function solves this issue. You can register your global CSS modules once, then use them in your code by only importing the `gc()` function.

You can cleanup your components in the following way:

```tsx
import { gc } from "@auaust/g-class";

function Component() {
  return (
    <div
      class={gc(
        "text:black",
        "text:alignCenter",
        "color:bgBlue",
        // ...and any other CSS class you've registered
      )}
    >
      G-Class is awesome!
    </div>
  );
}
```

instead of 

```tsx
import text from "~style/modules/text.module.css";
import color from "~style/modules/text.module.css";

function Component() {
  return (
    <div
      class={`${
        text.black
      } ${
        text.alignCenter
      } ${
        color.bgBlue
      }`}
    > 
      CSS modules causes risk of getting `undefined` classnames!
    </div>
  );
}
```

#### Registering Global CSS Modules

By default, no class is registered thus no class is available. The `registerModule` function will register a CSS module and make it available to the `gc()` function. You can register as many CSS modules as you want. You can also register multiple CSS modules under a single namespace, which can help you split your CSS Modules into multiple files. If you register multiple CSS modules under the same namespace and they contain the same CSS class, the last one registered will be used.

The first argument of `registerModule` is the namespace, and the second argument is the CSS Module itself. A CSS module is an object where the keys are the CSS classes that map to a unique string, generated by your CSS bundler.

```css
/* styles.module.css */

.color-black {
  color: black;
}

.quote {
  color: darkgray;
  text-align: center;
  font-style: italic;
}
.quote::before {
  content: "“";
}
.quote::after {
  content: "”";
}
```

```tsx
import { registerModule, gc } from "@auaust/g-class";
import styles from "./styles.module.css";

registerModule("text", styles);

gc("text:colorBlack"); // => "_style_color-black_1jac3" (or whatever your CSS bundler generates)
gc("text:quote"); // => "_style_quote_5b1h3"

gc("text:colorBlack", "text:quote"); // => "_style_color-black_1jac3 _style_quote_5b1h3"

gc("invalid:class"); // => "", will not throw an error and return an empty string silently
```

Most of the time, you'll want to register multiple namespaces at once in your app's entry point. To facilitate that, you may also use `registerModules` which takes an object as the input. It's a map of namespace name to CSS module. 


```tsx
import { registerModules } from "@auaust/g-class";
import colorStyles from "./color.module.scss";
import textStyles from "./text.module.scss";
import layoutStyles from "./layout.module.scss";

registerModules({
  color: colorStyles,
  text: textStyles,
  layout: layoutStyles,
})
```

Even though there's likely no reason to do so, note you can remove a registered CSS Module by calling `dropModule(namespace)`.

#### Class Names

The actual CSS modules implementation must be done by your bundler. If you're using Vite, they're supported out of the box. This means whether you should use `gc("test:my-class")` or `gc("test:myClass")` depends on your bundler and external configuration. G-Class is transparent about this and will not modify the class names you pass to `registerModule()`.

#### Type Safety

Out of the box, `gc()` will accept any input that matches `${string}:${string}`. This means any namespace and any class name will be accepted as long as the general string format is respected. To provide great type safety, you need to extend the `RegisteredCSSModules` interface with your own CSS modules. Be aware that as soon as a single CSS module is registered on the type level, the `gc()` function will become strongly typed and any unregistered class you pass to it will be highlighted as an error by TypeScript.

To extend the interface, you can either pass the type of a CSS module or `true`, which will allow any class name to be passed under the namespace.

```tsx
import { registerModule } from "@auaust/g-class";
import textStyles from "./text.module.css";
import colorStyles from "./color.module.css";
import gridStyles from "./grid.module.css";

declare module "@auaust/g-class" {
  interface RegisteredCSSModules {
    text: typeof textStyles;
    color: true;
  }
}

registerModule("text", textStyles);
registerModule("color", colorStyles);
registerModule("grid", gridStyles);

gc("text:colorBlack"); // Will be allowed AND will be type-hinted by your IDE for easy fill in
gc("text:invalidClass"); // Will be highlighted as an error ub your IDE
gc("color:invalidClass"); // Will be allowed since any class name is allowed under the "color" namespace
gc("grid:validClass"); // Will be highlighted as an error in your IDE as the interface was not extended for the "grid" namespace

// If, however, you used the same code without extending the interface, each entry would be accepted as they respect the `${string}:${string}` format.
```

### Concrete Example

Since the `gc()` function returns a string, you can easily include it in the `cl()` function too. If you only need to use global classes, you can safely only use the `gc()` function as it provides the same runtime safety as the `cl()` function.

```tsx
import { cl, gc } from "@auaust/g-class";
import styles from "./my-component-styles.module.css";

function Component() {
  return (
    <div
      clas={cl(
        "my-global-class",
        active() && "my-active-class",
        styles.myComponentClass,
        gc("text:colorBlack", "text:quote")
      )}
    >
      <p class={gc("text:mono")}> Hello World! </p>
    </div>
  );
}
```

## Related

The `cl()` function is widely inspired by [`clsx`](https://www.npmjs.com/package/clsx). If you're looking for a minimal solution, don't need functions to be called and don't use the globally registered CSS modules, you should definitely check it out.

## Sponsor

This library is a project by us, [AUAUST](https://auaust.ch/). We sponsor ourselves!
