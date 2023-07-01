import React, { useState } from 'react';
import {RiDeleteBin6Fill} from 'react-icons/ri'
import {IoMdAddCircle} from 'react-icons/io'
import AddSpan from '@/comps/AddSpan'

function TextField({index,action,value}) {


const [active,setActive]=useState(false)
const [del,setDel]=useState(false)
const [add,setAdd]=useState(false)



const handleDelete=(e)=>{
e.preventDefault()

action(value.filter((obj,Index)=>Index!==index))

}


  return (
  <div className="cont" onMouseOver={()=>setDel(true)} onMouseLeave={()=>{setDel(false)
setAdd(false)
}}>
<textarea
placeholder={value[index].type==='para' ? "Add paragraph..." : "Add sub heading..."}
className={`para ${value[index].type==='sub' && 'font-bold'}`}
rows="1"
onChange={(e)=>{
e.target.style.height='auto'
e.target.style.height=`${e.target.scrollHeight}px`
const newValue=[...value]
newValue[index].value=e.target.value
action(newValue)

}}
value={value[index].value}
>


</textarea>{del && <button className="text-zinc-700 absolute right-1 top-1 block" onClick={handleDelete}><RiDeleteBin6Fill/></button>}{del && <button className="text-zinc-700 absolute right-1 bottom-1 block" onClick={()=>setAdd(!add)}><IoMdAddCircle/></button>} {add && del && (<AddSpan index={index} action={action} value={value} />)}</div>

 
  );
}

export default TextField;

