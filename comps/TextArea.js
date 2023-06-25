import React from 'react'
import {VscTriangleLeft} from "react-icons/vsc";

function TextArea({label,error,value,action,state,id,rows,span,trngle,height,setValidation,length}) {

  return (

        <div className="flex flex-col gap-1 relative" style={height && {height:'100%'}}>

{error && (
              <span
                style={{left:span, zIndex: "1" }}
                className="block top-0 p-1 text-sm absolute shadow bg-red-500 text-white rounded"
              >
                {error}
              </span>
            )}
            {error && (
              <VscTriangleLeft
                style={{left:trngle,  zIndex: "1" }}
                className="text-red-500 absolute top-1 trngle"
              />
            )}
            <label htmlFor={id}>{label}:</label>
            <textarea
              style={height ? { padding: "4px", resize: "none" , height:'100%'} : { padding: "4px", resize: "none" }}
              id={id}
              rows={rows}
maxLength={length ? length :""}
              className="w-full"
              onChange={(e) => {

                action(e.target.value);
setValidation()
              }}
              disabled={state}

            >
              {value}
            </textarea>
          </div>
 
  )
}

export default TextArea








 
