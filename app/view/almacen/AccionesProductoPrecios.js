Ext.define('megafilmperu.view.almacen.AccionesProductoPrecios', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-productoprecios',
    onKeyUpBuscarProducto:function( obj, e, eOpts){
        if(e.keyCode==13){
            __store =  this.lookupReference('dgvProductosPrecios').getStore();
            __store.load({
              params:{
                nombre : obj.getValue().trim()
              }
            });
        }
  
    },
    onClickGuardarCambiosPrecios:function(btn){
       __store = this.lookupReference('dgvProductosPrecios').getStore();
       __cantidad = __store.getCount();
       __arrayData = [];
       __sw = 0;
       __grid  = this.lookupReference('dgvProductosPrecios');
       __grid.mask('..espere actualizando precios');
       for (var index = 0; index < __cantidad; index++) {
         __record = __store.getAt(index);
         if(__record.modified){
           __sw = 1;
            __dato = {
              id  : __record.get('id'),
              preciounidadpublico  : __record.get('preciounidadpublico'),
              preciounidadespecial  : __record.get('preciounidadespecial'),
              preciounidadvip  : __record.get('preciounidadvip'),
              preciofraccionpublico  : __record.get('preciofraccionpublico'),
              preciofraccionespecial  : __record.get('preciofraccionespecial'),
              preciofraccionvip  : __record.get('preciofraccionvip'),
              preciounidadremate  : __record.get('preciounidadremate'),
              preciofraccionremate  : __record.get('preciofraccionremate')
            };
            __arrayData.push(__dato);
         }
       }
       if(__sw>0){
            Ext.Ajax.request({
              url :megafilmperu.util.Rutas.productoActualizarPrecios,
              params:{
                jsondata : JSON.stringify(__arrayData),
                usuario : 'cambiar'
              },
              success:function(response){
                  _obj = Ext.JSON.decode(response.responseText);
                  console.log(_obj);
                  __grid.unmask();
                  __grid.getStore.load();
              }
          });
       }
       
    }
});
