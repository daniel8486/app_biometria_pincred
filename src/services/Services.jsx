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

async function consultaProsp(cpf){

  //console.log('meu cpf na api =>',cpf.match(/\d/g).join(""))
  localStorage.setItem('@cpf',cpf.match(/\d/g).join("")); 
  console.log('meu cpf na api consultaProsp =>',localStorage.getItem('@cpf'))

  let data = JSON.stringify({
    "nrInst": "1368",
    "nrAgen": 19,
    "cdConven": 108,
    "nmLogin": "pincred",
    "nrCPFCNPJ": `${localStorage.getItem('@cpf')}`
  });

  let headers = { 
    'Authorization': `Bearer ${localStorage.getItem('@token').slice(1,-1)}`,
    'Content-Type': 'application/json'
  }

  const response = axios.post(URL_API+`/BJ21M05/BJ21SS0501E/consultarProposta`,data,{ headers: headers })
  return response 
  
}

async function consultaCliente(){

  console.log('meu cpf na api clientes =>',localStorage.getItem('@cpf'))

  {if(localStorage.getItem('@cpf') != null && localStorage.getItem('@cpf') != undefined && localStorage.getItem('@cpf') != '')
   {

    let headers = { 
      'Authorization': `Bearer ${localStorage.getItem('@token').slice(1,-1)}`,
      'Content-Type': 'application/json'
    }
  
    const responseCliente = axios.get(URL_API+`/BJ21M05/BJ21SS0502J/buscarCliente?nrClient=${localStorage.getItem('@cpf')}`,{ headers: headers })
    return responseCliente 

   } else {
     console.log('Vazio')
   }
  }

  
}

async function consultarAnexos(){
  
  {if(localStorage.getItem('@nrProsp') != null && localStorage.getItem('@nrProsp') != undefined){
   
    let headers = { 
      'Authorization': `Bearer ${localStorage.getItem('@token').slice(1,-1)}`,
      'Content-Type': 'application/json'
    }
  
    const responseListAnexo = axios.get(URL_API+`/BJ21M05/BJ21SS0501A/consultarAnexos?nrProsp=${localStorage.getItem('@nrProsp')}`,{ headers: headers })
    return responseListAnexo  

   } else {
    console.log('Vazio')
   }
  }
}

async function isLogged(){
  let username = localStorage.getItem('@username')
  let token = localStorage.getItem('@token')
  if(username !== null && username !== undefined && token !== undefined && token !== null){
    return true 
  }

  return false 
}


export {
  login, 
  consultaProsp,
  consultaCliente,
  isLogged,
  consultarAnexos
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