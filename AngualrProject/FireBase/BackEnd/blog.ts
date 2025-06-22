

function logMeIn() {
  scope = "http://www.blogger.com/feeds/";
  var token = google.accounts.user.login(scope);
}

function setupMyService() {
  var myService =
    new google.gdata.blogger.BloggerService('exampleCo-exampleApp-1');
  logMeIn();
  return myService;
}