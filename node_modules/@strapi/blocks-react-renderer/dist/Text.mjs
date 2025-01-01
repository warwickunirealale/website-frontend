import { jsx, Fragment } from "react/jsx-runtime";
import { useComponentsContext } from "./BlocksRenderer.mjs";
const Text = ({ text, ...modifiers }) => {
  const { modifiers: modifierComponents, missingModifierTypes } = useComponentsContext();
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
      return /* @__PURE__ */ jsx(ModifierComponent, { children });
    },
    // By default, return the text without any wrapper to avoid useless nesting
    /* @__PURE__ */ jsx(Fragment, { children: text })
  );
};
export {
  Text
};
//# sourceMappingURL=Text.mjs.map
