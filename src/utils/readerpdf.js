export const readPDF = (blob) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (error) => {
      reader.abort();
      reject(error);
    };
    reader.readAsDataURL(blob);
  })
};