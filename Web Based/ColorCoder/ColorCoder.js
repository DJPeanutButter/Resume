function getFile (inp, encode=true){
  //no return
  let file = inp.files[0];
  let fr = new FileReader();

  if (encode){
    fr.readAsDataURL(file);
    fr.onload = function(){
      let hexCodes = colorCode (fr.result, file['name']);
      let imgMain = document.getElementById ("main-canvas");
      imgMain.width = hexCodes.length;
      imgMain.height = 100;
      let ctx = imgMain.getContext("2d");
      for (let i=0;i<hexCodes.length;++i){
        ctx.fillStyle = hexCodes[i];
        ctx.fillRect (i,0,i+1,100);
      }
    };
  }else{
    fr.readAsDataURL(file);
    fr.onload = function(){
      var imgTmp = new Image();
      imgTmp.src = fr.result;
      imgTmp.onload = function(){
        let tmpDecode = colorDecode(imgTmp);
        let link = document.getElementById("download-link");
        link.download = tmpDecode[0];
        let tmpBlob = new Blob ([tmpDecode[1]],{type: 'image/png'});
        link.href = window.URL.createObjectURL(tmpBlob);
      }
    }
  }
  
  fr.onerror = function(){
    console.log (fr.error);
  };
}

function rbg(r,g,b){
  //returns an HTML color code
  let rR = "0"+r.toString(16);
  let rG = "0"+g.toString(16);
  let rB = "0"+b.toString(16);
  rR = rR.substr(rR.length - 2);
  rG = rG.substr(rG.length - 2);
  rB = rB.substr(rB.length - 2);
  return "#" + rR + rG + rB;
}

function colorCode(strInp, strName){
  //returns an array of color codes;
  let colors    = [[],[],[]];
  let colorsHex = [];
  while(strName.length<256)
    strName += String.fromCharCode (0);
  let wholeStr = strName + strInp;
  for(let i=0;i<wholeStr.length;++i){
    colors[i%3].push(wholeStr.charCodeAt(i));
  }
  if (colors[0].length>colors[1].length)
    colors[1].push(0);
  if (colors[1].length>colors[2].length)
    colors[2].push(0);
  for (let i=0;i<colors[0].length;++i){
    colorsHex.push(rbg(colors[0][i],colors[1][i],colors[2][i]));
  }
  return colorsHex;
}

function colorDecode(imgInp){
  //returns text value of file
  let imgMain = document.createElement ("canvas");
  let ctx = imgMain.getContext("2d");
  imgMain.width = imgInp.width;
  if (imgMain.width < 256)
    return "Image is not of correct length!";
  imgMain.height = imgInp.height;
  ctx.drawImage (imgInp, 0, 0);
  let retVal = "";
  let name = "";
  for (let i=0;i<86;++i){
    let p = ctx.getImageData(i,10,1,1).data;
    if (p[0] === 0)
      break;
    name += String.fromCharCode (p[0]);
    if (i!==86){
      if (p[1] === 0)
        break;
      name += String.fromCharCode (p[1]);
      if (p[2] === 0)
        break;
      name += String.fromCharCode (p[2]);
    }
  }
  name += String.fromCharCode(0); //ensures it's null terminated
  for (let i=85;i<imgMain.width;++i){
    let p = ctx.getImageData(i,10,1,1).data;
    if (i!==85)
      retVal += String.fromCharCode(p[0]);
    retVal += String.fromCharCode(p[1]);
    retVal += String.fromCharCode(p[2]);
  }
  while(retVal[retVal.length-1]===String.fromCharCode(0))
    retVal = retVal.substr(0,retVal.length-1);
  return [name.substring(0,name.length-1), atob(retVal.split("base64,")[1])];
}
