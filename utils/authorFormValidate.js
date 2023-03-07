
import {validateEmail} from '@/utils/validateEmail'

export const authorFormValidate = (formData,setValidation,setErrors,setState,setCategory) => {
let errors={}
let blankMsg="Field should be filled..!"

   if(formData.name==''){
errors.name=blankMsg
}


if(formData.email!=''){
if(!validateEmail(formData.email)){
errors.email="Choose valid email..!"
}
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
