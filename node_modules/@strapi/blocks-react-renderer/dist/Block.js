"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const BlocksRenderer = require("./BlocksRenderer.js");
const Text = require("./Text.js");
const voidTypes = ["image"];
const augmentProps = (content) => {
  const { children: childrenNodes, type, ...props } = content;
  if (type === "code") {
    const getPlainText = (children) => {
      return children.reduce((currentPlainText, node) => {
        if (node.type === "text") {
          return currentPlainText.concat(node.text);
        }
        if (node.type === "link") {
          return currentPlainText.concat(getPlainText(node.children));
        }
        return currentPlainText;
      }, "");
    };
    return {
      ...props,
      plainText: getPlainText(content.children)
    };
  }
  return props;
};
const Block = ({ content }) => {
  const { children: childrenNodes, type, ...props } = content;
  const { blocks, missingBlockTypes } = BlocksRenderer.useComponentsContext();
  const BlockComponent = blocks[type];
  if (!BlockComponent) {
    if (!missingBlockTypes.includes(type)) {
      console.warn(`[@strapi/block-react-renderer] No component found for block type "${type}"`);
      missingBlockTypes.push(type);
    }
    return null;
  }
  if (voidTypes.includes(type)) {
    return /* @__PURE__ */ jsxRuntime.jsx(BlockComponent, { ...props });
  }
  if (type === "paragraph" && childrenNodes.length === 1 && childrenNodes[0].type === "text" && childrenNodes[0].text === "") {
    return /* @__PURE__ */ jsxRuntime.jsx("br", {});
  }
  const augmentedProps = augmentProps(content);
  return /* @__PURE__ */ jsxRuntime.jsx(BlockComponent, { ...augmentedProps, children: childrenNodes.map((childNode, index) => {
    if (childNode.type === "text") {
      const { type: _type, ...childNodeProps } = childNode;
      return /* @__PURE__ */ React.createElement(Text.Text, { ...childNodeProps, key: index });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(Block, { content: childNode }, index);
  }) });
};
exports.Block = Block;
//# sourceMappingURL=Block.js.map
