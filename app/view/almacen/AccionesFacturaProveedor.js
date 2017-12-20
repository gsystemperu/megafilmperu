Ext.define('megafilmperu.view.almacen.AccionesFacturaProveedor', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-FacturaProveedor',

    //@Region Acciones
    onClickCrearFacturaAproveedor:function(btn){
            __vc      = this;
            __sw      = 0;
            __registro =    Ext.ComponentQuery.query('#gridOrdenesCompraConfirFacturar')[0].getSelectionModel().getSelection()[0];
            if(__registro){
                 me =   Ext.ComponentQuery.query('#wContenedorFacturaProveedor')[0];
                    if(!me){
                        var me =   Ext.ComponentQuery.query('#wContenedorFacturaProveedorImportado')[0];
                    }
           
                var l = me.getLayout();
                l.setActiveItem(1);

                __sw  = me.toc;
                Ext.ComponentQuery.query('#frmRegFacturaProveedor')[0].reset();
                Ext.ComponentQuery.query('#frmRegFacturaProveedor')[0].loadRecord(__registro);
                Ext.ComponentQuery.query('#tipofactura')[0].setValue(me.toc);
                switch (__sw) {
                    case 1 :
                        Ext.ComponentQuery.query('#lblTipoCambio')[0].setHidden(true);
                        Ext.ComponentQuery.query('#txtTipoCambio')[0].setHidden(true); 
                        Ext.ComponentQuery.query('#txtSerieNumero')[0].setHidden(false); 
                        Ext.ComponentQuery.query('#txtNumeroDoc')[0].setFieldLabel(''); 
                        
                    break;
                    case 2 : 
                        Ext.ComponentQuery.query('#lblTipoCambio')[0].setHidden(false);
                        Ext.ComponentQuery.query('#txtTipoCambio')[0].setHidden(false);
                        Ext.ComponentQuery.query('#txtSerieNumero')[0].setHidden(true); 
                        Ext.ComponentQuery.query('#txtNumeroDoc')[0].setFieldLabel('Invoice NRO.'); 
                    break;
                }
                _store  = Ext.ComponentQuery.query('#dgvDetalleFacturaProveedor')[0].getStore();
                _store.removeAll();
                Ext.Ajax.request({
                    url :megafilmperu.util.Rutas.ordenCompraBuscarDetalle,
                    params:{
                      id :__registro.get('id')
                    },
                    success:function(response){
                       var _obj = Ext.JSON.decode(response.responseText);
                       Ext.each(_obj.data,function(record){
                          _data = {
                              idprod   : parseInt(record.idprod),
                              descripcion : record.nombre,
                              cantidad : record.cantidad,
                              precio   : record.preciocompra,
                              total    : record.total
                          };
                          _store.insert(0, _data);
                          __vc.onCalcularFacturaNacionalOimportacion(_store,__sw);
                        });

                    }
                });
            }
    },
    onCalcularFacturaNacionalOimportacion:function(_store,_toc){
       
        __total= _store.getCount();
        __suma = 0;
        for (index=0;  index < __total; index++){
            __suma = __suma +  _store.getAt(index).get('total');
        }
        if(_toc == 1){ // Facturas nacionales
            /*
                Crear Procedimiento de Tipo de Cambio del Dia
            */
            Ext.ComponentQuery.query('#txtSubtotalventasFacturarProv')[0].setValue( parseFloat( __suma).toFixed(2) );
            Ext.ComponentQuery.query('#txtIgvventasFacturarProv')[0].setValue( parseFloat( __suma * 0.18).toFixed(2));
            Ext.ComponentQuery.query('#txtTotalGeneralFacturarProv')[0].setValue( parseFloat( __suma + (__suma * 0.18)).toFixed(2));
        }else{ // Facturas importadadas
             
            Ext.ComponentQuery.query('#txtSubtotalventasFacturarProv')[0].setValue( parseFloat( __suma).toFixed(2));
            Ext.ComponentQuery.query('#txtIgvventasFacturarProv')[0].setValue(0);
            Ext.ComponentQuery.query('#txtTotalGeneralFacturarProv')[0].setValue(parseFloat(__suma).toFixed(2));
        }
    },
    onClickCancelarFacturaAproveedor:function(btn){
         var me =   Ext.ComponentQuery.query('#wContenedorFacturaProveedor')[0];
         if(!me)
         {
            var me =   Ext.ComponentQuery.query('#wContenedorFacturaProveedorImportado')[0];
         }    
        var l = me.getLayout();
        l.setActiveItem(0);
    },
    onClickGuardarFacturaAproveedor:function(btn){
        var __form =  Ext.ComponentQuery.query('#frmRegFacturaProveedor')[0];
        if (__form.isValid()) {
            var _dataDetalle = [];
            var _store = this.lookupReference('dgvDetalleFacturaProveedor').getStore();
            me = this;
            _store.each(function (record) {
                if (record.get('cantidad') != 0) {
                    _reg = {
                        "idprod": record.get('idprod'),
                        "cantidad": record.get('cantidad'),
                        "precio": record.get("precio"),
                        "total": record.get("total"),
                    };
                    _dataDetalle.push(_reg);
                }
            });
            _txt1 = Ext.ComponentQuery.query('#txtJsonDetalleFacturacion');
            _txt1[0].setValue(JSON.stringify(_dataDetalle));
        
          //  var _view = this.getView();
          __form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    var me =  Ext.ComponentQuery.query('#wContenedorFacturaProveedorImportado')[0];    //this;
                    if(!me){
                        var me =  Ext.ComponentQuery.query('#wContenedorFacturaProveedor')[0];    //this;
                    }
                    var l = me.getLayout();
                    l.setActiveItem(0);
                    _dgv = Ext.ComponentQuery.query('#gridOrdenesCompraConfirFacturar')[0];
                    _dgv.getStore().load();
 
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                    //_view.close();
                }
            });
        } else {
            megafilmperu.util.Util.showErrorMsg('Ingresar los datos para la facturacion!');
        }
    },
    onClickAnularFacturaProveedor:function(button, event, eOpts){
        r = button.getWidgetRecord();
        me = this;
        //console.log(r); return false;
        if(parseInt(r.get('idestado'))==2){
            Ext.MessageBox.confirm('Aviso','DESEA ANULAR LA CONFIRMACION DE LA ORDEN DE COMPRA ?',
            function(btn){
                if(btn=='yes'){
                    Ext.Ajax.request({
                        url :megafilmperu.util.Rutas.ordenCompraAnularConfir,
                        params:{
                          idordencompra :r.get('id'),
                          usuario      : 'test'
                        },
                        success:function(response){
                           oj = Ext.JSON.decode(response.responseText);
                           Ext.ComponentQuery.query('#gridOrdenesCompraConfirFacturar')[0].getStore().reload();
                        }
                    });
                }
          });
        }
        if(r.get('idestado')==7){
            Ext.MessageBox.confirm('Aviso','DESEA ANULAR LA FACTURA DEL PROVEEDOR ?',
            function(btn){
                if(btn=='yes'){
                    Ext.Ajax.request({
                        url :megafilmperu.util.Rutas.ordenCompraAnularFacturacion,
                        params:{
                            idordencompra :r.get('id'),
                            usuario      : 'test'
                        },
                        success:function(response){
                            oj = Ext.JSON.decode(response.responseText);
                            Ext.ComponentQuery.query('#gridOrdenesCompraConfirFacturar')[0].getStore().reload();
                        }
                    });
                }
          });
        }
      },
      onClickBuscarOrdenCompraConfirmadasFacturaPorFechas:function(){
        store = Ext.ComponentQuery.query("#gridOrdenesCompraConfirFacturar")[0].getStore();
        store.load({
            params: {
                desde: Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
                hasta: Ext.ComponentQuery.query('#dfHasta')[0].getRawValue(),
                proveedor: 0
            }
        });
      },
      onClickBuscarOrdenCompraConfirmadasFacturaPorProveedor:function(){
        store = Ext.ComponentQuery.query("#gridOrdenesCompraConfirFacturar")[0].getStore();
        store.load({
            params: {
                desde: Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
                hasta: Ext.ComponentQuery.query('#dfHasta')[0].getRawValue(),
                proveedor: Ext.ComponentQuery.query('#cboProveedores')[0].getValue()
            }
        });
      },
     
      onEditorCalcularTotal: function (editor, e) {
        c = 0;
        p = 0;
        c = e.record.get('cantidad');
        p = e.record.get('precio');
        t = p * c;
        e.record.set('total', t.toFixed(2));
        this.onCalcularTotalFacturacion();
      },
      onCalcularTotalFacturacion: function () {
        __objIgv = Ext.ComponentQuery.query('#txtIgvventasFacturarProv')[0];
        __objSubTotal = Ext.ComponentQuery.query('#txtSubtotalventasFacturarProv')[0];
        __objTotal = Ext.ComponentQuery.query('#txtTotalGeneralFacturarProv')[0];
        store = Ext.ComponentQuery.query('#dgvDetalleFacturaProveedor')[0].getStore();
        _tot = 0;
        _igv = 0;
        store.each(function (record) {
          _tot = _tot + record.get('total');
        });
        __objSubTotal.setValue(_tot.toFixed(2));
        _igv = _tot * 0.18;
        __objSubTotal.setValue(
            parseFloat(_tot).toFixed(2)
        );
        __objIgv.setValue(
            parseFloat(_igv).toFixed(2)
        );
        _totven = 0;
        _totven = _tot + _igv;
        __objTotal.setValue(
            parseFloat(_totven).toFixed(2)
        );
      },

});
