import {request} from './request.js';
const getMember = async function(url,data){
    let baseUrl = "http://localhost:88/api/member"
    console.log(data);
    let result = request({
        url:baseUrl + url,
        data:data,
        method: "POST"
    }).then(resp=>{
       return resp;
    })
    return result;
  };
const getProduct = async function(url,data){
  let baseUrl = "http://localhost:88/api/product"
  console.log(data);
  let result = request({
      url:baseUrl + url,
      data:data,
      method: "POST"
  }).then(resp=>{
     return resp;
  })
  return result;
};

const transmit = async function(url,data){
    let baseUrl = "http://localhost:88/api/member/member"
    let result = request({
        url:baseUrl + url,
        data:data,
        method: "POST"
    }).then(resp=>{
       return resp;
    })
    return result;
};

const address = async function(url,data){
    let baseUrl = "http://localhost:88/api/member/memberreceiveaddress"
    let result = request({
        url:baseUrl + url,
        data:data,
        method: "POST"
    }).then(resp=>{
       return resp;
    })
    return result;
};

const comment = async function(url,data){
    let baseUrl = "http://localhost:88/api/product/comment"
    let result = request({
        url:baseUrl + url,
        data:data,
        method: "POST"
    }).then(resp=>{
       return resp;
    })
    return result;
};

module.exports = {
  transmit:transmit,
  comment:comment,
  address:address,
  getProduct:getProduct,
  getMember:getMember
}