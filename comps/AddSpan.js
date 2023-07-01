
import { BsParagraph } from 'react-icons/bs';
import {BiHeading,BiImageAdd} from 'react-icons/bi';

function AddSpan({action,value,index}) {

const handleAdd=(item)=>{

const newArray=[...value]

newArray.splice(index+1,0,item)

action(newArray)
}
  return (
    <span className={`add p-1 bg-zinc-100 z-10 rounded absolute ${index==-1 ? 'top-0 right-6' :'bottom-1 right-5'} flex gap-1`}>
<button onClick={(e)=>{
e.preventDefault()
handleAdd({type:"para",value:''})
}}

><BsParagraph/></button>
<button onClick={(e)=>{
e.preventDefault()
handleAdd({type:"sub",value:''})}}

><BiHeading/></button>
<button onClick={(e)=>{
e.preventDefault()
handleAdd({type:"image",value:'',name:'',save:false})}}

><BiImageAdd/></button>

</span>
  )
}

export default AddSpan








 
