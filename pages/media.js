import React,{useEffect,useState} from 'react'
import Layout from '@/comps/Layout'
import SideNav from '@/comps/SideNav'
import MediaScreen from '@/comps/MediaScreen'
import getUploads from '@/utils/getUploads'
import MediaUpload from '@/comps/MediaUpload'
export default function MediaPage() {
const [images,setImages]=useState([])
const [add,setAdd]=useState(false)
useEffect(()=>{

const getImages=async ()=>{

try{
const response=await getUploads()
if(response && response.success){
setImages(response.images)

}else{
alert("Images not collected")

}
}
catch(error){
console.log(error)
alert('Fetch failed')

}
}
getImages()
},[add])

  return (
      <Layout title="KATIB - Media">
<section className="flex">
<SideNav activePage={6}/>
<div className="w-full h-screen overflow-hidden p-2 flex flex-col gap-2">
<div className="flex justify-between border-b-2 border-gray-300 p-2 ">
<h1 className="  font-semibold text-3xl ">Media</h1>
<button className="add-button" onClick={()=>{

setAdd(true)
}}>Add Image</button>
</div>


<MediaScreen images={images} setImages={setImages} setAdd={setAdd} />
{add && <MediaUpload setAdd={setAdd}/>


}
</div>
</section>
</Layout>
  
  )
}
MediaPage.auth=true



