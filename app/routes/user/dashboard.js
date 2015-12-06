import Base from './../base';

export default Base.extend({
  auth: true,

  actions: {
        didTransition: function() {
          this.Animate.entryPage('.page', 'fadeIn', 'fast');
        },

        willTransition: function(transition){
          this.Animate.exitPage('.page','fadeOut', transition, 'fast');
        }
    }
});
