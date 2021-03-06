class LoginCtrl {

  constructor(LoginService, $location) {
    this.user = {};
    this.LoginService = LoginService;
    this.location = $location;
    this.busy = false;
    this.errMsg;
  }

  login(){
    this.LoginService.login(this.user)
    .then(
      (response)=>{
        this.busy = false;
        console.log('afterlogin:', response);
        this.location.path('/events');
      })
    .catch(this.onError.bind(this))
    ;
  }

  GGregister(){
    this.busy = true;
    this.errMsg = undefined;

    this.LoginService.googleAccess(
      (response) => {
        /* success */
        this.busy = false;
        console.info(response);
        this.location.path('/events');
      }, this.onError.bind(this));
  }
  Fregister(){
    this.busy = true;
    this.errMsg = undefined;

    this.LoginService.facebookAccess(
      (response) => {
        /* success */
        this.busy = false;
        console.info(response);
        this.location.path('/events');
      }, this.onError.bind(this));
  }
  onError(err){
    console.warn(err);
    this.busy = false;
    this.errMsg = {};
    this.errMsg[err.code] = err.message;
  }
}

angular.module('app.auth').controller('LoginCtrl', LoginCtrl); 
