Ext.define('megafilmperu.view.puntoventa.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.puntoventa-main',
    onCalcularTotalVenta: function ()
    {
        me = this;
        var store = Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore();
        var _tot = 0;

        store.each(function (record) {_tot = parseFloat(_tot) + record.get('total');});
        Ext.ComponentQuery.query('#txtTotalVentaCaja')[0].setValue(
          Ext.util.Format.currency(_tot,' ',2,false)
        );
    },
    onEditorCalcularTotal:function(editor,e){
           if(e.record.get('metros')!=0)
           {
              _cant = parseFloat( e.record.get('metros') );
              _pre  = parseFloat( e.record.get('precioporfraccion') );
              e.record.set('precioanterior',  e.record.get('precioporunidad'));
              _tot = _pre * _cant;
              e.record.set('precio', _pre.toFixed(2));
              e.record.set('total', _tot.toFixed(2));

           }else{
             _cant = parseFloat( e.record.get('cantidad') );
             _pre  = parseFloat( e.record.get('precioporunidad') );
             e.record.set('precioanterior', 0);
             _tot = _pre * _cant;
             e.record.set('precio', _pre.toFixed(2));
             e.record.set('total', _tot.toFixed(2));
           }

         e.record.set('estado', 'INCOMPLETO');
         e.record.set('jsonseries', '');
        this.onCalcularTotalVenta();

     },
     onClickEliminarItem:function(btn){
       var rec = btn.getWidgetRecord();
       var store = Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore();
       store.remove(rec);
       this.onCalcularTotalVenta();
     },
     onClickGuardarCajaPago:function(btn){
       __form = Ext.ComponentQuery.query('#wPuntoVentaPago')[0];
       me = this;
       var _dataDetalle = [];
       if(__form.isValid()){
         
         var _store = Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore();
         if(_store.getCount()==0){    megafilmperu.util.Util.showToast("TIENE QUE INGRESAR PRODUCTOS"); return false; }
         _store.each(function (record) {
            if (record.get('cantidad') != 0)
             {
             
               if(record.get('estado')=='INCOMPLETO'){ Ext.Msg.alert("error","Copletar de ingresar las cantidades");return false;}
               if(record.get('precioanterior')!=0 && record.get('metros')>0){
                  _swMetros = true;
               }else{
                  _swMetros = false;
               }
               _reg = {
                     "idprod"  : record.get('idprod'),
                     "cantidad": record.get('cantidad'),
                     "precio"  : record.get("precio"),
                     "total"   : record.get("total"),
                     "ventametros"  : _swMetros,
                     "metros"       : record.get("metros"),
                     "series"            : record.get("series"),
                     "seriescantidades"  : record.get("seriescantidades")
                  };
                 _dataDetalle.push(_reg);
              }

         });
         
         __jsondetalle =  JSON.stringify(_dataDetalle);
        
         __radios = Ext.ComponentQuery.query('radio');
         if(__radios[0].value){
            __tipodoc = 3;
         }
         if(__radios[1].value){
           __tipodoc = 2;
         }
         if(__radios[2].value){
           __tipodoc = 1;
         }

          Ext.Ajax.request({
             url : megafilmperu.util.Rutas.facturacionGuardarPagoPuntoVenta,
             params:{
               id           : 0,
               idcoti       : 0,
               idper        : Ext.ComponentQuery.query('#cboCliente')[0].getValue(),
               vjsondetalle : __jsondetalle.toString(),
               idfopag      : Ext.ComponentQuery.query('#cboFormaPagoPv')[0].getValue(),
               idmodo       : 1,
               documentoventa :__tipodoc,
               serie        : Ext.ComponentQuery.query('#txtSerieDoc')[0].getValue(),
               numerodoc    : Ext.ComponentQuery.query('#txtNumeroDoc')[0].getValue(),
               acuenta      : Ext.ComponentQuery.query('#txtAcuentaVentaCajaValidar')[0].getValue(),
               porcentaje   : Ext.ComponentQuery.query('#txtPorcentajeDescuento')[0].getValue(),
               idtienda     : Ext.ComponentQuery.query('#txtIdTienda')[0].getValue()  // idtienda
             },
             success:function(response){
                __data = Ext.JSON.decode(response.responseText);
                if(__data.error!=0){
                        Ext.ComponentQuery.query('#wPuntoVentaPago')[0].reset();
                        Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore().removeAll();
                        megafilmperu.util.Util.showToast("GUARDADO");
                        Ext.ComponentQuery.query('#dvListaProductos')[0].getStore().load();
                        try {
                          var me =  Ext.ComponentQuery.query('#wContenedorPuntoVenta')[0];
                          var l = me.getLayout();
                          l.setActiveItem(0);
                        } catch (e) {
                          var me =  Ext.ComponentQuery.query('#wContenedorPuntoVentaB')[0];
                          var l = me.getLayout();
                          l.setActiveItem(0);
                        }
                        var objrpt = window.open( megafilmperu.util.Rutas.facturacionImprimirA4+ 'id='+ __data.error , "", "width=700,height=900");
                        setTimeout(function(){ objrpt.close(); }, 1000);
                        Ext.ComponentQuery.query('#txtTotalVentaCaja')[0].setValue('0');
                        Ext.ComponentQuery.query('#cboCliente')[0].setReadOnly(false);
                }
             }
          });

       }else{
         console.log("error en guardar ajax");
       }

     },
     onKeyPagoAcuenta:function(obj, e, eOpts){
       if(e.keyCode==13){
           __total   = Ext.ComponentQuery.query('#txtTotalVentaCajaValidar')[0].getValue()
           __acuenta = Ext.ComponentQuery.query('#txtAcuentaVentaCajaValidar')[0].getValue();
           Ext.ComponentQuery.query('#txtSaldoVentaCajaValidar')[0].setValue(__total - __acuenta);
       }
     },
     onClickListarSeries:function(btn){
       x = btn.getX();
       y = btn.getY();
       r = btn.getWidgetRecord();
       st  = Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore();
       r.set('estado', 'INCOMPLETO');
       if(r.get('precioanterior')>0){
         __ventana = Ext.create('Ext.window.Window',{
              title : 'Listada de Productos Fraccion',
              width : 1100 ,
              itemId : 'wProductosFraccion',
              height :600,
              autoShow:true,
              modal : true,
              x : x - 150,
              y :y,
              layout:{
                type:'fit',
                align:'stretch'
              },
              items:[
                {
                  xtype    :'wListaSeriesFraccion',
                  codigo   : r.get('idprod'),
                  cantidad : r.get('metros'),
                  registro : r
                }
              ]
          });
          Ext.ComponentQuery.query('#txtSerieUnico')[0].focus(false,100);
       }else{
         __ventana = Ext.create('Ext.window.Window',{
          title : 'Listada de Productos',
          itemId : 'wProductosUnidades',
          width : 750 ,
          height :600,
          autoShow:true,
          modal : true,
          x : x - 150,
          y : y,
          layout:{
            type:'fit',
            align:'stretch'
          },
          items:[
            {
              xtype    :'wListaSeriesUnidades',
              codigo   : r.get('idprod'),
              cantidad : r.get('cantidad'),
                registro : r
            }
          ]
       });

       Ext.ComponentQuery.query('#txtSerieUnico')[0].focus(false,100);

      }
     },

});
