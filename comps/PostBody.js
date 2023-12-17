import React,{useState,useEffect} from 'react'
import {VscTriangleLeft} from "react-icons/vsc";
import PostBodyUpload from '@/comps/PostBodyUpload'
import TextField from '@/comps/TextField'


import {MdOutlineSaveAlt,MdModeEdit} from 'react-icons/md'

import {RiDeleteBin6Fill} from 'react-icons/ri'
import parse from 'html-react-parser'
import {IoMdAddCircle} from 'react-icons/io'
import AddSpan from '@/comps/AddSpan'
function PostBody({error,value,action,state,setValidation}) {

const [save,setSave]=useState(value!=='')
const [content,setContent]=useState([])
const [active,setActive]=useState(false)
const [imageUpload,setImageUpload]=useState(true)
const [add,setAdd]=useState(false)
const [Span,setSpan]=useState(false)
useEffect(()=>{

if(content.length!=0){
for(let i=0;i<content.length;i++){

if(content[i].type==='image' && !content[i].save){
setImageUpload(false)
break;
}else setImageUpload(true)
}
}
},[content])

const handleSave=(e)=>{
e.preventDefault()
const data=document.getElementById('body').innerHTML
if(data===''){
alert("Post body is empty..!")
}else if(!imageUpload){
alert("Image not selected..!")
}else {
let newValue=''

content.map((obj,index)=>{

if(obj.type==='para') {

if(index+1==content.length){

newValue=`${newValue}<p>${obj.value}</p>`

}else{
newValue=`${newValue}<p>${obj.value}</p><br>`

}
}else if(obj.type==='sub'){

newValue=`${newValue}<p><strong>${obj.value}</strong></p>`

}else if(obj.type==='image'){
if(index+1===content.length){
newValue=`${newValue}<figure><img src=${obj.value} alt=${obj.name}/></figure>`

}else{

 newValue=`${newValue}<figure><img src=${obj.value} alt=${obj.name}/></figure><br>`


}
}

})

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
newContent.push({type:'image',value:child.children[0].currentSrc,name:child.children[0].alt.slice(0,-1),save:true})

}else if(child.tagName==="BLOCKQUOTE"){
newContent.push({type:'para',value:child.outerHTML})
}

}
setContent(newContent)
action('')
setSave(false)
setValidation()
}
  return (

                  <div className="flex-grow flex flex-col gap-1 relative " >
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
              dir="rtl"
              className={`border-2 rounded  focus:z-10 sm:text-sm focus:border-blue-400 border-gray-300 pt-6 p-2   text-lg noto  w-full h-screen md:h-full  overflow-auto ${active &&  'active' } ${save && 'px-10'} relative`}
onMouseOver={()=>setAdd(true)}             
              
onClick={()=>{
setActive(true)
}}
onMouseLeave={()=>{
setActive(false)
setAdd(false)
setSpan(false)
}}
              
            >
{add && !save && <button className="text-zinc-700 text-xl z-10 absolute right-1 top-1 block" onClick={()=>setSpan(!Span)}><IoMdAddCircle/></button>}
{add && Span && (<AddSpan index={-1} action={setContent} value={content} />)}
             {save ? parse(value) : content.length!=0 && content.map((item,index)=>{
if(item.type==='para'){
return (<TextField index={index}  key={index} action={setContent} value={content} /> )
} else if(item.type==='sub'){
return (<TextField index={index}  key={index} action={setContent} value={content} /> )
}else if(item.type==='image'){
return (<PostBodyUpload index={index} key={index} action={setContent} value={content}  />) 
}
})}
            </div>

          </div>
  )
}

export default PostBody







