import React, { useState ,useEffect,useRef} from 'react';
import {RiDeleteBin6Fill} from 'react-icons/ri'
import {IoMdAddCircle} from 'react-icons/io'
import AddSpan from '@/comps/AddSpan'
import { BsParagraph } from 'react-icons/bs';
import {BiHeading} from 'react-icons/bi';

function TextField({index,action,value}) {


const [active,setActive]=useState(false)
const [del,setDel]=useState(false)
const [add,setAdd]=useState(false)
const textAreaRef=useRef(null)

useEffect(()=>{
if(textAreaRef.current){
textAreaRef.current.style.height='auto'
textAreaRef.current.style.height=textAreaRef.current.scrollHeight+'px'
}
},[value])

const handleDelete=(e)=>{
e.preventDefault()

action(value.filter((obj,Index)=>Index!==index))

}
const handleEnterPress=(e)=>{
if(e.key==='Enter'){
e.preventDefault()

const {selectionStart,selectionEnd}=e.target
if(e.target.value.slice(selectionEnd)!==''){
const newValue=[...value]
newValue[index].value=e.target.value.slice(0,selectionStart)
const item={type:value[index].type,value:e.target.value.slice(selectionEnd)}
newValue.splice(index+1,0,item)
action(newValue)
}
}
}

  return (
  <div className="cont" onMouseOver={()=>setDel(true)} onMouseLeave={()=>{setDel(false)
setAdd(false)
}}>
<textarea
ref={textAreaRef}
placeholder={value[index].type==='para' ? "Add paragraph..." : "Add sub heading..."}
className={`para ${value[index].type==='sub' && 'font-bold'}`}
onChange={(e)=>{
const newValue=[...value]
newValue[index].value=e.target.value
action(newValue)

}}
value={value[index].value}
onKeyDown={handleEnterPress}
>


</textarea>
{del && <button className="text-zinc-700 absolute right-1 top-1 block" onClick={handleDelete}><RiDeleteBin6Fill/></button>}

{del && <button className="text-zinc-700 absolute right-6 top-1 block" onClick={(e)=>{
e.preventDefault()
const newValue=[...value]
newValue[index].type=newValue[index].type==='para' ? 'sub' : 'para'
action(newValue)
}}>{value[index].type=='para' ?<BiHeading/>:<BsParagraph/>}</button>}


{del &&
<button className="text-zinc-700 absolute right-1 bottom-1 block" onClick={()=>setAdd(!add)}><IoMdAddCircle/></button>}

{add && del && (<AddSpan index={index} action={action} value={value} />)}</div>

 
  );
}

export default TextField;

