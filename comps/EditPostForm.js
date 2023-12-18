import React, { useEffect, useState } from "react";
import axios from 'axios'
import { postFormValidate } from "@/utils/postFormValidate";
import {
  VscTriangleLeft,
  VscTriangleDown,
  VscTriangleUp,
} from "react-icons/vsc";
import FileUpload from '@/comps/FileUpload'
import PostBody from '@/comps/PostBody'
import MultipleSelect from '@/comps/MultipleSelect'
import Select from '@/comps/Select'
import Input from '@/comps/Input'
import TextArea from '@/comps/TextArea'
import CheckBox from '@/comps/CheckBox'
import ValidationButton from '@/comps/ValidationButton'

function EditPostForm({post,authors,categories,posts}){


const id=post.post_id;
  const [title, setTitle] = useState(post.post_title);
  const [body, setBody] = useState(post.post_body);
  const [author, setAuthor] = useState(post.post_authorId);
  const [type, setType] = useState(post.post_type);
  const [feature, setFeature] = useState(post.post_is_featured);
  const [thumb, setThumb] = useState(post.post_thumb);
  const [seoThumb, setSeoThumb] = useState(post.post_seo_thumb);
  const [excerpt, setExcerpt] = useState(post.post_excerpt);
  const [postLink, setPostLink] = useState(post.post_link);
  const [podLink, setPodLink] = useState(post.post_podLink);
  const [vidLink, setVidLink] = useState(post.post_vidLink);
  const [tags, setTags] = useState(post.post_tags);
  const [seoTags, setSeoTags] = useState(post.post_seoTags);
  const [credit, setCredit] = useState(post.post_credit);
  const [creditLink, setCreditLink] = useState(post.post_credit_link);
  const [nexts, setNexts] = useState(post.nextPosts);
  const [state, setState] = useState("");
  const [errors, setErrors] = useState({});
  const [category,setCategory]=useState(post.categories)
 
  const [validation, setValidation] = useState();
  
  const formData = {
id,
    title,
    body,
    type,
    author,
    category,
    feature,
    thumb,
    seoThumb,
    postLink,
    excerpt,
    podLink,
    vidLink,
    tags,
    seoTags,
    credit,
    creditLink,
    nexts,
  };

const editPost=async (formData)=>{
const {data}=await axios.post('/api/posts/edit',{...formData})
if(data.status){
return {success:"Post edited successfully"}
}
return {error:"Post editting failed, try again..!"}


}

return(
<div className="overflow-hidden flex flex-col">
 <div className="bg-gray-200 text-gray-600 w-full h-full overflow-auto p-2 rounded-md shadow-md mx-auto my-2  md:flex md:gap-1">
        <div className="flex flex-col overflow-y-scroll  bg-white rounded p-2 shadow-md min-h-full h-auto gap-1 w-full md:w-9/12 overflow-auto">

          <div className="flex flex-col gap-1 relative" dir="rtl">
            {errors.title && (
              <span
                style={{ left: "4.8rem", zIndex: "1" }}
                className="block top-0 p-1 text-sm absolute shadow bg-red-500 text-white rounded"
              >
                {errors.title}
              </span>
            )}
            {errors.title && (
              <VscTriangleLeft
                style={{ left: "4.2rem", zIndex: "1" }}
                className="text-red-500 absolute top-1 "
              />
            )}
            <label htmlFor="title">Post title:</label>
            <textarea
            dir='rtl'
              id="title"
              style={{ resize: "none" }}
              className="  block text-3xl font-semibold naksh w-full  overflow-auto"
              placeholder="Add title"
              onChange={(e) => {
                setTitle(e.target.value);
setValidation()
              }}
              disabled={state}
            >
              {title}
            </textarea>
          </div>
          <PostBody value={body} action={setBody} setValidation={setValidation} state={state} error={errors.body}/>
        </div>
        <div className="bg-white w-full  h-auto min-h-full  md:w-3/12 rounded shadow-md overflow-auto p-2 flex flex-col gap-2">
          <div className="text-2xl">Details</div>
          <hr />
          
         <Select label='Post type' error={errors.type} value={type} action={setType} state={state} id="postType" setValidation={setValidation}/>
         {type!=='news' && <><Select label='Author' error={errors.author} value={author} action={setAuthor} state={state} authors={authors} id="author" setValidation={setValidation}/>
          
<MultipleSelect label='Category' content={categories} value={category} action={setCategory} id="category"  setValidation={setValidation} type="cat"/>
<CheckBox label="Feature" value={feature} action={setFeature} setValidation={setValidation} state={state} id="feature"/></>}
         
<Input label="Post Link" id="postLink" error={errors.postLink} value={postLink} action={setPostLink} state={state} span="5.1rem" trngle="4.4rem" setValidation={setValidation}/>
         <FileUpload label="Thumbnail" id="thumbnail" error={errors.thumb} value={thumb} action={setThumb} state={state} span="5.7rem" trngle="5.1rem"  setValidation={setValidation} edit={true}/>
          <FileUpload label="Seo thumbnail" id="seoThumbnail" error={errors.seoThumb} value={seoThumb} action={setSeoThumb} state={state} span="7.3rem" trngle="6.6rem" setValidation={setValidation} edit={true}/>
         
         <TextArea label="Post excerpt" rows="8" error={errors.excerpt} span="6.5rem" trngle="5.8rem" state={state} value={excerpt} action={setExcerpt} id="excerpt" setValidation={setValidation} length="255"/>
          
          
  <Input label="Podcast link" id="podLink" value={podLink} action={setPodLink} state={state} setValidation={setValidation}/>
            <Input label="Video link" id="vidLink" value={vidLink} action={setVidLink} state={state} setValidation={setValidation}/>
                   <TextArea label="Post tags" rows="3" state={state} value={tags} action={setTags} id="tags" setValidation={setValidation}/>
                       <TextArea label="Post seo tags" rows="3" state={state} value={seoTags} action={setSeoTags} id="seoTags" setValidation={setValidation}/>
              <TextArea label="Post credit" rows="3" state={state} value={credit} action={setCredit} id="credit" setValidation={setValidation}/>
<TextArea label="Post Credit Link" rows="3" state={state} value={creditLink} action={setCreditLink} id="creditLink" setValidation={setValidation}/>
<MultipleSelect label='Next posts' content={posts} value={nexts} action={setNexts} id="nexts"  setValidation={setValidation} type="post"/>

<ValidationButton state={state} validate={postFormValidate} add={editPost}    formData={formData} setErrors={setErrors} setState={setState} setValidation={setValidation} validation={validation} redirect="posts" post="true"/>
          
            
        </div>
      </div>
</div>
)
}
export default EditPostForm
