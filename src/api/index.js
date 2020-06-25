
const BaseUrl = 'https://lubeatwork.markupdesigns.org/api/';


export const login= (data) => {
    let formdata = new FormData();
    formdata.append("username",data.username);
    formdata.append("password",data.password);
	const url = `${BaseUrl}login`;
	return fetch(url, {
        method: 'POST',
        headers: {
         'Content-Type': 'multipart/form-data',
        },
        body:formdata
	})
	.then(res => res.json())
	.catch(e => console.log(e));
}

export const changePassword= (data) => {
    console.warn(data.token);
    let formdata = new FormData();
    formdata.append("OldPassword",data.opassword);
    formdata.append("Password",data.password);
      formdata.append("ConfirmPassword",data.cpassword);
          formdata.append("id",data.id); 
	const url = `${BaseUrl}changePassword`;
	return fetch(url, {
        method: 'POST',
        headers: {
         'Content-Type': 'multipart/form-data',
          'Apiauthorization':data.token,
        },
        body:formdata
	})
	.then(res => res.json())
	.catch(e => console.log(e));
}

export const submitProfile= (data) => {
    let formdata = new FormData();
    formdata.append("timing",JSON.stringify(data.timing))
    formdata.append("id",data.id);
    formdata.append("companyname",data.cname);
    formdata.append("contactemail",data.cemail);
    formdata.append("contactmobile",data.cmobile);
    formdata.append("tin",data.tin);
    formdata.append("vehicles", parseInt(data.Vehicles));
    formdata.append("address",data.caddress);
    formdata.append("contactperson",data.cperson);
    const newFile1 = {
    uri:data.clogo.uri, type: data.clogo.type,
    name:data.clogo.fileName
  }
  const newFile2 = {
    uri:data.cphoto.uri, type: data.cphoto.type,
    name:data.cphoto.fileName
  }
  
  formdata.append("avatar",newFile1);
   formdata.append("pic",newFile2);
 
	const url = `${BaseUrl}companyRegistration`;
	return fetch(url,{
        method: 'POST',
        headers: {
         'Content-Type': 'multipart/form-data',
         'Accept': 'application/json',
          'Apiauthorization':data.token,
        },
        body:formdata
	})
	.then(res => res.json())
	.catch(e => console.log(e));
}

export const submitEditProfile= (data) => {
    let formdata = new FormData();
    formdata.append("timing",JSON.stringify(data.timing))
    formdata.append("id",data.id);
    formdata.append("companyname",data.cname);
    formdata.append("contactemail",data.cemail);
    formdata.append("contactmobile",data.cmobile);
    formdata.append("tin",data.tin);
    formdata.append("vehicles", parseInt(data.Vehicles));
    formdata.append("address",data.caddress);
    formdata.append("contactperson",data.cperson);
  if(data.clogo.length !=0){
       console.warn(data.clogo.length,data.cphoto.length);
   const newFile1 = {
    uri:data.clogo.uri, type: data.clogo.type,
    name:data.clogo.fileName
  }
  formdata.append("avatar",newFile1);
}
 if(data.cphoto.length !=0){
      const newFile2 = {
    uri:data.cphoto.uri, type: data.cphoto.type,
    name:data.cphoto.fileName
  }
   formdata.append("pic",newFile2);
 }
	const url = `${BaseUrl}editCompanyProfile`;
	return fetch(url,{
        method: 'POST',
        headers: {
         'Content-Type': 'multipart/form-data',
         'Accept': 'application/json',
          'Apiauthorization':data.token,
        },
        body:formdata
	})
	.then(res => res.json())
	.catch(e => console.log(e));
}

export const EditCProfile= (data) => { 
  console.warn("mydara" + JSON.stringify(data))
    let formdata = new FormData();
          formdata.append("id",data.id);
          
	const url = `${BaseUrl}viewCompany`;
	return fetch(url, {
        method: 'POST',
        headers: {
         'Content-Type': 'multipart/form-data',
          'Apiauthorization':data.token,
        },
        body:formdata
	})
	.then(res => res.json())
	.catch(e => console.log(e));
}

