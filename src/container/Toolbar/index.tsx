import React, { FC, MouseEventHandler } from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

export interface ToolProps {
  toggleBold(editor: Editor): void;
  toggleCodeBlock(editor: Editor): void;
  toggleItalic(editor: Editor): void;
}

const Toolbar: FC<ToolProps> = ({ toggleBold, toggleCodeBlock, toggleItalic }) => {
  const editor = useSlate();
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
  return (
    <div>
      <button onClick={onToggleBold}>Bold</button>
      <button onClick={onToggleCodeBlock}>Code Block</button>
      <button onClick={onToggleItalic}>Italic</button>
    </div>
  );
};

export default Toolbar;
