import Base from './../base';

export default Base.extend({
  auth: true,

  model: function(){
    var promise = new Promise(function(resolve, reject){

      var currentDate = new Date();
      console.log(currentDate);
      var year = currentDate.getFullYear();
      var month = currentDate.getMonth() + 1;
      var tempString = year + '-' + month + '-01';

      var firstDay = new Date(tempString);
      var firstDayMillis = firstDay.getTime();

      var promiseGastos = new Promise(function(resolve){
        this.Data.get('userRef')
                .child('datos')
                .child('gastos')
                .orderByChild('fecha')
                .startAt(firstDayMillis)
                .once('value', function(snap){
          var fullData = snap.val();
          if(fullData === null){
            resolve({data: false});
            return;
          }

          var gastos = this.Data.objectToArray(fullData);

          var totalGastos = 0;

          if(gastos){
            for (var i = 0; i < gastos.length; i++) {
              totalGastos += Number(gastos[i].importe);
            }
          }
          resolve({totalGastos: totalGastos});
        }.bind(this), function(err){
          console.log(err);
          return false;
        }.bind(this));
      }.bind(this));

      var promiseIngresos = new Promise(function(resolve){
        this.Data.get('userRef')
                 .child('datos')
                 .child('ingresos')
                 .orderByChild('fecha')
                 .startAt(firstDayMillis)
                 .once('value', function(snap){
          var fullData = snap.val();
          if(fullData === null){
            resolve({data: false});
            return;
          }

          var ingresos = this.Data.objectToArray(fullData);

          var totalIngresos = 0;

          if(ingresos){
            for (var i = 0; i < ingresos.length; i++) {
              totalIngresos += Number(ingresos[i].importe);
            }
          }
          resolve({totalIngresos: totalIngresos});
        }.bind(this), function(err){
          console.log(err);
          return false;
        }.bind(this));
      }.bind(this));

      Ember.RSVP.allSettled([promiseGastos, promiseIngresos]).then(function(data){
        console.log(data);
        var finalData = {totalGastos: data[0].value.totalGastos ? data[0].value.totalGastos : 0, totalIngresos: data[1].value.totalIngresos ? data[1].value.totalIngresos : 0};
        resolve(finalData);
      },function (err) {
        console.log(err);
        resolve();
      })

    }.bind(this));

    return promise;
  },

  actions: {
        didTransition: function() {
          this.Animate.entryPage('.page', 'fadeIn', 'fast');
        },

        willTransition: function(transition){
          this.Animate.exitPage('.page','fadeOut', transition, 'fast');
        }
    }
});
