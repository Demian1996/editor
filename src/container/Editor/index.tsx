import React, { useMemo, useCallback, KeyboardEvent } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { Code, P, Leaf } from '../../components';
import { useToggleBold, useChangeContent, useToggleCodeBlock, useToggleItalic, useToggleUnderline } from '../../hooks';
import Toolbar from '../Toolbar';
import { HOTKEYS, FUNC } from '../../const';
import isHotkey from 'is-hotkey';
import { useObservable } from 'rxjs-hooks';

const RichEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case FUNC.codeBlock:
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
  const [italic$, toggleItalic] = useToggleItalic();
  const [underline$, toggleUnderline] = useToggleUnderline();
  const content = useObservable(() => contentChange$, [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  return (
    <Slate editor={editor} value={content} onChange={onContentChange}>
      <Toolbar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(e: KeyboardEvent) => {
          for (const func in HOTKEYS) {
            const hotkey = HOTKEYS[func];
            if (!isHotkey(hotkey, e as any)) continue;
            e.preventDefault();
            const map = {
              [FUNC.bold]: toggleBold,
              [FUNC.codeBlock]: toggleCodeBlock,
              [FUNC.italic]: toggleItalic,
              [FUNC.underline]: toggleUnderline,
            };
            map[func](editor);
          }
        }}
      />
    </Slate>
  );
};

export default RichEditor;
