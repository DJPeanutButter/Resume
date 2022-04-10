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
    
    console.log (tmpLines);
    
    if (inpType.value === "text/html")
      for (let i=0, indent=0;i<tmpLines.length;++i){
        while (tmpLines[i][tmpLines[i].length-1] === " ")
          tmpLines[i] = tmpLines[i].substr(0, tmpLines[i].length-1);
        
        if (tmpLines[i].length === 0)
          continue;
        
        for (let j=0;j<indent;++j)
          retVal += "  ";
        
        retVal += "<";
        
        retVal += tmpLines[i];
        
        if (tmpLines[i][tmpLines[i].length - 1] === ">"){
          console.log ("T");
          if (tmpLines[i][0] === "/")
            --indent;
          else
            ++indent;
        }
        
        retVal += "\r\n";
      }
    else
      console.log (inpType.value);
    
    txtMain.value = retVal;
    console.log (retVal);
  }
  
}