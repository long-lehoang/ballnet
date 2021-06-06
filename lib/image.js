export function validateFile(target){
    if(target.files.length === 0)
    return false;
    
    const allowedExtensions =  ['jpg','png','PNG','jpeg'],
          sizeLimit = 1000000; // 1 megabyte
  
    // destructuring file name and size from file object
    const { name:fileName, size:fileSize } = target.files[0];
  
    /*
    * if filename is apple.png, we split the string to get ["apple","png"]
    * then apply the pop() method to return the file extension
    *
    */
    const fileExtension = fileName.split(".").pop();
  
    /* 
      check if the extension of the uploaded file is included 
      in our array of allowed file extensions
    */
    if(!allowedExtensions.includes(fileExtension)){
      alert("file type not allowed");
      target.value = null;
      return false;
    }else if(fileSize > sizeLimit){
      alert("file size too large")
      target.value = null;
      return false;
    }
    return true;
}

