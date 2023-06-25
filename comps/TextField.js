import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable'
import {RiDeleteBin6Fill} from 'react-icons/ri'
import {IoMdAddCircle} from 'react-icons/io'
import AddSpan from '@/comps/AddSpan'
import parse from 'html-react-parser'
function TextField({item,action,value}) {

const [placeholder,setPlaceholder]=useState(item.value ? false : true)
const [active,setActive]=useState(false)
const [del,setDel]=useState(false)
const [add,setAdd]=useState(false)

const handleBlur=(e)=>{
setActive(false)
const content=e.target.innerHTML
if(content===''){
setPlaceholder(true)

}else{
setPlaceholder(false)

}
}
const handleFocus=()=>{
setPlaceholder(false)
setActive(true)
}
const handleInput=(e)=>{

if(e.target.innerHTML==="&nbsp;" || e.target.innerHTML==="<br>"){
e.target.innerHTML=""

}
}
const handleDelete=(e)=>{
e.preventDefault()

action(value.filter((obj,index)=>index!==item.index))


}


  return (
   item.type==='para' ? (<div className="cont" onMouseOver={()=>setDel(true)} onMouseLeave={()=>{setDel(false)
setAdd(false)
}}>
{del && <button className="text-zinc-700 absolute right-1 top-1 block" onClick={handleDelete}><RiDeleteBin6Fill/></button>}
<p contentEditable="true" onBlur={handleBlur}
onFocus={handleFocus}
onInput={handleInput}

className={`para ${placeholder && 'placeholder'} ${!active ? 'active' : ''}`}
>
{item.value && parse(item.value) }
</p>{del && <button className="text-zinc-700 absolute right-1 bottom-1 block" onClick={()=>setAdd(!add)}><IoMdAddCircle/></button>} {add && del && (<AddSpan index={item.index} action={action} value={value} />)}</div>) :  (<div className="cont" onMouseOver={()=>setDel(true)} onMouseLeave={()=>{setDel(false)
setAdd(false)

}}>
{del && <button className="text-zinc-700 absolute right-1 top-1 block" onClick={handleDelete}><RiDeleteBin6Fill/></button>}
<strong contentEditable="true"  onBlur={handleBlur}
onFocus={handleFocus}
onInput={handleInput}

className={`strong ${placeholder && 'placeholder'} ${!active ? 'active' : ''}`}
>
{item.value && parse(item.value)}
</strong>{del && <button className="text-zinc-700 absolute right-1 bottom-1 block" onClick={()=>setAdd(!add)}><IoMdAddCircle/></button>}{add && del && (<AddSpan index={item.index} action={action} value={value} />)}</div>)

 
  );
}

export default TextField;

