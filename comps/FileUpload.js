import React, {useRef, useState } from 'react';
import {VscTriangleLeft} from "react-icons/vsc";
import uploadImage from '@/utils/uploadImage'
import ImageGallery from '@/comps/ImageGallery'
function FileUpload({label,error,value,action,state,id,rows,span,trngle,height,setValidation,edit,seo}) {
const [gallery,setGallery]=useState(false)
  const fileInputRef = useRef(null);
const [uploading,setUploading] = useState('not selected')
const [fileName,setFileName]=useState(edit ? value : '')
const [errorMessage, setErrorMessage] = useState('');
 const handleOpenFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
setValidation()
    if (file && file.size/1024 > 200 && seo==true) { 
      action('');
setFileName('')

      setErrorMessage('File size exceeds the limit (200kb)..!');
    }else if(file && !(file.name).endsWith('.jpg')){
action('');
setFileName('')

      setErrorMessage('File should be jpg..!');
} else {
      action(file);
setFileName(file.name)
      setErrorMessage('');
setUploading('selected')

    }
  };

 const handleUploading=async (e)=>{
e.preventDefault()
setUploading('uploading')
try{

    const response = await uploadImage({fileName,image:value})

    if(response.success){
action(`https://api.katib.in/uploads/${response.name}`)
setFileName(response.name)
alert(response.success)
setUploading('not-selected')
}else{ 
alert(response.error)
setUploading('selected')
}
}
catch(error){
console.log(error)
alert('Uploading failed..!')
setUploading('selected')
}
}

  return (
   <div className="flex flex-col gap-1 relative" >

{error && (
              <span
                style={{left:span, zIndex: "1" }}
                className="block top-0 p-1 text-sm absolute shadow bg-red-500 text-white rounded"
              >
                {error}
              </span>
            )}
            {error && (
              <VscTriangleLeft
                style={{left:trngle,  zIndex: "1" }}
                className="text-red-500 absolute top-1 trngle"
              />
            )}
            <label htmlFor={id}>{label}:</label>
{uploading==='selected' || value!==''  ?(
              <img
                src={uploading==='selected' ?URL.createObjectURL(value):value}
                className="text-red-500 rounded w-full"
                alt="Try with another"
              />
            ):null}
         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    <div className="file-upload">
      <div className="file-upload__input">
        <input
          type="text"
          placeholder="Select file..."
          value={fileName}
          onChange={(e)=>setFileName(e.target.value)}
disabled={state}
disabled={uploading==='selected' ? false : true}
        />
<div className="flex justify-between w-full gap-4">
<button onClick={()=>{
document.body.style.overflow = "hidden";
setGallery(true)
}} className="upload bg-red-500"
disabled={uploading==='uploading' ? true : false}
>Gallery</button>
        <button className={`upload ${uploading==='selected' ? 'bg-green-500' : uploading==='uploading' ? 'bg-zinc-500' : 'bg-blue-500'}`} 
disabled={uploading==='uploading' ? true : false} onClick={uploading === 'selected' ? handleUploading : handleOpenFileDialog}>{uploading==='selected' ? 'Upload' : uploading==="uploading" ? 'uploading' : 'Browse'}</button>
</div>
        <input
          type="file"
          accept="*"
          ref={fileInputRef}
           onChange={handleFileChange}
disabled={state}
        />
      </div>

    </div>
            {gallery && <ImageGallery setGallery={setGallery} action={action} setFileName={setFileName}/>}
          </div>
 
  );
}

export default FileUpload;

