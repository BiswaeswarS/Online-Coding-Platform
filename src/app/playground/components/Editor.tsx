import MonacoEditor from '@monaco-editor/react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  return (
    <MonacoEditor
      height="60vh"
      width="50vw"
      language="python"
      value={value}
      theme="vs-dark"
      onChange={(value: string) => onChange(value || '')}
    />
  );
};

export default Editor;
