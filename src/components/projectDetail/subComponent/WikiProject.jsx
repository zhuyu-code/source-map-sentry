import React,{useState,useEffect} from 'react';
import { observer } from 'mobx-react-lite';
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
export default observer((props)=>{
  const [editorState, setstdetEditorState] = useState(BraftEditor.createEditorState(null));
  useEffect(() => {
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent()
    const htmlContent="<div><a>点击</a>zhuyu</div>"
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat

    setstdetEditorState(BraftEditor.createEditorState(htmlContent))


  }, [])

   function submitContent (){
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = editorState.toHTML()
    console.log(htmlContent)
    // const result = await saveEditorContent(htmlContent)
}

  function handleEditorChange(editorState) {
    setstdetEditorState(editorState);
}
  return (
    <div className="my-component">
    <BraftEditor
        value={editorState}
        onChange={handleEditorChange}
        onSave={submitContent}
    />
</div>
  )
})
