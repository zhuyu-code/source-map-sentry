import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {useLocation} from 'react-router';
import {getEditor,uploadEditor} from '../../../api/index'
// 引入编辑器组件
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
export default observer(props => {
  const location=useLocation();
  const [editorState, setstdetEditorState] = useState(
    BraftEditor.createEditorState(null)
  );
  const projectId = location.pathname.split("/")[4];
  useEffect(() => {
     getEditor(projectId).then(res=>{
      console.log(res);
      if(res.code===601){
        const htmlContent = "<div>请记录你的解决技巧哦</div>";
        setstdetEditorState(BraftEditor.createEditorState(htmlContent));
      }else if(res.code===600){
        const htmlContent2=res.data[0].editor;
        setstdetEditorState(BraftEditor.createEditorState(htmlContent2));
      }
    })

    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat


  }, []);

  function submitContent() {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = editorState.toHTML();
    console.log(htmlContent);
    uploadEditor(projectId,{htmlContent}).then(res=>{
      console.log(res);
    })
  }

  function handleEditorChange(editorState) {
    setstdetEditorState(editorState);
  }

  return (
    <div className="wiki">
        <BraftEditor
          value={editorState}
          onChange={handleEditorChange}
          onSave={submitContent}
        />
    </div>
  );
});
