import Ember from 'ember';

export default Ember.Controller.extend({

  gasto: {
    tipo: '',
    importe: '',
    descripcion: '',
    sistema: '',
    fecha: ''
  },
  tempFecha: '',

  categorias: '',

  sistemas: '',

  init: function(){
      this._resetDate();

      var catsLS = localStorage.getItem('categorias');
      this.set('categorias', JSON.parse(catsLS));

      var sitsLS = localStorage.getItem('sistemas');
      this.set('sistemas', JSON.parse(sitsLS));
  },

  _resetDate: function () {
    var currentTime = new Date();
    var tempYear = currentTime.getFullYear();
    var tempMonth = currentTime.getMonth() + 1;
    if(tempMonth <10){
      tempMonth = '0' + tempMonth;
    }
    var tempDay = currentTime.getDate()+1;
    if(tempDay < 10){
      tempDay = '0' + tempDay;
    }
    var currentString = tempYear + '-' + tempMonth + '-' + tempDay;
    this.set('tempFecha', currentString);
  },

  actions: {
    guardarGasto: function(){

      // Check Payment system
      if(this.get('gasto.sistema') === ''){
        this.set('gasto.sistema', 'Cash');
      }

      // Save Date
      var tempDateString = this.get('tempFecha');
      var tempDate = new Date(tempDateString);
      tempDate = tempDate.getTime();
      this.set('gasto.fecha', tempDate);

      // Save
      this.Data.get('userRef').child('datos').child('gastos').push(this.get('gasto'));

      // Reset
      this.set('gasto', {
        tipo: '',
        importe: '',
        descripcion: '',
        sistema: '',
        fecha: ''
      });
      this._resetDate();

      // Transition and toast
      this.transitionToRoute('user.dashboard');
      this.Toast.addToast('Gasto registrado', 1500);
    }
  }
});
