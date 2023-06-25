import React  from 'react'
import {RiCloseFill} from 'react-icons/ri';
import {VscTriangleLeft} from "react-icons/vsc";
function Input({label,error,value,action,state,span,trngle,id,setValidation}) {


  return (
    <div className="flex flex-col gap-1 relative">

            {error && (
              <span
                style={{left:span,  zIndex: "1" }}
                className="block top-0 p-1 text-sm absolute shadow bg-red-500 text-white rounded"
              >
                {error}
              </span>
            )}
            {error && (
              <VscTriangleLeft
                style={{left:trngle, zIndex: "1" }}
                className="text-red-500 absolute top-1 trngle"
              />
            )}
            <label htmlFor={id}>{label}:</label>
            <input
              style={{ padding: "4px" }}
              id={id}
              type="text"
              className="w-full"
              value={value}
              onChange={(e) => {
                action(e.target.value);
setValidation()
              }}
              disabled={state}
            />
 
          </div>
         
  )
}

export default Input








 
