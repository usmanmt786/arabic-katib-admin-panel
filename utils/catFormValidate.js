


export const catFormValidate = (formData,setValidation,setErrors,setState,setCategory) => {
let errors={}
let blankMsg="Field should be filled..!"

   if(formData.name==''){
errors.name=blankMsg
}


if(formData.link==''){
errors.link=blankMsg
}
if(formData.type==''){
errors.type=blankMsg
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