export const Logout= (data) => {
  let formdata = new FormData();
  formdata.append("id",data.id); 
const url = `${BaseUrl}logout`;
return fetch(url, {
      method: 'POST',
      headers: {
       'Content-Type': 'multipart/form-data',
        'Apiauthorization':data.token,
      },
      body:formdata
})
.then(res => res.json())
.catch(e => console.log(e));
}

export const ForgotPassword= (data) => {
  let formdata = new FormData();
  formdata.append("Email",data.email); 
const url = `${BaseUrl}forgotPassword`;
return fetch(url, {
      method: 'POST',
      headers: {
       'Content-Type': 'multipart/form-data',
        'Apiauthorization':data.token,
      },
      body:formdata
})
.then(res => res.json())
.catch(e => console.log(e));
}

export const VerifyOtp= (data) => {
  let formdata = new FormData();
  formdata.append("OTP",data.otp); 
  formdata.append("id",data.id); 
const url = `${BaseUrl}verifyOTP`;
return fetch(url, {
      method: 'POST',
      headers: {
       'Content-Type': 'multipart/form-data',
        'Apiauthorization':data.token,
      },
      body:formdata
})
.then(res => res.json())
.catch(e => console.log(e));
}

export const NewPassword= (data) => { 
  let formdata = new FormData();
  formdata.append("Password",data.password);
    formdata.append("ConfirmPassword",data.cpassword);
    formdata.append("OTP",data.otp);
        formdata.append("id",data.id); 
const url = `${BaseUrl}resetForgotPassword`;
return fetch(url, {
      method: 'POST',
      headers: {
       'Content-Type': 'multipart/form-data',
        'Apiauthorization':data.token,
      },
      body:formdata
})
.then(res => res.json())
.catch(e => console.log(e));
}

export const UploadEmp= (data) => { 
  console.warn("njk"+JSON.stringify(data))
  let formdata = new FormData();
  formdata.append('file',{uri:data.url , name: data.name, type: data.type});
   formdata.append("id",data.id); 
const url = `${BaseUrl}importEmployee`;
return fetch(url, {
      method: 'POST',
      headers: {
       'Content-Type': 'multipart/form-data',
        'Apiauthorization':data.token,
      },
      body:formdata
})
.then(res => res.json())
.catch(e => console.log(e));
}

export const GetEmp= (data) => { 
  let formdata = new FormData();
   formdata.append("id",data.id)
   formdata.append("page",data.page)
const url = `${BaseUrl}employeeList`;
return fetch(url, {
      method: 'POST',
      headers: {
       'Content-Type': 'multipart/form-data',
        'Apiauthorization':data.token,
      },
      body:formdata
})
.then(res => res.json())
.catch(e => console.log(e));
}

export const AddEmp= (data) => { 
  let formdata = new FormData();
    formdata.append("id",data.id);
    formdata.append("employeeID",data.eid);
    formdata.append("name",data.ename);
    formdata.append("email",data.eemail);
    formdata.append("mobile",data.emobile);
    formdata.append("password",data.password);
    formdata.append("confirmPassword",data.confirmPassword);
    const newFile1 = {
    uri:data.clogo.uri, type: data.clogo.type,
    name:data.clogo.fileName
  }  
  formdata.append("avatar",newFile1);
	const url = `${BaseUrl}addEmployee`;
	return fetch(url,{
        method: 'POST',
        headers: {
         'Content-Type': 'multipart/form-data',
         'Accept': 'application/json',
          'Apiauthorization':data.token,
        },
        body:formdata
	})
	.then(res => res.json())
	.catch(e => console.log(e));
}


