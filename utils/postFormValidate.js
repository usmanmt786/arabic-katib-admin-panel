export const postFormValidate = (formData,setValidation,setErrors,setState,setCategory) => {
let errors={}
let blankMsg="Field should be filled..!"
let selectMsg="Selection mandatory..!"
   if(formData.title==''){
errors.title=blankMsg
}
if(formData.body==''){
errors.body=blankMsg
}
if(formData.type==''){
errors.type=selectMsg
}
if(formData.author==''){
errors.author=selectMsg
}
if(formData.thumb==''){
errors.thumb=blankMsg
}else if(!formData.thumb.includes('://wp.katib.in/wp-content/uploads/')){
errors.thumb="Add valid link..!"
}else if(!formData.thumb.includes('https')){
errors.thumb="'https' is mandatory..!"
}
if(formData.seoThumb==''){
errors.seoThumb=blankMsg
}else if(!formData.seoThumb.includes('://wp.katib.in/wp-content/uploads/')){
errors.seoThumb="Add valid link..!"
}else if(!formData.seoThumb.includes('https')){
errors.seoThumb="'https' is mandatory..!"
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
}else {
setErrors(errors)
setState('')
setValidation()

}
  }
