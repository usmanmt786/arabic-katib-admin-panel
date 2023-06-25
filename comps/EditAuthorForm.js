import React, { useEffect, useState } from "react";

import {authorFormValidate} from '@/utils/authorFormValidate'
import axios from 'axios'
import Input from '@/comps/Input'
import TextArea from '@/comps/TextArea'
import ValidationButton from '@/comps/ValidationButton'
function EditAuthorForm({author}){

 const id=author.author_id
  const [name,setName] = useState(author.author_name);
  const [bio, setBio] = useState(author.author_bio);
  const [email, setEmail] = useState(author.author_email);

  const [socialLink, setSocialLink] = useState(author.author_social_link);
  const [image, setImage] = useState(author.author_image);
  const [books,setBooks] = useState(author.author_books);
  const [works,setWorks] = useState(author.author_works);
  const [validation, setValidation] = useState();

  const [state, setState] = useState("");
  const [errors, setErrors] = useState({});
  const formData = {
  id,name,bio,email,image,socialLink,books,works
  };

const editAuthor=async (formData)=>{
const {data}=await axios.post('/api/authors/edit',{...formData})
if(data.status){
return {success:"Author edited successfully"}
}
return {error:"Author editing failed, try again..!"}


}

return(
<div className="overflow-hidden flex flex-col">
<div className="bg-gray-200 text-gray-800 w-full h-full overflow-auto p-2 rounded-md shadow-md mx-auto my-2  md:flex gap-0 md:gap-1">
        <div className="w-full md:w-1/3 bg-white rounded p-2 flex flex-col justify-between overflow-auto">
<TextArea label="Name" id="name" error={errors.name} value={name} action={setName} state={state} span="3.2rem" trngle="2.6rem"  setValidation={setValidation}/>
<TextArea label="Email" id="email" error={errors.email} value={email} action={setEmail} state={state} span="3.2rem" trngle="2.6rem"  setValidation={setValidation}/>
<Input label="Image" id="image"  value={image} action={setImage} state={state} span="7.3rem" setValidation={setValidation}/>
  <TextArea label="Social links" rows="2" state={state} value={socialLink} action={setSocialLink} id="social" setValidation={setValidation}/>
 <TextArea label="Books" rows="2" state={state} value={books} action={setBooks} id="booksl" setValidation={setValidation}/>
 <TextArea label="Works" rows="2" state={state} value={works} action={setWorks} id="works" setValidation={setValidation}/>
</div>
<div className="w-full md:w-2/3 bg-white rounded p-2 flex flex-col gap-1">
 <TextArea height='true' rows="8" label="Bio"  state={state} value={bio} action={setBio} id="bio" setValidation={setValidation}/>
<ValidationButton state={state} validate={authorFormValidate} add={editAuthor}   formData={formData} setErrors={setErrors} setState={setState} setValidation={setValidation} validation={validation} redirect="authors"/>
</div>
      </div>

</div>
)
}

export default EditAuthorForm
