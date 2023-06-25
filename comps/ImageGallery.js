⁰import React, {useState,useEffect} from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'
import getUploads from '@/utils/getUploads'
import {TiTick} from 'react-icons/ti'

function ImageGallery({setGallery,action,setFileName}){

const [images,setImages]=useState([])
const [loading,setLoading]=useState(false)
const [selected,setSelected]=useState({})

useEffect(()=>{
const getImages=async ()=>{
setLoading(true)
try{
const response=await getUploads()
if(response && response.success){
setImages(response.images)
setLoading(false)
}else{
alert("Image not collected")
setLoading(false)
}
}
catch(error){
console.log(error)
alert('Fetch failed')
setLoading(false)
}
}
getImages()
},[])

return(
<div style={{background:"rgb(0, 0, 0,.5)"}} className="overflow-auto w-full h-screen fixed top-0 left-0 right-0  flex items-center z-10 justify-center">
<div className="w-11/12  md:w-3/5 bg-zinc-100 rounded  h-4/6 flex flex-col">
<div className="rounded-t p-1 bg-zinc-200 flex justify-between">
<h4 className="text-xl text-zinc-500 rubik font-semibold">Image Gallery</h4>
<AiFillCloseCircle className="text-2xl text-zinc-500 hover:text-zinc-600 cursor-pointer active:text-zinc-600" onClick={()=>{
document.body.style.overflow="scroll"
setGallery(false)
}}/>
</div>
<div className="flex flex-col md:flex-row py-1 gap-1 h-full  overflow-hidden">
<div className={`md:w-3/4 w-full bg-zinc-200 rounded-b overflow-auto  p-2 h-full ${loading ? 'flex text-lg rubik justify-center items-center' : 'grid grid-cols-1 md:grid-cols-4 gap-2'}`}>
{loading ? 'Loading...' : images.map((image,index)=>(
<div className={`post-card ${selected.name===image.name && 'relative p-1 bg-blue-400 rounded'}`} onClick={()=>{
setSelected(image)
}}>
{selected.name===image.name&&<TiTick className="bg-blue-400 text-white rounded-full absolute top-0 right-0"/>}
<img className="flex align-center text-center text-kred-500 h-full w-full"src={`http://localhost:80/katib/uploads/${image.name}`} alt="Image not found..!"/>
</div>
))}
</div>
<div className="md:w-1/4 w-full bg-zinc-200 rounded-b md:h-full h-1/4 flex flex-col justify-between items-center p-2">
{Object.keys(selected).length === 0 ? <h3 className="text-lg text-center py-5 rubik text-zinc-400">Select Image
</h3>:<div className="rubik font-semibold flex flex-col gap-2">
<div className="flex gap-1">
<h4>Name:</h4>
<h4 className="whitespace-normal break-all">{selected.name}</h4>
</div>
<div className="flex gap-1">
<h4>Size:</h4>
<h4>{Math.round(selected.size/1024)} kbs</h4>
</div>
</div>}

<button className={`px-3 py-2 text-zinc-100 rounded rubik font-semibold w-1/2 ${Object.keys(selected).length !== 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-zinc-600'}`}
disabled={Object.keys(selected).length !== 0 ? false :true}
onClick={()=>{
action(`https://api.katib.in/uploads/${selected.name}`)
setFileName(selected.name)
setGallery(false)
}}
>Confirm</button>
</div>
</div>
</div>
         
      </div>
)
}

export default ImageGallery
