function beautify(){
  /*
   * CodeBeautifier.js
   *   read file
   *   detect language
   *   remove whitespace and returns
   *   add returns and whitespaces
   *
   *
   */
  let inpFile = document.getElementById("inpFile");
  
  let txtMain = document.createElement("textarea");
  let inpName = document.createElement("input");
  let inpType = document.createElement("input");
  let file = inpFile.files[0];
  
  let fr = new FileReader();
  fr.readAsText (file);
  
  inpName.value = file.name;
  inpType.value = file.type;
  txtMain.style.width = "100%";
  txtMain.style.height = window.innerHeight / 2 + "px";
  
  [inpName, inpType, txtMain].forEach(x => document.body.appendChild (x));
  
  fr.onload = function (){
    let tmpLines = fr.result.replace(/\s\s+/g, ' ').split(' ');
    let retVal = "";
    let indent = 0;
    
    console.log (tmpLines);
    
    if (inpType.value === "text/html"){
      let strLine = "";
      for (let i=0;i<tmpLines.length;++i)
        strLine += tmpLines[i] + " ";
      for (let i=0;i<strLine.length;++i){
        if (strLine[i] === "<"){
          let tmp = htmlGetTag(strLine.substr(i,strLine.length-i));
          for (let j=0;j<indent;++j)
            retVal += "  ";
          retVal += tmp + "\r\n";
          if (tmp[1] === "/")
            --indent;
          else if(tmp[1] !== "!")
            ++indent;
          console.log(indent);
        }
      }
    }else
      console.log (inpType.value);
    
    txtMain.value = retVal;
    console.log (retVal);
  }
  
}

function htmlGetTag(strFile){
  let retVal = "";
  for (let i=0;i<strFile.length;++i){
    if(i===strFile.length-1)
      return "No end found!";
    retVal += strFile[i];
    if (strFile[i]===">")
      break;
  }
  return retVal;
}