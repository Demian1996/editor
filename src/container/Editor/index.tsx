import React, { useMemo, useCallback, KeyboardEvent } from 'react';
import { createEditor, Editor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { Code, P, Leaf } from '../../components';
import { useToggleBold, useChangeContent, useToggleCodeBlock } from '../../hooks';
import Toolbar from '../Toolbar';
import { HOTKEYS } from './controller';
import isHotkey from 'is-hotkey';
import { useObservable } from 'rxjs-hooks';
import { Subject, Observable } from 'rxjs';

const RichEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

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

  const [contentChange$, onContentChange] = useChangeContent();
  const [bold$, toggleBold] = useToggleBold();
  const [codeBlock$, toggleCodeBlock] = useToggleCodeBlock();
  const content = useObservable(() => contentChange$, [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  return (
    <Slate editor={editor} value={content} onChange={onContentChange}>
      <Toolbar toggleBold={toggleBold} toggleCodeBlock={toggleCodeBlock}></Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(e: KeyboardEvent) => {
          for (const hotkey in HOTKEYS) {
            if (!isHotkey(hotkey, e as any)) return;
            e.preventDefault();
            const map = {
              [HOTKEYS.bold]: toggleBold,
              [HOTKEYS.codeBlock]: toggleCodeBlock,
            };
            map[hotkey](editor);
          }
          return 's';
        }}
      />
    </Slate>
  );
};

export default RichEditor;
