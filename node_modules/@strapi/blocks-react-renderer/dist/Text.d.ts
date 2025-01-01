import * as React from 'react';
interface TextInlineNode {
    type: 'text';
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
}
type Modifier = Exclude<keyof TextInlineNode, 'type' | 'text'>;
type TextInlineProps = Omit<TextInlineNode, 'type'>;
declare const Text: ({ text, ...modifiers }: TextInlineProps) => React.JSX.Element;
export type { TextInlineNode, Modifier };
export { Text };
//# sourceMappingURL=Text.d.ts.map