import React, { useMemo, useCallback, KeyboardEvent } from 'react';
import { createEditor, Editor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { Code, P, Leaf } from '../../components';
import { useSelector } from 'react-redux';
import { StoreType } from '../../store';
import { useToggleBold, useChangeContent, useToggleCodeBlock, useEventObservable } from '../../hooks';
import Toolbar from '../Toolbar';
import { HOTKEYS } from './controller';
import isHotkey from 'is-hotkey';

const RichEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const content = useSelector((state: StoreType) => state.content.asMutable({ deep: true }));
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
  const [bold$, toggleBold] = useEventObservable<Editor>();
  const [codeBlock$, toggleCodeBlock] = useEventObservable<Editor>();

  // 事件流流入hook，处理各自副作用
  useToggleBold(bold$);
  useChangeContent(contentChange$);
  useToggleCodeBlock(codeBlock$);

  return (
    <Slate
      editor={editor}
      value={content}
      onChange={onContentChange}
    >
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
