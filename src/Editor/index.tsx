import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { createEditor, Editor, Transforms, Text, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { Code, P, Leaf } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../store';
import * as actions from '../store/actionCreator';
import { useEventObservable, useDispatchAction } from '../hooks';

const CustomEditor = {
  isBoldMarkActive(editor: any) {
    const [match] = Editor.nodes(editor, {
      match: (n) => {
        return n.type === 'bold';
      },
      universal: true,
    }) as any;

    return !!match;
  },

  isCodeBlockActive(editor: any) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'code',
    }) as any;

    return !!match;
  },

  toggleBoldMark(editor: any) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(editor, { bold: isActive ? null : true }, { match: (n) => Text.isText(n), split: true });
  },

  toggleCodeBlock(editor: any) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(editor, { type: isActive ? null : 'code' }, { match: (n) => Editor.isBlock(editor, n) });
  },
};

const RichEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const content = useSelector((state: StoreType) => {
    return state.content.asMutable({ deep: true });
  });
  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'code':
        return <Code {...props} />;
      default:
        return <P {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  const [contentChange$, onContentChange] = useEventObservable<Node[]>();
  useDispatchAction(contentChange$, (content: Node[]) => {
    return actions.changeContent({ content });
  });

  return (
    <Slate editor={editor} value={content} onChange={onContentChange}>
      <button
        onMouseDown={(e: any) => {
          e.preventDefault();
          console.log(editor);
          CustomEditor.toggleBoldMark(editor);
        }}
      >
        Bold
      </button>
      <button
        onMouseDown={(e: any) => {
          e.preventDefault();
          CustomEditor.toggleCodeBlock(editor);
        }}
      >
        Code Block
      </button>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event: any) => {
          if (!event.ctrlKey) {
            return;
          }

          switch (event.key) {
            // When "`" is pressed, keep our existing code block logic.
            case '`': {
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
              break;
            }

            // When "B" is pressed, bold the text in the selection.
            case 'b': {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
              break;
            }
            default:
              return;
          }
        }}
      />
    </Slate>
  );
};

export default RichEditor;
