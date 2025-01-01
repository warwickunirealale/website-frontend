import * as React from 'react';
import { type Modifier, type TextInlineNode } from './Text';
interface LinkInlineNode {
    type: 'link';
    url: string;
    children: TextInlineNode[];
}
interface ListItemInlineNode {
    type: 'list-item';
    children: DefaultInlineNode[];
}
type DefaultInlineNode = TextInlineNode | LinkInlineNode;
type NonTextInlineNode = Exclude<DefaultInlineNode, TextInlineNode> | ListItemInlineNode;
interface ParagraphBlockNode {
    type: 'paragraph';
    children: DefaultInlineNode[];
}
interface QuoteBlockNode {
    type: 'quote';
    children: DefaultInlineNode[];
}
interface CodeBlockNode {
    type: 'code';
    children: DefaultInlineNode[];
}
interface HeadingBlockNode {
    type: 'heading';
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: DefaultInlineNode[];
}
interface ListBlockNode {
    type: 'list';
    format: 'ordered' | 'unordered';
    children: (ListItemInlineNode | ListBlockNode)[];
}
interface ImageBlockNode {
    type: 'image';
    image: {
        name: string;
        alternativeText?: string | null;
        url: string;
        caption?: string | null;
        width: number;
        height: number;
        formats?: Record<string, unknown>;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        previewUrl?: string | null;
        provider: string;
        provider_metadata?: unknown | null;
        createdAt: string;
        updatedAt: string;
    };
    children: [{
        type: 'text';
        text: '';
    }];
}
type RootNode = ParagraphBlockNode | QuoteBlockNode | CodeBlockNode | HeadingBlockNode | ListBlockNode | ImageBlockNode;
type Node = RootNode | NonTextInlineNode;
type GetPropsFromNode<T> = Omit<T, 'type' | 'children'> & {
    children?: React.ReactNode;
    plainText?: T extends {
        type: 'code';
    } ? string : never;
};
type BlocksComponents = {
    [K in Node['type']]: React.ComponentType<GetPropsFromNode<Extract<Node, {
        type: K;
    }>>>;
};
type ModifiersComponents = {
    [K in Modifier]: React.ComponentType<{
        children: React.ReactNode;
    }>;
};
interface ComponentsContextValue {
    blocks: BlocksComponents;
    modifiers: ModifiersComponents;
    missingBlockTypes: string[];
    missingModifierTypes: string[];
}
interface ComponentsProviderProps {
    children: React.ReactNode;
    value?: ComponentsContextValue;
}
declare const ComponentsProvider: ({ children, value }: ComponentsProviderProps) => React.JSX.Element;
declare function useComponentsContext(): ComponentsContextValue;
interface BlocksRendererProps {
    content: RootNode[];
    blocks?: Partial<BlocksComponents>;
    modifiers?: Partial<ModifiersComponents>;
}
declare const BlocksRenderer: (props: BlocksRendererProps) => React.JSX.Element;
export type { RootNode, Node, GetPropsFromNode };
export { ComponentsProvider, useComponentsContext, BlocksRenderer };
//# sourceMappingURL=BlocksRenderer.d.ts.map