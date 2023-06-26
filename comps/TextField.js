import React, { useState } from 'react';
import {RiDeleteBin6Fill} from 'react-icons/ri'
import {IoMdAddCircle} from 'react-icons/io'
import AddSpan from '@/comps/AddSpan'

function TextField({item,action,value}) {

const [placeholder,setPlaceholder]=useState(item.value ? false : true)
const [active,setActive]=useState(false)
const [del,setDel]=useState(false)
const [add,setAdd]=useState(false)
const [textValue,setTextValue]=useState(item.value ? item.value : '')


const handleDelete=(e)=>{
e.preventDefault()

action(value.filter((obj,index)=>index!==item.index))


}


  return (
  <div className="cont" onMouseOver={()=>setDel(true)} onMouseLeave={()=>{setDel(false)
setAdd(false)
}}>
<textarea
Placeholder={item.type==='para' ? "Add paragraph..." : "Add sub heading..."}
className={`para ${item.type==='sub' && 'font-bold'}`}
rows="1"
onChange={(e)=>{
e.target.style.height='auto'
e.target.style.height=`${e.target.scrollHeight}px`
setTextValue(e.target.value)
}}
value={textValue}
>


</textarea>{del && <button className="text-zinc-700 absolute right-1 top-1 block" onClick={handleDelete}><RiDeleteBin6Fill/></button>}{del && <button className="text-zinc-700 absolute right-1 bottom-1 block" onClick={()=>setAdd(!add)}><IoMdAddCircle/></button>} {add && del && (<AddSpan index={item.index} action={action} value={value} />)}</div>

 
  );
}

export default TextField;

