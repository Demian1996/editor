import React, { FC, MouseEventHandler } from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';

export interface ToolProps {
  toggleBold(editor: Editor): void;
  toggleCodeBlock(editor: Editor): void;
}

const Toolbar: FC<ToolProps> = ({ toggleBold, toggleCodeBlock }) => {
  const editor = useSlate();
  const onToggleBold: MouseEventHandler = (e) => {
    e.preventDefault();
    toggleBold(editor);
  };
  const onToggleCodeBlock: MouseEventHandler = (e) => {
    e.preventDefault();
    toggleCodeBlock(editor);
  };
  return (
    <div>
      <button onClick={onToggleBold}>Bold</button>
      <button onClick={onToggleCodeBlock}>Code Block</button>
    </div>
  );
};

export default Toolbar;
