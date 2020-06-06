import React, { useMemo, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { Code, P, Leaf } from '../components';
import { useSelector } from 'react-redux';
import { StoreType } from '../store';
import { useToggleBold, useChangeContent, useToggleCodeBlock } from '../hooks';

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

  const onContentChange = useChangeContent();
  const onToggleBold = useToggleBold();
  const onToggleBlock = useToggleCodeBlock();

  return (
    <Slate editor={editor} value={content} onChange={onContentChange}>
      <button
        onMouseDown={(e: any) => {
          e.preventDefault();
          onToggleBold(editor);
        }}
      >
        Bold
      </button>
      <button
        onMouseDown={(e: any) => {
          e.preventDefault();
          onToggleBlock(editor);
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
              onToggleBlock(editor);
              break;
            }

            // When "B" is pressed, bold the text in the selection.
            case 'b': {
              event.preventDefault();
              onToggleBold(editor);
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
