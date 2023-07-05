


const deleteUpload = async(name)=>{
    const finalUrl = "https://api.katib.in/deleteUpload.php";
     
const formData = new FormData();
    formData.append('api', "408d2cb02089a93e8a3df817ffb521415e5a6b5d");
formData.append('name',name)
   
    const res = await fetch(finalUrl, {
      method: 'POST',
      body: formData,
    }).then(res=>res.json()).catch(err=>console.log(err));
        return res;
    }

    export default deleteUpload;
