import React, {useRef, useState } from 'react';
import {RiDeleteBin6Fill} from 'react-icons/ri'
import uploadImage from '@/utils/uploadImage'
import AddSpan from '@/comps/AddSpan'
import {IoMdAddCircle} from 'react-icons/io'
import {MdModeEdit} from 'react-icons/md'
import ImageGallery from '@/comps/ImageGallery'
function PostBodyUpload({index,value,action}) {

const [add,setAdd]=useState(false)
  const fileInputRef = useRef(null);
const [del,setDel]=useState(false)
const [uploading,setUploading] = useState('not selected')
const [errorMessage, setErrorMessage] = useState('');
const [gallery,setGallery]=useState(false)

const valueChange=(Value,name)=>{
const newValue=[...value]
newValue[index].value=Value
newValue[index].name=name
action(newValue)
}
 const handleOpenFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {

    const file = event.target.files[0];

    if(!(file.name).endsWith('.jpg')){
const newValue=[...value]
newValue[index].value=''
newValue[index].name=''
action(newValue)

      setErrorMessage('File should be jpg..!');
} else {
  valueChange(file,file.name)

      setErrorMessage('');

setUploading('selected')
    }

  };
const handleUploading=async (e)=>{
e.preventDefault()
setUploading('uploading')

try{
    const response = await uploadImage({fileName:value[index].name,image:value[index].value})

    if(response.success){
 
valueChange(`https://api.katib.in/uploads/${response.name}`,response.name)

alert(response.success)
setUploading('not-selected')
}else {
setUploading('selected')
alert(`uploading failed, ${response.error}`)
}
}catch(error){
console.log(error)
alert('Uploading Failed..!')
setUploading('selected')
}
}
 
const handleDelete=(e)=>{
e.preventDefault()
action(value.filter((obj,Index)=>Index!==index))
}

  return (
!value[index].save ? <><div className="flex flex-col gap-1 relative p-5 md:p-10 my-1 rounded border-2 border-blue-200 relative bg-zinc-100" onMouseOver={()=>setDel(true)} onMouseOut={()=>setDel(false)}>
{del &&<button className="text-zinc-700 absolute right-1 top-1 cursor-pointer" onClick={handleDelete}><RiDeleteBin6Fill/></button>}
{uploading==='selected' || value[index].value!==''  ?(
              <img
                src={uploading==='selected' ?URL.createObjectURL(value[index].value):value[index].value}
                className="text-red-500 rounded w-full md:w-3/4 block m-auto"
                alt="Try with another"
              />
            ): null}

         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    <div className="md:w-3/4 w-full m-auto">
      <div className="file-upload__input ">
        <input
          type="text"
          placeholder="Select file..."
          value={value[index].name}
          onChange={(e)=>{
const newValue=[...value]
newValue[index].name=e.target.value
action(newValue)
}}
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
{typeof(value[index].value)==='string' && value[index].value!=='' && <button className="upload bg-green-500"
onClick={()=>{
const newValue=[...value]
newValue[index].save=true
action(newValue)
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
{gallery && <ImageGallery setGallery={setGallery} action={valueChange} />}
</>:
<div>
<figure onMouseOver={()=>setDel(true)} onMouseLeave={()=>{
setDel(false)
setAdd(false)
}}
className="figure"
>
<img src={value[index].value} alt={value[index].name}/>
{del &&<button className="text-zinc-700 absolute right-1 top-1 cursor-pointer" onClick={handleDelete}><RiDeleteBin6Fill/></button>}
{del &&<button className="text-zinc-700 absolute right-6 top-1 cursor-pointer" onClick={()=>{
const newValue=[...value]
newValue[index].save=false
action(newValue)
}}><MdModeEdit/></button>}
 { del && <button className="text-zinc-700 absolute right-1 bottom-1 block" onClick={()=>setAdd(!add)}><IoMdAddCircle/></button>}
{add && del && (<AddSpan index={item.index} action={action} value={value}/> )}
</figure>
</div>

 
  );
}

export default PostBodyUpload;

