'use client';
import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { Block } from "./Block.mjs";
const defaultComponents = {
  blocks: {
    paragraph: (props) => /* @__PURE__ */ jsx("p", { children: props.children }),
    quote: (props) => /* @__PURE__ */ jsx("blockquote", { children: props.children }),
    code: (props) => /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: props.plainText }) }),
    heading: ({ level, children }) => {
      switch (level) {
        case 1:
          return /* @__PURE__ */ jsx("h1", { children });
        case 2:
          return /* @__PURE__ */ jsx("h2", { children });
        case 3:
          return /* @__PURE__ */ jsx("h3", { children });
        case 4:
          return /* @__PURE__ */ jsx("h4", { children });
        case 5:
          return /* @__PURE__ */ jsx("h5", { children });
        case 6:
          return /* @__PURE__ */ jsx("h6", { children });
      }
    },
    link: (props) => /* @__PURE__ */ jsx("a", { href: props.url, children: props.children }),
    list: (props) => {
      if (props.format === "ordered") {
        return /* @__PURE__ */ jsx("ol", { children: props.children });
      }
      return /* @__PURE__ */ jsx("ul", { children: props.children });
    },
    "list-item": (props) => /* @__PURE__ */ jsx("li", { children: props.children }),
    image: (props) => /* @__PURE__ */ jsx("img", { src: props.image.url, alt: props.image.alternativeText || void 0 })
  },
  modifiers: {
    bold: (props) => /* @__PURE__ */ jsx("strong", { children: props.children }),
    italic: (props) => /* @__PURE__ */ jsx("em", { children: props.children }),
    underline: (props) => /* @__PURE__ */ jsx("u", { children: props.children }),
    strikethrough: (props) => /* @__PURE__ */ jsx("del", { children: props.children }),
    code: (props) => /* @__PURE__ */ jsx("code", { children: props.children })
  },
  missingBlockTypes: [],
  missingModifierTypes: []
};
const ComponentsContext = React.createContext(defaultComponents);
const ComponentsProvider = ({ children, value = defaultComponents }) => {
  const memoizedValue = React.useMemo(() => value, [value]);
  return /* @__PURE__ */ jsx(ComponentsContext.Provider, { value: memoizedValue, children });
};
function useComponentsContext() {
  return React.useContext(ComponentsContext);
}
const BlocksRenderer = (props) => {
  const blocks = {
    ...defaultComponents.blocks,
    ...props.blocks
  };
  const modifiers = {
    ...defaultComponents.modifiers,
    ...props.modifiers
  };
  const missingBlockTypes = React.useRef([]);
  const missingModifierTypes = React.useRef([]);
  return /* @__PURE__ */ jsx(
    ComponentsProvider,
    {
      value: {
        blocks,
        modifiers,
        missingBlockTypes: missingBlockTypes.current,
        missingModifierTypes: missingModifierTypes.current
      },
      children: props.content.map((content, index) => /* @__PURE__ */ jsx(Block, { content }, index))
    }
  );
};
export {
  BlocksRenderer,
  ComponentsProvider,
  useComponentsContext
};
//# sourceMappingURL=BlocksRenderer.mjs.map
