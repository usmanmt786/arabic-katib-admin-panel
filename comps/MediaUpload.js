import React, {useRef, useState } from 'react';
import uploadImage from '@/utils/uploadImage'
import {AiFillCloseCircle} from 'react-icons/ai'

function MediaUpload({setAdd}) {


  const fileInputRef = useRef(null);
const [status,setStatus] = useState('not-selected')
const [errorMessage, setErrorMessage] = useState('');
const [image,setImage]=useState('')
const [fileName,setFileName]=useState('')

 const handleOpenFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {

    const file = event.target.files[0];

  
  setImage(file)
setFileName(file.name)

      setErrorMessage('');

setStatus('selected')
    

  };
const handleUploading=async (e)=>{
e.preventDefault()
setStatus('uploading')

try{
    const response = await uploadImage({fileName,image})
    if(response?.success){
 setStatus('fixed')
setImage(`https://arabic-api.katib.in/uploads/${response.name}`)
setFileName(response.name)

alert(response.success)

setAdd(false)
}else {
setStatus('selected')
alert(`uploading failed, ${response.error}`)
}
}catch(error){
console.log(error)
alert('Uploading Failed..!')
setStatus('selected')
}
}
 

  return (
<div style={{background:"rgb(0, 0, 0,.5)"}} className="overflow-auto w-screen h-screen fixed top-0 left-0 right-0 flex items-center z-1 justify-center">

<div className="flex flex-col gap-1 p-5 relative md:p-10 my-1 rounded border-2 border-blue-200 relative bg-zinc-100 w-4/5 md:w-2/3" >
<button className="top-1 right-1 absolute" onClick={()=>setAdd(false)}><AiFillCloseCircle/></button>
{status==='selected' || image!==''  ?(
              <img
                src={status==='selected' || status==='uploading' ?URL.createObjectURL(image):image}
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
          value={fileName}
          onChange={(e)=>{
setFileName(e.target.value)
}}
disabled={status === 'selected' ? false : true }

        />
<div className="flex flex-col justify-between w-full md:w-1/2 gap-1">
<div className="flex flex-col gap-2">
        <button onClick={handleOpenFileDialog} className={`upload bg-blue-500`} 
disabled={status==='uploading' ? true : false}
>Browse</button>
{status!=='not-selected' && status!=='fixed' && <button className={`upload bg-green-500 w-1/2 ${status==='uploading' && 'bg-zinc-500'}`}
disabled={status==='uploading' ? true : false} onClick={handleUploading}
>{status==='selected'? 'Upload' :'Uploading'}</button>}
</div>

</div>
        <input
          type="file"
          accept="image/jpeg image/jpg"
          ref={fileInputRef}
           onChange={handleFileChange}

        />

      </div>


    </div>
            
          </div> 

 </div>
  );
}

export default MediaUpload;

