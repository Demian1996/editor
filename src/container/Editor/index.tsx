import React, { useMemo, useCallback, KeyboardEvent, FC } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';
import { Element, Leaf } from '../../components';
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
import { withHistory } from 'slate-history';

interface IProps {
  autoFocus?: boolean;
  spellCheck?: boolean;
  placeholder?: string;
}

const RichEditor: FC<IProps> = ({ autoFocus, spellCheck, placeholder }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback((props: RenderElementProps) => {
    return <Element {...props} />;
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
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
      type: 'p',
      children: [{ text: '' }],
    },
  ]);

  return (
    <Slate editor={editor} value={content} onChange={onContentChange}>
      <Toolbar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder={placeholder || '请输入字符...'}
        autoFocus={autoFocus || false}
        spellCheck={spellCheck || false}
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
