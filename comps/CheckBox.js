import React from 'react'


function CheckBox({label,value,action,state,id,setValidation}) {

  return (
<div className="flex gap-3">
        <label for={id} className="w-2/6">
              {label}:
            </label>
            <input
checked={value==1 ? "checked" : ''}
              id={id}
              type="checkbox"
              onChange={(e) => {
setValidation()
                if (e.target.checked) {
                  action(1);
                } else {
                  action(0);
                }
              }}
              disabled={state}
            />
          </div>
  )
}

export default CheckBox








 
