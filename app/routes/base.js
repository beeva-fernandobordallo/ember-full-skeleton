import Ember from 'ember';

export default Ember.Route.extend({

  // BASE ROUTE PROPERTIES: Define the public configuration variables

  auth: false,
  securityLevel: '0',



  beforeModel: function(transition){

    var promise = new Promise(function (resolve, reject) {

      // Check authetication toggle
      if(this.get('auth') === false){
        resolve('Public access');
        return true;
      }

      // Call Data service checkUser method. True or false, depending on if user found.
      this.Data.checkUser().then(function(){
        // Call the security check dataNode in Firebase and provide clearance te enter.
        this.Data.checkSecurityLevel(this.get('securityLevel')).then(function(){
          console.log('SecurityLevel Cleared');
          resolve('Security cleared');
          return true;
        }, function(){
          console.log('User does not have clearance permission');
          resolve('Permission denied');
          this.transitionTo('login');
          return true;
        }.bind(this));
      }.bind(this), function(){
        this.Toast.addToast(this.get('i18n').t('error.notLogged'), 3000);
        this.transitionTo('login');
      }.bind(this));
    }.bind(this));

    return promise;
  },

  actions: {
        didTransition: function() {
          this.Animate.entryPage('.page', 'fadeInRightBig');
        },

        willTransition: function(transition){
          this.Animate.exitPage('.page','fadeOutRightBig', transition, 'fast');
        }
    }

});
