import Ember from 'ember';


export default Ember.Route.extend({

  beforeModel: function(transition) {

    this.set('i18n.locale', navigator.language || navigator.userLanguage || 'es');

    // Initialize the datapoint
    return this.Data.initialize(transition).then(function(){
      console.log('Your are ready to rock & roll!');
      console.log('-------------------------------');
      console.log('-------------------------------');
      console.log('"self" is defined but never used xD');
      console.log('-------------------------------');
      console.log('-------------------------------');
    }, function(){
        // Abstract: catch error on datapoitn intialization
    });

  },

  actions: {

    signIn: function(provider) {
      this.Data.signIn(provider);
    },

    signOut: function() {
      this.Data.signOut();
    },

    redirectHome: function(){
      this.transitionTo('index');
      // Hide sideNav
      $('.button-collapse').sideNav('hide');
    }
  }
});
