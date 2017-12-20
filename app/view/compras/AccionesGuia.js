Ext.define('megafilmperu.view.compras.AccionesGuia', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-guia',
    requires: [
        'megafilmperu.util.Rutas',

    ],
    //@ Tabla Orden de Compra
    //=============================================

    onClickActualizarListado()
    {
        this.lookupReference('gridOrdenesCompraConfir').getStore().load();
    },
    onSelectedDetalleOrdenCompraConfirmada( grid, td, cellIndex, record, tr, rowIndex, e, eOpts)
    {   me = this;
        if(record){
          me.lookupReference('dgvOrdenCompraConfirDetalle').mask('..cargando');
           _store = me.lookupReference('dgvOrdenCompraConfirDetalle').getStore();
           _store.removeAll();

           Ext.Ajax.request({
               url : megafilmperu.util.Rutas.OrdenCompraConfirmadaDetalle,
               params:{
                 id :  record.get('id')
               },
               success:function(response){
                  _data = megafilmperu.util.Util.decodeJSON(response.responseText);
                  Ext.each(_data.data,function(row,i){
                    _data = {
                      'idordencompra': row.idordencompra,
                      'item' : 1,
                      'idprod': row.idprod,
                      'producto':row.producto,
                      'cantidad':row.cantidad,
                      'preciocompra':row.preciocompra,
                      'cantidadrecibida' : row.cantidadrecibida,
                      'numeroguia': row.numeroguia,
                      'vencimiento' : row.vencimiento,
                      'pasestock' : row.pasestock,
                      'total' : row.total
                    };
                    _store.insert(0, _data);
                  });
                  me.lookupReference('dgvOrdenCompraConfirDetalle').unmask();
               }
           });

        }
    },

    /*********************************************
     *    Procedimiento de actualizar Guia
     ********************************************/
     onClickGuardarGuiaProveedor:function(){

        var _form = this.lookupReference('frmGuiaIngresoProveedor');
        if (_form.isValid()) {
            var _dataDetalle = [];
            var _store = this.lookupReference('dgvOrdenCompraConfirDetalle').getStore();
            me = this;
            _store.each(function (record) {
                if (record.get('cantidadrecibida') != 0) {
                    _reg = {
                        "item": record.get('item'),
                        "idprod": record.get('idprod'),
                        "cantidadrecibida": record.get('cantidadrecibida'),
                        "vencimiento": (record.get("vencimiento")==null || record.get("vencimiento") ==''? null:  Ext.Date.format(record.get("vencimiento"), 'd/m/Y') ),
                        "genserie" :  (record.get("genserie")==true?1:0),

                    };
                    _dataDetalle.push(_reg);
                }

            });
             _txt1 = Ext.ComponentQuery.query('#txtjsondetalle');
            _txt1[0].setValue(JSON.stringify(_dataDetalle));
            var _view = this.getView();
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                        _dgv = Ext.ComponentQuery.query('#gridOrdenesCompraConfir')[0];
                        _dgv.getStore().load();
                        Ext.ComponentQuery.query('#frmGuiaIngresoProveedor')[0].reset();
                        _paneles = Ext.ComponentQuery.query('#wContenedorGuias')[0].getLayout() ;
                        _paneles.setActiveItem(0);
                },
                failure: function (action) {
                    Ext.Msg.alert("Aviso", "Error en conexión de base de datos");
                    _view.close();
                }
            });
        } else {
            megafilmperu.util.Util.showErrorMsg('Ingresar los datos necesarios!');
        }
     },

     onClickBuscarOrdenCompraConfirmadasPorFechas: function (btn) {
         store = Ext.ComponentQuery.query("#gridOrdenesCompraConfir")[0].getStore();
         store.load({
             params: {
                 desde: Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
                 hasta: Ext.ComponentQuery.query('#dfHasta')[0].getRawValue(),
                 proveedor: 0
             }
         });
     },

     onClickBuscarOrdenCompraConfirmadasPorProveedor: function (btn) {
         store = Ext.ComponentQuery.query("#gridOrdenesCompraConfir")[0].getStore();
         store.load({
             params: {
                 desde: Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
                 hasta: Ext.ComponentQuery.query('#dfHasta')[0].getRawValue(),
                 proveedor: Ext.ComponentQuery.query('#cboProveedores')[0].getValue()
             }
         });
     },






  /*  onClickIngresar: function () {
        Ext.create('megafilmperu.view.almacen.IngresarOrdenCompra');
    },
    onClickBuscarProducto: function (btn) {
        Ext.create('megafilmperu.view.almacen.ProductoBuscar', {
            ventana: 'OC'
        });
    },

    //@ Objeto : Ventana , Listado de productos
    onClickItemProducto: function (grid, record, item, index, e, eOpts) {
        me = this;
        var _store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore();
        var _precio = 0;

        _data = {
            idprod: parseInt(record.get('id')),
            producto: record.get('nombre'),
            cantidad: 1,
            precio: parseFloat(record.get('preciocompra')),
            total: parseInt(1) * parseFloat(record.get('preciocompra'))
        };

        if (_store.findRecord('idprod', parseInt(record.get('id')))) {
            Ext.Msg.alert("Error", "Producto ya se encuentra cargada");
            return false;
        }
        _store.insert(0, _data);
        me.onCalcularTotalOrdenCompra();
    },
    onCalcularTotalOrdenCompra: function () {
        me = this;
        var store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore();
        var _tot = 0;
        store.each(function (record) {
            _tot = _tot + record.get('total');
        });
        Ext.ComponentQuery.query('#txtSubtotal')[0].setValue(_tot.toFixed(2));
        if (Ext.ComponentQuery.query('#ckbAplicarIgv')[0].getValue()) {
            Ext.ComponentQuery.query('#txtSubtotal')[0].setHidden(true);
            Ext.ComponentQuery.query('#txtIgv')[0].setHidden(true);
            var _igv = 0;
        } else {
            Ext.ComponentQuery.query('#txtSubtotal')[0].setHidden(false);
            Ext.ComponentQuery.query('#txtIgv')[0].setHidden(false);
            var _igv = _tot * 0.18;
        }

        Ext.ComponentQuery.query('#txtIgv')[0].setValue(_igv.toFixed(2));
        var _totven = 0;
        _totven = _tot + _igv;
        Ext.ComponentQuery.query('#txtTotalGeneral')[0].setValue(
            //Ext.util.Format.number(_totven.toFixed(2), "0,000.00")
            _totven.toFixed(2)
        );
    },
    onEditorCalcularTotalOrdenCompra: function (editor, e) {
        var _cant = 0;
        var _pre = 0;
        _cant = e.record.get('cantidad');
        _pre = e.record.get('precio');
        _tot = _pre * _cant;
        e.record.set('total', _tot.toFixed(2));
        this.onCalcularTotalOrdenCompra();
    },
    onClickEliminarDetalle: function (button, event, eOpts) {
        var store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore();
        var rec = button.getWidgetRecord();
        if (rec) {
            store.remove(rec);
            this.onCalcularTotalOrdenCompra();
        }
    },
    onClickSalirOrdenCompra: function (btn) {
        this.getView().close();
    },

    onClickGuardarOrdenCompra: function () {

    },
    //==============================================




    onClickFormularioProveedor: function (btn) {
        var win = Ext.create('megafilmperu.view.almacen.FormProveedor', {
            control: btn.control.toString()
        });
    },

    onClickConfirmarOrdenCompra: function (btn) {
        var _grid = this.lookupReference('gridOrdenesCompra');
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
                        me.lookupReference('gridOrdenesCompra').getStore().reload();
                    }
                }
            });
        }


    }*/



});
