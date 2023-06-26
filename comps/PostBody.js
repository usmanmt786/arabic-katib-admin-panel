import React,{useState} from 'react'
import {VscTriangleLeft} from "react-icons/vsc";
import PostBodyUpload from '@/comps/PostBodyUpload'
import TextField from '@/comps/TextField'
import { BsParagraph } from 'react-icons/bs';
import {BiHeading,BiImageAdd} from 'react-icons/bi';
import {MdOutlineSaveAlt,MdModeEdit} from 'react-icons/md'
import {IoMdCloudDone} from 'react-icons/io'
import {RiDeleteBin6Fill} from 'react-icons/ri'

function PostBody({error,value,action,state,setValidation}) {

const [save,setSave]=useState(value!=='')
const [content,setContent]=useState([])
const [active,setActive]=useState(false)
const [imageUpload,setImageUpload]=useState(true)

const handleSave=(e)=>{
e.preventDefault()
const data=document.getElementById('body').innerHTML
if(data===''){
alert("Post body is empty..!")
}else if(!imageUpload){
alert("Image not selected..!")
}else {
let newValue=''
const body=document.querySelector('#body')
for (let i=0;i<body.children.length;i++){
const child=body.children[i]
const grandChild=child.children[0]


if(content[i].type==='para') {

if(i+1==body.children.length){

newValue=`${newValue}<p>${grandChild.value}</p>`

}else{
newValue=`${newValue}<p>${grandChild.value}</p><br>`

}
}else if(content[i].type==='sub'){

newValue=`${newValue}<p><strong>${grandChild.value}</strong></p>`

}else if(content[i].type==='image'){
if(i+1===body.children.length){
newValue=`${newValue}<figure>${grandChild.innerHTML}</figure>`

}else{

 newValue=`${newValue}<figure>${grandChild.innerHTML}</figure><br>`

}
}
}

action(newValue)
setContent([])
setSave(true)
setValidation()
}

}
const handleEdit=(e)=>{
e.preventDefault()
const body=document.querySelector('#body')
let newContent=[]
for (let i=0;i<body.children.length;i++){
const child=body.children[i]
if(child.tagName==="P"){
if(child.children.length!=0&&child.children[0].tagName==="STRONG"){
newContent.push({type:'sub',value:child.children[0].innerHTML})

}else{
newContent.push({type:'para',value:child.innerHTML})
}
}else if(child.tagName==="FIGURE"){
newContent.push({type:'image',value:child.children[0].currentSrc})

}else if(child.tagName==="BLOCKQUOTE"){
newContent.push({type:'para',value:child.outerHTML})
}

}
setContent(newContent)
action('')
setSave(false)

}
  return (

                  <div className="h-full flex flex-col gap-1 relative ">
            {error && (
              <span
                style={{ left: "5.3rem", zIndex: "1" }}
                className="block top-0 p-1 text-sm absolute shadow bg-red-500 text-white rounded"
              >
                {error}
              </span>
            )}
            {error && (
              <VscTriangleLeft
                style={{ left: "4.7rem", zIndex: "1" }}
                className="text-red-500 absolute top-1 "
              />
            )}
            <label htmlFor="body">Post body:</label>

<div className="p-2 bg-zinc-200 rounded flex justify-end  gap-3">
{!save && 
<div className="flex gap-1">
<button className="controls" onClick={(e)=>{
e.preventDefault()
setContent([...content,{type:'para'}])

}}

>
<BsParagraph/>
</button>
<button className="controls" onClick={(e)=>{
e.preventDefault()
setContent([...content,{type:'sub'}])

}}
>
<BiHeading/>
</button>
<button className="controls" onClick={(e)=>{
e.preventDefault()
setContent([...content,{type:'image'}])

}} 
>
<BiImageAdd/>
</button>

<button className="controls" onClick={(e)=>{
e.preventDefault()
setContent([])
setImageUpload(true)
}}>
<RiDeleteBin6Fill/>
</button></div>}
<button className={`"ml-3 p-2 ${save ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-600'} rounded-full text-white text-lg `} onClick={save ? handleEdit : handleSave}
disabled={state}
>
{save ? <MdModeEdit/> :<MdOutlineSaveAlt/>}
</button>
</div>
            <div
              id="body"
              
              className={`border-2 rounded  focus:z-10 sm:text-sm focus:border-blue-400 border-gray-300 p-2   text-lg noto  w-full h-screen md:h-full  overflow-auto ${active &&  'active' } ${save && 'px-10'}`}
             
              
onClick={()=>setActive(true)}
onMouseLeave={()=>setActive(false)}
              
            >
             {save ? parse(value) : content.length!=0 && content.map((item,index)=>{
if(item.type==='para'){
return (<TextField item={{...item,index:index}}  key={index} action={setContent} value={content} /> )
} else if(item.type==='sub'){
return (<TextField item={{...item,index:index}} key={index} action={setContent} value={content} /> )
}else if(item.type==='image'){
return (<PostBodyUpload item={{...item,index:index}} key={index} action={setContent} value={content} setImageUpload={setImageUpload} />) 
}
})}
            </div>

          </div>
  )
}

export default PostBody







