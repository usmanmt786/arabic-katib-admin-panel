import React from 'react'
import { VscTriangleDown} from "react-icons/vsc";

function Select({label,error,authors,value,action,state,id,setValidation}) {
const postTypes=[{name:'Post',value:'post'},{name:'News',value:'news'},]
  return (
   
 <div className="flex gap-3 relative">
            <label htmlFor={id} className="w-2/6">
              {label}:
            </label>
            {error && (
              <span
                style={{ top: "-1.5rem", zIndex: "1" }}
                className="block left-0 p-1 text-sm absolute shadow bg-red-500 text-white rounded"
              >
                {error}
              </span>
            )}
            {error&& (
              <VscTriangleDown
                style={{ zIndex: "1", top: "-.1rem" }}
                className="left-1 text-red-500 absolute "
              />
            )}
            <select
              id={id}
              value={value}
              style={{ WebkitAppearance: "menulist" }}
              className="w-4/6 bg-white relative  p-1 cursor-pointer"
              onChange={(e) => {
                action(e.target.value);
setValidation()
              }}
              disabled={state}
            >
              <option value="">Select</option>
              {!authors ? postTypes.map((obj,index)=>(<option value={obj.value} key={index}>{obj.name}</option>))
             : 
authors.map((obj,index) => (
                <option value={obj.author_id} key={index}>{obj.author_name}</option>
              ))
}
            </select>
          </div>
         
  )
}

export default Select








 
