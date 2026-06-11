import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Heading,
    Link,
    List,
    BlockQuote,
    Table,
    TableToolbar,
    Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

export default function RichTextEditor({ label, value, onChange, error }) {
    return (
        <div>
            <label className="mb-2 block text-[13px] font-extrabold text-[#061b46]">
                {label}
            </label>

            <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white">
                <CKEditor
                    editor={ClassicEditor}
                    data={value || ""}
                    config={{
                        licenseKey: "GPL",
                        plugins: [
                            Essentials,
                            Paragraph,
                            Bold,
                            Italic,
                            Heading,
                            Link,
                            List,
                            BlockQuote,
                            Table,
                            TableToolbar,
                            Undo,
                        ],
                        toolbar: [
                            "heading",
                            "|",
                            "bold",
                            "italic",
                            "link",
                            "bulletedList",
                            "numberedList",
                            "blockQuote",
                            "insertTable",
                            "|",
                            "undo",
                            "redo",
                        ],
                        table: {
                            contentToolbar: [
                                "tableColumn",
                                "tableRow",
                                "mergeTableCells",
                            ],
                        },
                    }}
                    onChange={(_, editor) => {
                        onChange(editor.getData());
                    }}
                />
            </div>

            {error ? (
                <p className="mt-2 text-[12px] font-bold text-red-600">
                    {error}
                </p>
            ) : null}
        </div>
    );
}