function addPostDataToBody(req) {

  return new Promise((resolve, reject) => {
    let bodyStr = '';
    let bodyObj = {};

    req.on('data', (data) => {
      bodyStr += data;
    });

    req.on('end', () => {
      const bodyKeyValueArr = bodyStr.split('=');

      bodyKeyValueArr.forEach((el, idx) => {
        if (idx % 2 === 0) {
          bodyObj[el] = bodyKeyValueArr[idx + 1];
        }
      });

      req.body = bodyObj;
      
      resolve(req);
    });
  });

}


module.exports = addPostDataToBody;
