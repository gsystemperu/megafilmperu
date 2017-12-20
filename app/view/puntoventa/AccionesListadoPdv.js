Ext.define('megafilmperu.view.puntoventa.AccionesListadoPdv', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-listadopdv',
    requires:['megafilmperu.util.Rutas'],
    init:function(){},
    onClickIngresarPagoAcuentaPdv:function(btn){
      __rec = btn.getWidgetRecord();
      Ext.widget('wPagosAcuentaPdv', {
        codigo :__rec.get("idfacturacion"),
        nombre :__rec.get("nomcompleto") ,
        monto  :__rec.get("totalcoti")
      });
    },
    onClickEliminarPagoAcuentaPdv:function(btn){
        
    },
    onClickBuscarCotizacionesPorFechas:function(btn){
        st = Ext.ComponentQuery.query('#dgvVentasFacturarPdv')[0].getStore();
        st.load({
          params:{
            desde : Ext.ComponentQuery.query('#dfDesdepdv')[0].getRawValue(),
            hasta : Ext.ComponentQuery.query('#dfHastapdv')[0].getRawValue()
          }
        }); 
    }
});
