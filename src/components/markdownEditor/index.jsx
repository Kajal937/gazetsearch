import React, { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
// import 'react-markdown-editor-lite/lib/index.css';
import '../../../node_modules/react-markdown-editor-lite/lib/index.css';
import { Text } from '@chakra-ui/react';
// import '../../../node_modules/react-markdown-editor-lite/lib/index';
// import dynamic from 'next/dynamic';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt({
  breaks: true,
  linkify: true,
});


// Finish!
// function handleEditorChange({ html, text }) {
// }


const MarkdownEditor = ({ handleEditorChange,value ,label, required}) => {

  const toolbarConfig = {
    h1: true, // Heading 1
    h2: true, // Heading 2
    h3: true, // Heading 3
    h4: true, // Heading 4
    h5: true, // Heading 5
    h6: true, // Heading 6
    bold: true, // Bold
    italic: true, // Italic
    underline: false, // Underline
    strikethrough: true, // Strikethrough
    unorderedList: true, // Unordered List
    orderedList: true, // Ordered List
    checkedList: true, // Checked List (task list)
    link: true, // Insert link
    image: true, // Insert image
    code: true, // Inline code
    table: true, // Insert table (Note: This might not be supported in some editors)
    fullScreen: true, // Fullscreen mode
  };
  
  // const initialValue = 

  // const [markdown, setMarkdown] = useState(initialValue);
  // const [previousValue, setPreviousValue] = useState(value);

  // useEffect(() => {
  //   setPreviousValue(markdown);
  // }, [markdown]);

  // const handleEditorChange = ({ text }) => {
  //   setMarkdown(text);
  // };

  // const handleReset = () => {
  //   setMarkdown(previousValue);
  // };
  return (
    <div className='flex flex-col w-full markdown_css'>
    {label ? (
        <div className="label-container">
          <Text className="!text-[14px] text-gray-600 !font-[500] mb-1">
            {label}
            <span className="required text-[red] !text-[18px]">
              {required ? "*" : null}
            </span>
          </Text>
        </div>
      ) : null}
    <MdEditor style={{ height: '500px' , width:"100%"}}
     value={ value} 
    renderHTML={text => mdParser.render(text)} 
    onChange={handleEditorChange} 
    config={{
      // view: {
      //   menu: true,
      //   md: true,
      //   html: true,
      // },
      table: {
        maxRow: 6,
        maxCol: 4,
      },
      toolbar: {toolbarConfig},
    }}
    />
    </div>
  );
};

export default MarkdownEditor


// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// const MarkdownEditor = ({ value, setValue }) => {
//   const [editorHtml, setEditorHtml] = useState('');

//   const handleChange = (html) => {
//     setEditorHtml(html);
//   };

//   const modules = {
//     toolbar: [
//       [{ 'header': [1, 2, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
//       ['link'],
//       ['clean'],
//       ['video'],
//       ['image']
//     ],

//   }

//   const formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image', 'video'
//   ]

//   if (typeof window !== "undefined") {
//     return (
//       <div className='!w-full'>
//         <ReactQuill
//           formats={formats}
//           modules={modules}
//           theme="snow"
//           value={value}
//           onChange={setValue}
//         // onChange={handleChange}
//         />
//         <div>
//         </div>
//       </div>
//     );
//   }
// };

// export default MarkdownEditor;



// // import React from "react";
// // import Editor from "react-markdown-editor-lite";
// // import ReactMarkdown from "react-markdown";
// // import "react-markdown-editor-lite/lib/index.css";

// // const MarkdownEditor =({handleEditorChange, value}) => {
// //   // const mdEditor = React.useRef(null);
// //   // const [value, setValue] = React.useState("xxx");

// //   // const handleClick = () => {
// //   //   if (mdEditor.current) {
// //   //     alert(mdEditor.current.getMdValue());
// //   //   }
// //   // };

// //   // const handleEditorChange = ({ html, text }) => {
// //   //   const newValue = text.replace(/\d/g, "");
// //   //   setValue(newValue);
// //   // };

// //   return (
// //     <div className="w-full">
// //       {/* <button onClick={handleClick}>Get value</button> */}
// //       <Editor
// //         // ref={mdEditor}
// //         value={value}
// //         style={{
// //           height: "400px"
// //         }}
// //         onChange={handleEditorChange}
// //         renderHTML={text => <ReactMarkdown source={text} />}
// //       />
// //     </div>
// //   );
// // }


// ..................
// // export default MarkdownEditor;
// // import react, react-markdown-editor-lite, and a markdown parser you like
