"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const BlocksRenderer = require("./BlocksRenderer.js");
const Text = ({ text, ...modifiers }) => {
  const { modifiers: modifierComponents, missingModifierTypes } = BlocksRenderer.useComponentsContext();
  const modifierNames = Object.keys(modifiers);
  return modifierNames.reduce(
    (children, modifierName) => {
      if (!modifiers[modifierName]) {
        return children;
      }
      const ModifierComponent = modifierComponents[modifierName];
      if (!ModifierComponent) {
        if (!missingModifierTypes.includes(modifierName)) {
          console.warn(
            `[@strapi/block-react-renderer] No component found for modifier "${modifierName}"`
          );
          missingModifierTypes.push(modifierName);
        }
        return children;
      }
      return /* @__PURE__ */ jsxRuntime.jsx(ModifierComponent, { children });
    },
    // By default, return the text without any wrapper to avoid useless nesting
    /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: text })
  );
};
exports.Text = Text;
//# sourceMappingURL=Text.js.map
