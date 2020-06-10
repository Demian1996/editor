import React, { useMemo, useCallback, KeyboardEvent } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react';
import { Code, P, Leaf, List } from '../../components';
import {
  useToggleBold,
  useChangeContent,
  useToggleCodeBlock,
  useToggleItalic,
  useToggleUnderline,
  useToggleLayout,
  useToggleDel,
} from '../../hooks';
import Toolbar from '../Toolbar';
import { HOTKEYS, FUNC } from '../../const';
import isHotkey from 'is-hotkey';
import { useObservable } from 'rxjs-hooks';

const RichEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case FUNC.codeBlock:
        return <Code style={{ textAlign: props.element.layout }} {...props} />;
      case FUNC.list:
        return <List style={{ textAlign: props.element.layout }} {...props} />;
      default:
        return <P style={{ textAlign: props.element.layout }} {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  const [contentChange$, onContentChange] = useChangeContent();
  const [, toggleBold] = useToggleBold();
  const [, toggleCodeBlock] = useToggleCodeBlock();
  const [, toggleItalic] = useToggleItalic();
  const [, toggleUnderline] = useToggleUnderline();
  const [, toggleLeftLayout] = useToggleLayout(FUNC.layout.left);
  const [, toggleCenterLayout] = useToggleLayout(FUNC.layout.center);
  const [, toggleRightLayout] = useToggleLayout(FUNC.layout.right);
  const [, toggleDel] = useToggleDel();
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
              [FUNC.del]: toggleDel,
              [FUNC.layout.left]: toggleLeftLayout,
              [FUNC.layout.center]: toggleCenterLayout,
              [FUNC.layout.right]: toggleRightLayout,
            };
            map[func](editor);
          }
        }}
      />
    </Slate>
  );
};

export default RichEditor;
