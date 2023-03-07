import React ,{useState} from 'react'
import {RiCloseFill} from 'react-icons/ri';

function MultipleSelect({label,categories,value,action,id,catNames,setCatNames,setValidation}) {


const [cats,setCats]=useState(categories)
const [catDrop,setCatDrop]=useState(false)

console.log(id,catNames)
const catAdd=(obj)=>{

action(cat=>[...cat,obj.cat_id])
setCatNames(cat=>[...cat,{...obj}])
setCats(cats.filter(item=>item.cat_id!==obj.cat_id))
setValidation()
}
const catRemove=(obj)=>{
action(value.filter(item=>item!==obj.cat_id))
setCatNames(catNames.filter(item=>item.cat_name!==obj.cat_name))
setCats(cats=>[obj,...cats])
setValidation()
}
  return (
   
 <div className="flex flex-col gap-3">
            <label for={id} className="w-2/6">
              {label}:
            </label>
            <div className="relative w-full">
             <div
              
              id={id}
              style={{height:'4rem'}}
              className="w-full  p-1 pr-4 overflow-auto border-2 rounded multiple cursor-pointer"
              onClick={() => {
                setCatDrop(!catDrop);

              }}
             
            >
              {catNames && catNames.map((obj)=>(<span className="inline-block w-max p-1 mr-1 mb-1 text-sm rounded" style={{background:"#bdb8b8"}}>{obj.cat_name}<RiCloseFill className="inline ml-3" onClick={()=>{
catRemove(obj)
}}/></span>))}
            </div>
{catDrop && <div style={{zIndex:"2",background:"#bdb8b8",height:"8rem"}} className="overflow-auto p text-gray-600 text-sm noto shadow-md rounded absolute right-0" onMouseLeave={()=>{
setCatDrop(false)

}}>
<ul>
{cats.map((obj,index)=>(<li id={obj.cat_name} className=" p-1 cursor-pointer hover:bg-white" onClick={()=>{
catAdd(obj,index)
}}>{obj.cat_name}</li>))}
</ul>
</div>}
     </div>
          </div>
  )
}

export default MultipleSelect








 
