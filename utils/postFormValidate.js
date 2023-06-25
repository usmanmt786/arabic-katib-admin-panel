export const postFormValidate = (formData,setValidation,setErrors,setState,setCategory) => {
let errors={}
let blankMsg="Field should be filled..!"
let selectMsg="Selection mandatory..!"
let uploadMsg="Image should be uploaded..!"
let imageMsg="Image Mandatory..!"
   if(formData.title==''){
errors.title=blankMsg
}
if(formData.body==''){
if(document.getElementById('body').innerHTML!==''){
errors.body="Content should be saved..!"
}else{
errors.body=blankMsg
}
}
if(formData.type==''){
errors.type=selectMsg
}
if(formData.author==''){
errors.author=selectMsg
}
if(formData.thumb===''){
errors.thumb=imageMsg
}else if(typeof(formData.thumb)==='object'){
errors.thumb=uploadMsg
}
if(formData.seoThumb===''){
errors.seoThumb=imageMsg
}else if(typeof(formData.thumb)==='object'){
errors.thumb=uploadMsg
}
if(formData.postLink==''){
errors.postLink=blankMsg
}
if(formData.excerpt==''){
errors.excerpt=blankMsg
}

if(Object.keys(errors).length === 0){
setValidation('success')
setState('')
setErrors({})
}else {
setErrors(errors)
setState('')
setValidation()

}
  }
