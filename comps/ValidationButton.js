import React,{useState} from 'react'

import {useRouter} from 'next/router'

function ValidationButton({state,validate,add,formData,setErrors,setState,validation, setValidation,redirect}) {

const router=useRouter()
  return (
<div>
 {validation != "success" && validation != "posting" ? (
            <button
              className=" toValidate validation-button"
style={{width:'5rem'}}
              onClick={async () => {
                setValidation("loading");
                setState("disabled");

                await validate(
                  formData,
                  setValidation,
                  setErrors,
                  setState,

                );
              }}
              disbled={state}
            >
              {validation == "loading" ? (
                'loading'
              ) : (
                "Validate"
              )}
            </button>
          ) : (
            <button
              className="  validation-button toPost"
style={{width:'5rem'}}
disabled={state}
              onClick={async () => {
if(formData.category){formData.category=formData.category.toString()}
                setValidation("posting");
                setState("disabled");
                let status = await add(formData);

                if(status.success){
alert(status.success)

router.push(`/${redirect}`)
}else{
alert(status.error)
setValidation();
                setState("");
}
              }}
            >
              {validation == "posting" ? (
                'loading'
              ) : (
                "Upload"
              )}
            </button>
          )}
</div>
  )
}

export default ValidationButton








 
