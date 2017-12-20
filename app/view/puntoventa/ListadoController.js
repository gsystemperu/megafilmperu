Ext.define('megafilmperu.view.puntoventa.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.puntoventa-listado',
    onKeyUpBuscarProducto:function( obj, e, eOpts){
      if(e.keyCode==13){
          __combo = Ext.ComponentQuery.query('#cboCliente')[0];
          if(__combo.getValue()){
                      __store = Ext.ComponentQuery.query('#dvListaProductos')[0].getStore();
                      __store.load({
                        params:{
                          cliente  :  __combo.getValue(),
                          codigo   : (obj.buscar =='codigo'? obj.getValue():null),
                          nombre   : (obj.buscar =='nombre'? obj.getValue():null)
                        }
                      });
          }else{
              megafilmperu.util.Util.showToast('Seleccionar al cliente o crearlo !');return false;
          }

      }
    },
    accionClickItem :function(  listview , record,item,index,e , eOpts){
      me = this;

    if(Ext.ComponentQuery.query('#cboCliente')[0].getValue()){
        var _data = {
               idprod   :  record.get('id'),
               producto :  record.get('nombre'),
               cantidad :  1,
               precio   :  record.get('precioporunidad'),
               total    :  record.get('precioporunidad') * 1,
               precioporunidad :record.get('precioporunidad'),
               precioporfraccion :record.get('precioporfraccion'),
               preciofraccionremate:record.get('preciofraccionremate'),
               preciounidadremate:record.get('preciounidadremate'),
               estado  : 'INCOMPLETO',
               jsonseries :''

        };
          var _grid = Ext.ComponentQuery.query('#dgvDetalleCaja')[0];
          if (_grid.getStore().findRecord('idprod', parseInt( record.get('id') ))) {
               Ext.Msg.alert('AVISO','EL PRODUCTO YA ESTA EN LISTA, MODIFICAR LA CANTIDAD ? ');return false;
           }
          /*Ext.ComponentQuery.query('#txtPorcentajeGerencia')[0].setValue(
          record.get('procentajegerencial')
        );*/
          _grid.getStore().insert(0,_data);
          me.onCalcularTotalVenta();
      }else{
        megafilmperu.util.Util.showToast('TIENE QUE SELECCIONAR AL CLIENTE O CREARLO !!');return false;
      }
   },
   onCalcularTotalVenta: function ()
   {
       me = this;
       var store = Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore();
       var _tot = 0;

       store.each(function (record) {
            _tot = parseFloat(_tot) + record.get('total');
       });
       Ext.ComponentQuery.query('#txtTotalVentaCaja')[0].setValue(_tot.toFixed(2));
   }
});
