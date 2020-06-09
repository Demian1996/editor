import React, { FC, MouseEventHandler, useCallback } from 'react';
import { useSlate } from 'slate-react';
import {
  useToggleBold,
  useToggleCodeBlock,
  useToggleItalic,
  useToggleUnderline,
  isBoldActive,
  isBlockCodeActive,
  isItalicActive,
  isUnderlineActive,
  useToggleLayout,
  isLayoutActive,
} from '../../hooks';
import styles from './index.module.css';
import { FUNC } from '../../const';

interface ToolProps {}

const Toolbar: FC<ToolProps> = () => {
  const editor = useSlate();
  const [bold$, toggleBold] = useToggleBold();
  const [codeBlock$, toggleCodeBlock] = useToggleCodeBlock();
  const [italic$, toggleItalic] = useToggleItalic();
  const [underline$, toggleUnderline] = useToggleUnderline();
  const [leftLayout$, toggleLeftLayout] = useToggleLayout(FUNC.layout.left);
  const [centerLayout$, toggleCenterLayout] = useToggleLayout(FUNC.layout.center);
  const [rightLayout$, toggleRightLayout] = useToggleLayout(FUNC.layout.right);
  const createEventHandler = useCallback(
    (fn): MouseEventHandler => (e) => {
      e.preventDefault();
      fn(editor);
    },
    [editor]
  );
  const onToggleBold: MouseEventHandler = createEventHandler(toggleBold);

  const onToggleCodeBlock: MouseEventHandler = createEventHandler(toggleCodeBlock);

  const onToggleItalic: MouseEventHandler = createEventHandler(toggleItalic);

  const onToggleUnderline: MouseEventHandler = createEventHandler(toggleUnderline);

  const onToggleLeftLayout: MouseEventHandler = createEventHandler(toggleLeftLayout);

  const onToggleCenterLayout: MouseEventHandler = createEventHandler(toggleCenterLayout);

  const onToggleRightLayout: MouseEventHandler = createEventHandler(toggleRightLayout);
  return (
    <div>
      <button className={isBoldActive(editor) ? styles.active : ''} onClick={onToggleBold}>
        Bold
      </button>
      <button className={isBlockCodeActive(editor) ? styles.active : ''} onClick={onToggleCodeBlock}>
        Code Block
      </button>
      <button className={isItalicActive(editor) ? styles.active : ''} onClick={onToggleItalic}>
        Italic
      </button>
      <button className={isUnderlineActive(editor) ? styles.active : ''} onClick={onToggleUnderline}>
        Underline
      </button>
      <button className={isLayoutActive(editor, FUNC.layout.left) ? styles.active : ''} onClick={onToggleLeftLayout}>
        left
      </button>
      <button
        className={isLayoutActive(editor, FUNC.layout.center) ? styles.active : ''}
        onClick={onToggleCenterLayout}
      >
        center
      </button>
      <button className={isLayoutActive(editor, FUNC.layout.right) ? styles.active : ''} onClick={onToggleRightLayout}>
        right
      </button>
    </div>
  );
};

export default Toolbar;
