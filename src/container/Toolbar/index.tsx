import React, { FC, MouseEventHandler, useCallback, ChangeEventHandler } from 'react';
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
  useToggleDel,
  isDelActive,
  usePickColor,
  getColor,
  isBlockListActive,
  useToggleListBlock,
} from '../../hooks';
import styles from './index.module.css';
import { FUNC, DEFAULT_FONT_COLOR } from '../../const';

interface ToolProps {}

const Toolbar: FC<ToolProps> = () => {
  const editor = useSlate();
  const [, toggleBold] = useToggleBold();
  const [, toggleCodeBlock] = useToggleCodeBlock();
  const [, toggleItalic] = useToggleItalic();
  const [, toggleUnderline] = useToggleUnderline();
  const [, toggleLeftLayout] = useToggleLayout(FUNC.layout.left);
  const [, toggleCenterLayout] = useToggleLayout(FUNC.layout.center);
  const [, toggleRightLayout] = useToggleLayout(FUNC.layout.right);
  const [, toggleDel] = useToggleDel();
  const [, toggleOrderedListBlock] = useToggleListBlock(FUNC.list.orderedList);
  const [, toggleUnorderedListBlock] = useToggleListBlock(FUNC.list.unorderedList);
  const [, pickColor] = usePickColor();
  const createEventHandler = useCallback(
    (fn): MouseEventHandler => (e) => {
      e.preventDefault();
      fn(editor);
    },
    [editor]
  );
  const onToggleBold = createEventHandler(toggleBold);

  const onToggleCodeBlock = createEventHandler(toggleCodeBlock);

  const onToggleItalic = createEventHandler(toggleItalic);

  const onToggleUnderline = createEventHandler(toggleUnderline);

  const onToggleLeftLayout = createEventHandler(toggleLeftLayout);

  const onToggleCenterLayout = createEventHandler(toggleCenterLayout);

  const onToggleRightLayout = createEventHandler(toggleRightLayout);

  const onToggleDel = createEventHandler(toggleDel);

  const onToggleOrderedListBlock = createEventHandler(toggleOrderedListBlock);

  const onToggleUnorderedListBlock = createEventHandler(toggleUnorderedListBlock);

  const onPickColor: ChangeEventHandler = (e) => {
    pickColor((e.target as HTMLInputElement).value);
  };

  const color = getColor(editor);
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
      <button className={isDelActive(editor) ? styles.active : ''} onClick={onToggleDel}>
        Del
      </button>
      <button
        className={isBlockListActive(editor, FUNC.list.orderedList) ? styles.active : ''}
        onClick={onToggleOrderedListBlock}
      >
        Ol
      </button>
      <button
        className={isBlockListActive(editor, FUNC.list.unorderedList) ? styles.active : ''}
        onClick={onToggleUnorderedListBlock}
      >
        Ul
      </button>
      <button className={isLayoutActive(editor, FUNC.layout.left) ? styles.active : ''} onClick={onToggleLeftLayout}>
        Left
      </button>
      <button
        className={isLayoutActive(editor, FUNC.layout.center) ? styles.active : ''}
        onClick={onToggleCenterLayout}
      >
        Center
      </button>
      <button className={isLayoutActive(editor, FUNC.layout.right) ? styles.active : ''} onClick={onToggleRightLayout}>
        Right
      </button>
      <input type="color" value={color ? color : DEFAULT_FONT_COLOR} onChange={onPickColor} />
    </div>
  );
};

export default Toolbar;
