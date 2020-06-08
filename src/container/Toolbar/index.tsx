import React, { FC, MouseEventHandler } from 'react';
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
} from '../../hooks';
import styles from './index.module.css';

interface ToolProps {}

const Toolbar: FC<ToolProps> = () => {
  const editor = useSlate();
  const [bold$, toggleBold] = useToggleBold();
  const [codeBlock$, toggleCodeBlock] = useToggleCodeBlock();
  const [italic$, toggleItalic] = useToggleItalic();
  const [underline$, toggleUnderline] = useToggleUnderline();
  const onToggleBold: MouseEventHandler = (e) => {
    e.preventDefault();
    toggleBold(editor);
  };

  const onToggleCodeBlock: MouseEventHandler = (e) => {
    e.preventDefault();
    toggleCodeBlock(editor);
  };

  const onToggleItalic: MouseEventHandler = (e) => {
    e.preventDefault();
    toggleItalic(editor);
  };

  const onToggleUnderline: MouseEventHandler = (e) => {
    e.preventDefault();
    toggleUnderline(editor);
  };

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
    </div>
  );
};

export default Toolbar;
