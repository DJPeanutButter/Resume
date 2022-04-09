var inpFName, inpLName,
    inpPhone, inpEmail, inpPass, tblPassVal,
    pLower, pUpper, pNums, pLen;

window.onload = function (){
  inpFName    = document.getElementById("fName");
  inpLName    = document.getElementById("lName");
  inpPhone    = document.getElementById("phone");
  inpEmail    = document.getElementById("email");
  inpPass     = document.getElementById("pass");
  tblPassVal  = document.getElementById("password-validation");
  pLower      = document.getElementById("pass-lower");
  pUpper      = document.getElementById("pass-upper");
  pNums       = document.getElementById("pass-nums");
  pLen        = document.getElementById("pass-len");
  
  inpPass.onfocus = function (){
    tblPassVal.classList.remove("hidden");
  }
  
  inpPass.onblur = function (){
    tblPassVal.classList.add("hidden");
  }
  
  inpPass.onkeyup = function (){
    if (inpPass.value.match(/[a-z]/g)){
      pLower.classList.remove("invalid");
      pLower.classList.add("valid");
    }else{
      pLower.classList.remove("valid");
      pLower.classList.add("invalid");
    }
    if (inpPass.value.match(/[A-Z]/g)){
      pUpper.classList.remove("invalid");
      pUpper.classList.add("valid");
    }else{
      pUpper.classList.remove("valid");
      pUpper.classList.add("invalid");
    }
    if (inpPass.value.match(/[0-9]/)){
      pNums.classList.remove("invalid");
      pNums.classList.add("valid");
    }else{
      pNums.classList.remove("valid");
      pNums.classList.add("invalid");
    }
    if (inpPass.value.length >= 8){
      pLen.classList.remove("invalid");
      pLen.classList.add("valid");
    }else{
      pLen.classList.remove("valid");
      pLen.classList.add("invalid");
    }
  }
}

function validate(objField=null){
  //Client Side Handling
  let arrVars = [inpFName, inpLName, inpPhone, inpEmail, inpPass];
  arrVars.forEach(x => x.classList.remove("error"));
  let fError = false;
  if (objField === null || objField === inpFName)
    if (inpFName.value.length < 1){
      inpFName.classList.add("error");
      fError = true;
    }
  if (objField === null || objField === inpLName)
    if (inpLName.value.length < 1){
      inpLName.classList.add("error");
      fError = true;
    }
  if (objField === null || objField === inpPhone)
    if (!inpPhone.value.match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)){
      inpPhone.classList.add("error");
      fError = true;
    }
  if (objField === null || objField === inpEmail)
    if (!inpEmail.value.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)){
      inpEmail.classList.add("error");
      fError = true;
    }
  if (objField === null || objField === inpPass)
    if (!(inpPass.value.match(/[a-z]/g) && 
          inpPass.value.match(/[A-Z]/g) &&
          inpPass.value.match(/[0-9]/)  &&
          inpPass.value.length >= 8)){
    
      fError = true;
      inpPass.classList.add("error");
          }
  return !fError;
}