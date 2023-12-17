import React, {useRef, useState } from 'react';
import {VscTriangleLeft} from "react-icons/vsc";
import uploadImage from '@/utils/uploadImage'
import ImageGallery from '@/comps/ImageGallery'
function FileUpload({label,error,value,action,state,id,rows,span,trngle,height,setValidation,edit,seo}) {
const [gallery,setGallery]=useState(false)
  const fileInputRef = useRef(null);
const [status,setStatus] = useState('not-selected')
const [fileName,setFileName]=useState(edit ? value : '')
const [errorMessage, setErrorMessage] = useState('');
 const handleOpenFileDialog = () => {
    fileInputRef.current.click();
  };
const valueChange=(Value,name)=>{
setFileName(name)
action(Value)
}

  const handleFileChange = (e) => {
    const file = e.target.files[0];
setValidation()
    if (file && file.size/1024 > 500 && seo==true) { 
      action('');
setFileName('')

      setErrorMessage('File size exceeds the limit (500kbs)..!');
    }else {
      action(file);
setFileName(file.name)
      setErrorMessage('');
setStatus('selected')

    }
  };

 const handleUploading=async (e)=>{
e.preventDefault()
setStatus('uploading')
try{

    const response = await uploadImage({fileName,image:value})

    if(response?.success){
setStatus('fixed')
action(`https://arabic-api.katib.in/uploads/${response.name}`)
setFileName(response.name)
alert(response.success)

}else{ 
alert(`uploading failed, ${response.error}`)
setStatus('selected')
}
}
catch(error){
console.log(error)
alert('Uploading failed..!')
setStatus('selected')
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
{status==='selected' || value!==''  ?(
              <img
                src={status==='selected' || status==='uploading'?URL.createObjectURL(value):value}
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
disabled={status==='selected' ? false : true}
        />
<div className="flex justify-between w-full gap-4">
<button onClick={()=>{
document.body.style.overflow = "hidden";
setGallery(true)
}} className="upload bg-red-500"
disabled={status==='uploading' ? true : false}
>Gallery</button>
        <button className={`upload bg-blue-500`} 
disabled={status==='uploading' ? true : false} onClick={handleOpenFileDialog}>Browse</button>
</div>
        <input
          type="file"
          accept="image/jpeg image/jpg"
          ref={fileInputRef}
           onChange={handleFileChange}

disabled={state}
        />
{status!=='not-selected' && status!=='fixed' && <button className={`upload bg-green-500 ${status==='uploading' && 'bg-zinc-500'}`}
disabled={status==='uploading' ? true : false} onClick={handleUploading}
>{status==='selected'? 'Upload' :'Uploading'}</button>}
      </div>

    </div>
            {gallery && <ImageGallery setGallery={setGallery} action={valueChange} setStatus={setStatus} seo={seo}/>}
          </div>
 
  );
}

export default FileUpload;

