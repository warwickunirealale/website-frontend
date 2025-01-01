'use client';
"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const Block = require("./Block.js");
function _interopNamespace(e) {
  if (e && e.__esModule)
    return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const React__namespace = /* @__PURE__ */ _interopNamespace(React);
const defaultComponents = {
  blocks: {
    paragraph: (props) => /* @__PURE__ */ jsxRuntime.jsx("p", { children: props.children }),
    quote: (props) => /* @__PURE__ */ jsxRuntime.jsx("blockquote", { children: props.children }),
    code: (props) => /* @__PURE__ */ jsxRuntime.jsx("pre", { children: /* @__PURE__ */ jsxRuntime.jsx("code", { children: props.plainText }) }),
    heading: ({ level, children }) => {
      switch (level) {
        case 1:
          return /* @__PURE__ */ jsxRuntime.jsx("h1", { children });
        case 2:
          return /* @__PURE__ */ jsxRuntime.jsx("h2", { children });
        case 3:
          return /* @__PURE__ */ jsxRuntime.jsx("h3", { children });
        case 4:
          return /* @__PURE__ */ jsxRuntime.jsx("h4", { children });
        case 5:
          return /* @__PURE__ */ jsxRuntime.jsx("h5", { children });
        case 6:
          return /* @__PURE__ */ jsxRuntime.jsx("h6", { children });
      }
    },
    link: (props) => /* @__PURE__ */ jsxRuntime.jsx("a", { href: props.url, children: props.children }),
    list: (props) => {
      if (props.format === "ordered") {
        return /* @__PURE__ */ jsxRuntime.jsx("ol", { children: props.children });
      }
      return /* @__PURE__ */ jsxRuntime.jsx("ul", { children: props.children });
    },
    "list-item": (props) => /* @__PURE__ */ jsxRuntime.jsx("li", { children: props.children }),
    image: (props) => /* @__PURE__ */ jsxRuntime.jsx("img", { src: props.image.url, alt: props.image.alternativeText || void 0 })
  },
  modifiers: {
    bold: (props) => /* @__PURE__ */ jsxRuntime.jsx("strong", { children: props.children }),
    italic: (props) => /* @__PURE__ */ jsxRuntime.jsx("em", { children: props.children }),
    underline: (props) => /* @__PURE__ */ jsxRuntime.jsx("u", { children: props.children }),
    strikethrough: (props) => /* @__PURE__ */ jsxRuntime.jsx("del", { children: props.children }),
    code: (props) => /* @__PURE__ */ jsxRuntime.jsx("code", { children: props.children })
  },
  missingBlockTypes: [],
  missingModifierTypes: []
};
const ComponentsContext = React__namespace.createContext(defaultComponents);
const ComponentsProvider = ({ children, value = defaultComponents }) => {
  const memoizedValue = React__namespace.useMemo(() => value, [value]);
  return /* @__PURE__ */ jsxRuntime.jsx(ComponentsContext.Provider, { value: memoizedValue, children });
};
function useComponentsContext() {
  return React__namespace.useContext(ComponentsContext);
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
  const missingBlockTypes = React__namespace.useRef([]);
  const missingModifierTypes = React__namespace.useRef([]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    ComponentsProvider,
    {
      value: {
        blocks,
        modifiers,
        missingBlockTypes: missingBlockTypes.current,
        missingModifierTypes: missingModifierTypes.current
      },
      children: props.content.map((content, index) => /* @__PURE__ */ jsxRuntime.jsx(Block.Block, { content }, index))
    }
  );
};
exports.BlocksRenderer = BlocksRenderer;
exports.ComponentsProvider = ComponentsProvider;
exports.useComponentsContext = useComponentsContext;
//# sourceMappingURL=BlocksRenderer.js.map
