import React, {useRef, useState } from 'react';
import {RiDeleteBin6Fill} from 'react-icons/ri'
import uploadImage from '@/utils/uploadImage'
import AddSpan from '@/comps/AddSpan'
import {IoMdAddCircle} from 'react-icons/io'
import {MdModeEdit} from 'react-icons/md'
import ImageGallery from '@/comps/ImageGallery'
import parse from 'html-react-parser'
function PostBodyUpload({item,setImageUpload,value,action}) {

const [add,setAdd]=useState(false)
  const fileInputRef = useRef(null);
const [del,setDel]=useState(false)
const [uploading,setUploading] = useState('not selected')
const [image,setImage]=useState(item.value ? item.value :'')
const [fileName,setFileName]=useState(item.value ? item.value :'')
const [save,setSave]=useState(item.value ? true : false)
const [errorMessage, setErrorMessage] = useState('');
const [gallery,setGallery]=useState(false)

 const handleOpenFileDialog = () => {
    fileInputRef.current.click();
  };
setImageUpload(!save ? false : true)
  const handleFileChange = (event) => {

    const file = event.target.files[0];

    if(!(file.name).endsWith('.jpg')){
setImage('');
setFileName('')

      setErrorMessage('File should be jpg..!');
} else {
      setImage(file);
setFileName(file.name)
      setErrorMessage('');

setUploading('selected')
    }

  };
const handleUploading=async (e)=>{
e.preventDefault()
setUploading('uploading')

try{
    const response = await uploadImage({fileName,image:image})

    if(response.success){
setImage(`https://api.katib.in/uploads/${response.name}`)
setFileName(response.name)
alert(response.success)
setUploading('not-selected')
}else {
setUploading('selected')
alert(response.error)
}
}catch(error){
console.log(error)
alert('Uploading Failed..!')
setUploading('selected')
}
}
 
const handleDelete=(e)=>{
e.preventDefault()

setImageUpload(true)
action(value.filter((obj,index)=>index!==item.index))

}
  return (
!save ? <><div className="flex flex-col gap-1 relative p-5 md:p-10 my-1 rounded border-2 border-blue-200 relative bg-zinc-100" onMouseOver={()=>setDel(true)} onMouseOut={()=>setDel(false)}>
{del &&<button className="text-zinc-700 absolute right-1 top-1 cursor-pointer" onClick={handleDelete}><RiDeleteBin6Fill/></button>}
{uploading==='selected' || image!==''  ?(
              <img
                src={uploading==='selected' ?URL.createObjectURL(image):image}
                className="text-red-500 rounded w-full md:w-1/2 block m-auto"
                alt="Try with another"
              />
            ): null}

         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    <div className="w-full m-auto">
      <div className="file-upload__input ">
        <input
          type="text"
          placeholder="Select file..."
          value={fileName}
          onChange={(e)=>setFileName(e.target.value)}
disabled={uploading === 'selected' ? false : true }

        />
<div className="flex flex-col justify-between w-full md:w-1/2 gap-1">
<div className="flex gap-4">
<button onClick={()=>{
document.body.style.overflow = "hidden";
setGallery(true)
}} className="upload bg-red-500"
disabled={uploading==='uploading' ? true : false}
>Gallery</button>
        <button onClick={uploading === 'selected' ? handleUploading : handleOpenFileDialog} className={`upload ${uploading==='selected' ? 'bg-green-500' : uploading==='uploading' ? 'bg-zinc-500' : 'bg-blue-500'}`} 
disabled={uploading==='uploading' ? true : false}
>{uploading==='selected' ? 'Upload' : uploading==="uploading" ? 'uploading' : 'Browse'}</button>
</div>
{typeof(image)==='string' && image!=='' && <button className="upload bg-green-500"
onClick={()=>{
setSave(true)
setImageUpload(true)
}}>
Save
</button>}
</div>
        <input
          type="file"
          accept="*"
          ref={fileInputRef}
           onChange={handleFileChange}

        />
      </div>


    </div>
            
          </div> 
{gallery && <ImageGallery setGallery={setGallery} action={setImage} setFileName={setFileName}/>}
</>:
<div>
<figure onMouseOver={()=>setDel(true)} onMouseLeave={()=>{
setDel(false)
setAdd(false)
}}
className="figure"
>

{del &&<button className="text-zinc-700 absolute right-1 top-1 cursor-pointer" onClick={handleDelete}><RiDeleteBin6Fill/></button>}
{del &&<button className="text-zinc-700 absolute right-6 top-1 cursor-pointer" onClick={()=>setSave(false)}><MdModeEdit/></button>}
<img src={image} alt={fileName}/>
 { del && <button className="text-zinc-700 absolute right-1 bottom-1 block" onClick={()=>setAdd(!add)}><IoMdAddCircle/></button>}
{add && del && (<AddSpan index={item.index} action={action} value={value}/> )}
</figure>
</div>

 
  );
}

export default PostBodyUpload;

