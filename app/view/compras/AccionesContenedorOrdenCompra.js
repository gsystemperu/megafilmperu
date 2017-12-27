Ext.define('megafilmperu.view.compras.AccionesContenedorOrdenCompra', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-contenedoordencompra',
    requires: [
        'megafilmperu.util.Rutas'
    ],
    onClickIngresar:function(){
        try {
          var me =  Ext.ComponentQuery.query('#wContenedorOrdenCompra')[0];    //this;
          var l = me.getLayout();
          l.setActiveItem(1);
          Ext.ComponentQuery.query('#frmOrdenCompra')[0].reset();
          Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore().removeAll();
        } catch (e) {
          console.log('Ingresar Orden Compra');
        }
    },
    onClickActualizarLista:function(){

    },
    onClickConfirmarOrdenCompra:function(){
      var _grid = Ext.ComponentQuery.query('#gridOrdenesCompra')[0];
      var _rec = _grid.getSelectionModel().getSelection()[0];
      me = this;
      if (_rec) {
          Ext.Ajax.request({
              url: megafilmperu.util.Rutas.ordenCompraConfirmar,
              params: {
                  id: _rec.get('id')
              },
              success: function (response) {
                  var _error = Ext.JSON.decode(response.responseText);
                  if (_error.error != 0) {
                      _grid.getStore().reload();
                      //me.lookupReference('gridOrdenesCompra').getStore().reload();
                  }
              }
          });
      }
    }


});
