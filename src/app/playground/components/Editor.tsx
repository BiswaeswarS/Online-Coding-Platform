import MonacoEditor from '@monaco-editor/react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  c: string;
}

const Editor: React.FC<EditorProps> = ({ value, onChange ,c }) => {
  return (
    <MonacoEditor
      height="60vh"
      width="50vw"
      language={c}
      value={value}
      theme="vs-dark"
      onChange={(value: string) => onChange(value || '')}
    />
  );
};

export default Editor;
