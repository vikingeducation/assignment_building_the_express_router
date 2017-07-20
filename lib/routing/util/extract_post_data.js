
const parseFormData = require('./parse_form_data');
// Private method to extract POST
// data from a request
// Calls done() to resolve the wrapping
// promise when finished

module.exports = function _extractPostData(req, done) {
  var body = '';
  req.on('data', (data) => {
    body += data;
  });
  req.on('end', () => {
    req.body = parseFormData(body);
    done();
  });
};
