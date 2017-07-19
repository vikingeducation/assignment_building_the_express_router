'use strict';

module.exports = function parseFormData(body) {
  let jsonObject = {};
  body.split("&").map(ele => ele.split("=")).forEach(ele => jsonObject[ele[0]] = ele[1]);
  return jsonObject;
}
