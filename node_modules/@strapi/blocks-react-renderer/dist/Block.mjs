import { jsx } from "react/jsx-runtime";
import { createElement } from "react";
import { useComponentsContext } from "./BlocksRenderer.mjs";
import { Text } from "./Text.mjs";
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
  const { blocks, missingBlockTypes } = useComponentsContext();
  const BlockComponent = blocks[type];
  if (!BlockComponent) {
    if (!missingBlockTypes.includes(type)) {
      console.warn(`[@strapi/block-react-renderer] No component found for block type "${type}"`);
      missingBlockTypes.push(type);
    }
    return null;
  }
  if (voidTypes.includes(type)) {
    return /* @__PURE__ */ jsx(BlockComponent, { ...props });
  }
  if (type === "paragraph" && childrenNodes.length === 1 && childrenNodes[0].type === "text" && childrenNodes[0].text === "") {
    return /* @__PURE__ */ jsx("br", {});
  }
  const augmentedProps = augmentProps(content);
  return /* @__PURE__ */ jsx(BlockComponent, { ...augmentedProps, children: childrenNodes.map((childNode, index) => {
    if (childNode.type === "text") {
      const { type: _type, ...childNodeProps } = childNode;
      return /* @__PURE__ */ createElement(Text, { ...childNodeProps, key: index });
    }
    return /* @__PURE__ */ jsx(Block, { content: childNode }, index);
  }) });
};
export {
  Block
};
//# sourceMappingURL=Block.mjs.map
