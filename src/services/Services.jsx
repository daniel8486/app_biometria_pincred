import { URL_API }from '../api/Api';
import axios from 'axios';
import { Base64 } from 'js-base64';

async function login(user,pass){
     let data = {
       username: user,
       password: pass
     }
     let headers = { 
       'Authorization': `Basic ${Base64.encode(`${user}:${pass}`)}`,
       'Content-Type': 'application/json'
     }
     const response = axios.post(URL_API+`/user`,data,{ headers: headers })
     return response 
}

function isLogged(){
  let username = localStorage.getItem('@username')
  if(username !== null && username !== undefined){
    return true 
  }

  return false 
}


export {
  login
}




    //let config = {
   // method: 'post',
   // maxBodyLength: Infinity,
   // url: `${URL_API}/user`,
   // headers: { 
   //   'Authorization': `Basic ${Base64.encode(`${user}:${pass}`)}`,
   //   'Content-Type': 'application/json'
   // }
   //};
  
   // axios.request(config)
   // .then((response) => {
   //   console.log('resposta na API =>',JSON.stringify(response.data));
   //   console.log('resposta na API =>',JSON.stringify(response.status));
   //   console.log('resposta na API =>',JSON.stringify(response.headers.auth));
   //   return response 
   // })
   // .catch((error) => {
   //   console.log(error);
   // });