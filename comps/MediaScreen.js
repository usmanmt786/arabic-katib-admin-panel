import React,{useEffect,useState} from 'react'
import {AiFillCloseCircle,AiTwotoneCopy} from 'react-icons/ai'
import {TiTick} from 'react-icons/ti'
import Link from 'next/link'
import deleteUpload from '@/utils/deleteUpload'

function MediaScreen({images,setImages,setAdd}){
const [image,setImage]=useState()

function copyLink(){
    var copyText=document.getElementById('input')
    var tick=document.getElementById('tick')

    copyText.select()
    


    navigator.clipboard.writeText(copyText.value)
    tick.style.display="block"

    setTimeout(function() {
      tick.style.display="none"
      }, 2000);


   
}
const deleteImage=async (name)=>{
try{
setAdd()
const response=await deleteUpload(name)

if(response && response.success){
alert(name +' is deleted')
setImage()
setAdd(false)
}else{
alert("delete failed")

}
}
catch(error){
console.log(error)
alert('delete failed')

}
}

return(
<div className="overflow-hidden flex flex-col">
   <div className='rounded-md shadow-md bg-kred-200 overflow-auto grid grid-cols-1 lg:grid-cols-4 gap-3 p-2 mx-auto my-2 w-full min-h-full'>
  {images.length!==0 && images.map((obj,index)=>(
    
   
      <div key={index} className='post-card flex items-center' onClick={()=>{
document.body.style.overflow = "hidden";
setImage(obj)
}}>
        <img className="flex align-center text-center text-kred-500 rounded-md h-full" src={`https://arabic-api.katib.in/uploads/${obj.name}`}   alt="Image not found..!"/>

   
       </div>
     
    )
 )}


     </div>
     {image && <div style={{background:"rgb(0, 0, 0,.5)"}} className="overflow-auto w-screen h-screen fixed top-0 left-0 right-0 flex items-center z-1 justify-center">
          <div className="bg-white flex flex-col w-10/12 min-h-4/6 md:h-4/6 rounded" >
         <div className="bg-gray-600 p-1 px-2 rounded-t">
                <button className="ml-auto block text-red-500 hover:text-red-600" onClick={()=>{setImage()
document.body.style.overflow = "";
}}><AiFillCloseCircle className="text-2xl"/></button>
            </div>
<div className="flex flex-col md:flex-row h-full rounded-b bg-black gap-1 p-1">
<div className="w-full md:w-2/3  rounded bg-white">

         <img className="h-full w-full" src={`https://arabic-api.katib.in/uploads/${image.name}`} />
           </div>
<div className="w-full  p-3 md:w-1/3 md:h-full  bg-white flex flex-col justify-between">
<div>
<div className="mb-3">Name: <span  className="noto" >{image.name}</span></div>
<div className="mb-3">Size: <span className="noto">{Math.round(image.size/1024)} kbs</span></div>

</div>
<div className="">
<label>Image link:</label> <div className="relative border-2 border-gray-600 rounded flex img-link"> <input id="input" style={{padding:"4px",width:"100%",border:"0"}} type="text" value={`https://arabic-api.katib.in/uploads/${image.name}`} disabled/>
<button title="copy" className="p-1 hover:text-black block ml-auto rounded hidden" onClick={copyLink}><AiTwotoneCopy className="text-kteal-800"/></button>
<TiTick id="tick" className="text-2xl text-gray-600 bg-white rounded-full hidden absolute right-0"/>
</div>
<button className="text-blue-500 hover:text-blue-600 text-sm" onClick={()=>deleteImage(image.name)}>Delete Permenantly</button>
</div>

         
           </div>

         
           </div>
        </div>
      </div>}
</div>
)
}

export default MediaScreen
