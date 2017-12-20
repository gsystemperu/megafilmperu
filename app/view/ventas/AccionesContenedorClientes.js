Ext.define('megafilmperu.view.ventas.AccionesContenedorClientes', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-contenedorclientes',
    init:function(){
      console.log('iniciado');
    },
    onClickNuevoCliente:function(btn){
      try {
        var me =  Ext.ComponentQuery.query('#wContenedorCliente')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(1);
        Ext.ComponentQuery.query('#wFormClienteListado')[0].reset();
      } catch (e) {
        console.log('Nuevo Cliente');
      }
    },
    onClickVerClientes:function(btn){
      try {
        var me =  Ext.ComponentQuery.query('#wContenedorCliente')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(0);
        this.onClickRefrescarListado();

      } catch (e) {
        console.log("Ver clientes");
      }
    },

    onClickRefrescarListado: function () {
        _store = Ext.ComponentQuery.query('#dgvClientes')[0].getStore();
        _store.load(1);
    },
    onClickImprimirPDFCotizacion:function(){
       console.log("test");
    },
  });
