import React, { useRef } from "react";
import JoditEditor from "jodit-react";

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}

const EditorComponent: React.FC<EditorProps> = ({ value, onChange }) => {
  const editor = useRef(null);
  //   const [content, setContent] = useState<string>("");

  //   const config = {
  //     readonly: false,
  //     height: 400,
  //     toolbarButtonSize: "middle" as const,
  //     buttons: ["bold", "italic", "underline", "link", "unlink", "source"],
  //     uploader: {
  //       insertImageAsBase64URI: true,
  //     },
  //   };

  const config = {
    readonly: false,
    height: 400,
    toolbarButtonSize: "middle" as const,
    buttons: ["bold", "italic", "underline", "link", "unlink", "source"],
    uploader: {
      insertImageAsBase64URI: true,
    },
    askBeforePasteFromWord: false,
    processPasteFromWord: true,
    defaultActionOnPasteFromWord: "insert_as_html" as const,
    defaultActionOnPaste: "insert_as_html" as const,
    cleanHTML: {
      cleanOnPaste: false,
      removeEmptyElements: false,
    },
    style: {
      fontFamily: "Arial, sans-serif",
      fontSize: "12pt",
    },
    pasteHTMLActionList: [
      { value: "insert_as_html", text: "Keep Formatting" },
      { value: "insert_clear_html", text: "Clean Formatting" },
      { value: "insert_only_text", text: "Plain Text" },
    ] as {
      value: "insert_as_html" | "insert_clear_html" | "insert_only_text";
      text: string;
    }[],
    events: {
      afterPaste: (event: any) => {
        console.log(
          "Clipboard data:",
          event.clipboardData.getData("text/html")
        );
        console.log("Pasted content:", event.target.innerHTML);
      },
    },
  };

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => {
          console.log(newContent);
          onChange(newContent);
        }}
        onChange={() => {}}
        // onChange={(newContent) => {
        //   console.log("Rich text content:", newContent); // 🔥 cek di console
        //   setContent(newContent);
        // }}
      />
      <div style={{ marginTop: "20px" }}>
        {/* <h3>Content:</h3>
        <pre>{content}</pre> */}
        {/* <h2 className="mt-4 font-bold">Preview:</h2>
        <div
          className="p-2 border rounded"
          dangerouslySetInnerHTML={{ __html: content }}
        /> */}
      </div>
    </div>
  );
};

export default EditorComponent;
