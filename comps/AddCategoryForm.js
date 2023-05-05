import React, { useEffect, useState } from "react";

import {catFormValidate} from '@/utils/catFormValidate'
import axios from 'axios'
import Input from '@/comps/Input'
import TextArea from '@/comps/TextArea'
import ValidationButton from '@/comps/ValidationButton'
import {VscTriangleLeft} from "react-icons/vsc";
function AddCategoryForm({data}){
  const [name,setName] = useState("");
  const [parent, setParent] = useState("0");
  const [link, setLink] = useState("");
 const [type, setType] = useState("");

  const [state, setState] = useState("");
  const [errors, setErrors] = useState({});
  const [validation, setValidation] = useState();

  
  const formData = {
  name,parent,link,type
  };
const addCategory=async (formData)=>{
const {data}=await axios.post('/api/categories/add',{...formData})
if(data.status){
return {success:"Category added successfully"}
}
return {error:"Category adding failed, try again..!"}


}
return(
<div className="overflow-hidden flex flex-col">
<div className="bg-gray-200 text-gray-800 w-full h-full overflow-auto p-2 rounded-md shadow-md mx-auto my-2  md:flex gap-0 md:gap-1">
        <div className="w-full  bg-white rounded p-2 flex  justify-center items-center overflow-auto">
<div className="w-full md:w-1/3 flex flex-col gap-1">
<TextArea label="Name" id="name" error={errors.name} value={name} action={setName} state={state} span="3.2rem" trngle="2.6rem"  setValidation={setValidation}/>
 <div className="flex flex-col gap-1 relative" >
<label for="parent">Parent:</label>
<select
              id="parent"
              value={parent}
              style={{ WebkitAppearance: "menulist" }}
              className="w-full h-12 bg-white relative  p-1"
              onChange={(e) => {
                setParent(e.target.value);
setValidation()
              }}
              disabled={state}
            >
              <option value="0">Select</option>
              {data && data.map((obj)=>(<option value={obj.cat_id}>{obj.cat_name}</option>))

}
            </select>
</div>
 <div className="flex flex-col gap-1 relative" >
       {errors.type && (
              <span
                style={{left:"2.9rem",  zIndex: "1" }}
                className="block top-0 p-1 text-sm absolute shadow bg-red-500 text-white rounded"
              >
                {errors.type}
              </span>
            )}
            {errors.type && (
              <VscTriangleLeft
                style={{left:'2.3rem', zIndex: "1" }}
                className="text-red-500 absolute top-1 trngle"
              />
            )}
<label for="type">Type:</label>
<select
              id="type"
              value={type}
              style={{ WebkitAppearance: "menulist" }}
              className="w-full h-12 bg-white relative  p-1"
              onChange={(e) => {
                setType(e.target.value);
setValidation()
              }}
              disabled={state}
            >
              <option value="">Select</option>
              <option value="Post">Post</option>
 <option value="Fiction">Fiction</option>
 <option value="Podcast">Podcast</option>

            </select>
</div>
<TextArea label="link" id="link" error={errors.link} value={link} action={setLink} state={state} span="2.4rem" trngle="1.8rem"  setValidation={setValidation}/>
<ValidationButton state={state} validate={catFormValidate} add={addCategory}   formData={formData} setErrors={setErrors} setState={setState} setValidation={setValidation} validation={validation} redirect="categories"/>
</div>
</div>

      </div>
</div>
)
}

export default AddCategoryForm