export const SendLink= (data) => { 
  let formdata = new FormData();
   formdata.append("id",data.id)
   formdata.append("eid",data.eid)
const url = `${BaseUrl}sendAppLink`;
return fetch(url, {
      method: 'POST',
      headers: {
       'Content-Type': 'multipart/form-data',
        'Apiauthorization':data.token,
      },
      body:formdata
})
.then(res => res.json())
.catch(e => console.log(e));
}

export const SendToAllLink= (data) => { 
  let formdata = new FormData();
   formdata.append("id",data.id)
const url = `${BaseUrl}sendAllAppLink`;
return fetch(url, {
      method: 'POST',
      headers: {
       'Content-Type': 'multipart/form-data',
        'Apiauthorization':data.token,
      },
      body:formdata
})
.then(res => res.json())
.catch(e => console.log(e));
}
export const BlockEmp= (data) => { 
  let formdata = new FormData();
   formdata.append("id",data.id)
   formdata.append("eid",data.eid)
const url = `${BaseUrl}blockArchive`;
return fetch(url, {
      method: 'POST',
      headers: {
       'Content-Type': 'multipart/form-data',
        'Apiauthorization':data.token,
      },
      body:formdata
})
.then(res => res.json())
.catch(e => console.log(e));
}

export const UnBlockEmp= (data) => { 
  let formdata = new FormData();
   formdata.append("id",data.id)
   formdata.append("eid",data.eid)
const url = `${BaseUrl}unblockArchive`;
return fetch(url, {
      method: 'POST',
      headers: {
       'Content-Type': 'multipart/form-data',
        'Apiauthorization':data.token,
      },
      body:formdata
})
.then(res => res.json())
.catch(e => console.log(e));
}

export const getArchive= (data) => { 
  let formdata = new FormData();
   formdata.append("id",data.id)
   formdata.append("page",data.page)
const url = `${BaseUrl}archiveList`;
return fetch(url, {
      method: 'POST',
      headers: {
       'Content-Type': 'multipart/form-data',
        'Apiauthorization':data.token,
      },
      body:formdata
})
.then(res => res.json())
.catch(e => console.log(e));
}

export const getNotifications= (data) => { 
  let formdata = new FormData();
   formdata.append("id",data.id)
   formdata.append("page",data.page)
const url = `${BaseUrl}notification`;
return fetch(url, {
      method: 'POST',
      headers: {
       'Content-Type': 'multipart/form-data',
        'Apiauthorization':data.token,
      },
      body:formdata
})
.then(res => res.json())
.catch(e => console.log(e));
}

export const EditEmp= (data) => {
 
  let formdata = new FormData();
  formdata.append("id",data.id);
  formdata.append("eid",data.empid);
  formdata.append("name",data.ename);
  formdata.append("email",data.eemail);
  formdata.append("tmobile",data.emobile);
  formdata.append("employeeID",data.eid);
 
if(data.clogo.length !=0){
    
 const newFile1 = {
  uri:data.clogo.uri, type: data.clogo.type,
  name:data.clogo.fileName
}
formdata.append("avatar",newFile1);
}
const url = `${BaseUrl}editEmployee`;
return fetch(url,{
      method: 'POST',
      headers: {
       'Content-Type': 'multipart/form-data',
       'Accept': 'application/json',
        'Apiauthorization':data.token,
      },
      body:formdata
})
.then(res => res.json())
.catch(e => console.log(e));
}

export const StopNotification= (data) => {
  let formdata = new FormData();
  formdata.append("id",data.id); 
const url = `${BaseUrl}pushsetting`;
return fetch(url, {
      method: 'POST',
      headers: {
       'Content-Type': 'multipart/form-data',
        'Apiauthorization':data.token,
      },
      body:formdata
})
.then(res => res.json())
.catch(e => console.log(e));
}

export const getVehicleBrand= (data) => {
const url = `${BaseUrl}vehicleBrandModelList?parent_id=${data}`;
return fetch(url, {
      method: 'GET',
      headers: {
       'Content-Type': 'multipart/form-data',
        'Apiauthorization':data.token,
      },
})
.then(res => res.json())
.catch(e => console.log(e));
}
