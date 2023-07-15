import React ,{useState} from 'react'
import Select from 'react-select'

const customStyles = {
  control: (provided,state) => ({
    ...provided,
    border: state.isFocused ? '2px solid #60A5FA' : '2px solid #D1D5DB',
outline:'none',
    borderRadius: '4px',
    padding: '5px',
minHeight: '100px',

 '&:hover': {
      border: state.isFocused ? '2px solid #60A5FA' : '2px solid #D1D5DB',
cursor:'pointer'
    },

  }),
  option: (provided, state) => ({
    ...provided,
zIndex:2,
    backgroundColor: state.isSelected ? 'blue' : 'white',
    color: state.isSelected ? 'white' : 'black',
  }),
};

function MultipleSelect({label,content,value,action,id,setValidation,type}) {
const options=[]
const oldValue=[]
content.map((obj)=>{
options.push({
value:type==="post" ? obj.post_id : obj.cat_id,
label:type==="post" ? obj.post_title : obj.cat_name
})
})

if(value.length!=0){

value.map((obj)=>{
options.map((item)=>{
if(type==='post'){ if(obj.post_id === item.value){
oldValue.push(item)
action(oldValue)
}}else{
 if(obj.cat_id === item.value){
oldValue.push(item)
action(oldValue)
}
}

})
})

}

  const handleSelectChange = (selectedOptions) => {
    action(selectedOptions); 
setValidation()

  };

  return (
   
 <div className="flex flex-col gap-2">
            <label htmlFor={id} className="w-full">
              {label}:
            </label>
     <Select

        options={options}
        isMulti
        id={id}
defaultValue={oldValue}
        onChange={handleSelectChange}
styles={customStyles}
      />

            
    
          </div>
  )
}

export default MultipleSelect








 
