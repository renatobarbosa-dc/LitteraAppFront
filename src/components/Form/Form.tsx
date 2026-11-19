import "./Form.css";
import { Send } from "lucide-react";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { lineNumbers } from "@codemirror/view";
import { EditorView } from "@codemirror/view";

interface FormProps {
  onSubmit: (url: string, question: string) => void;
}

export function Form({ onSubmit }: FormProps) {
  const [url, setUrl] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!url.trim() || !value.trim()) return;
    onSubmit(url, value);
  };

  return (
    <div className="form-container">
      <p className="title-forms">Qual orientação você deseja dar à IA?</p>

      <div className="form-input">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Ex.: Melhore a escrita acadêmica, a coesão e a clareza do meu TCC sobre..."
        />
      </div>

      <p className="title-forms">
        Qual trecho do seu texto você deseja aprimorar?
      </p>

      <div className="form-input editor-input">
        <div className="code-editor">
          <CodeMirror
            value={value}
            onChange={(val) => setValue(val)}
            extensions={[lineNumbers(), EditorView.lineWrapping]}
            placeholder="Cole aqui o trecho do seu texto..."
            basicSetup={{
              lineNumbers: true,
              foldGutter: false,
              highlightActiveLine: false,
              highlightActiveLineGutter: false,
              autocompletion: false,
            }}
          />
        </div>

        <button onClick={handleSubmit}>
          <Send />
        </button>
      </div>
    </div>
  );
}
