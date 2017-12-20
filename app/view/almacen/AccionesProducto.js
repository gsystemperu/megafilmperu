
Ext.define('megafilmperu.view.almacen.AccionesProducto', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-producto',
    requires:['megafilmperu.util.Rutas'],

      //@ Tabla Producto
    //=============================================
   
    onSelectedPlanContable:function(cbo, record,opt){
        if(record){
            switch (cbo.nro) {
                case 1: this.lookupReference('ccinventario').setValue( record.get('id') ) ;break;
                case 2: this.lookupReference('cccompra').setValue( record.get('id') ) ;break;
                case 3: this.lookupReference('ccventa').setValue( record.get('id') ) ;break;
            }
            cbo.setRawValue(record.get('cuenta')+ ' - ' + record.get('descripcion'));
        }
    },
    onKeyUpBuscarProducto:function( obj, e, eOpts){
      if(obj.buscar=='codigo')
      {
        if(e.keyCode==13){
            __store =  this.lookupReference('dgvProductos').getStore();
            __store.load({
              params:{
                codigo : obj.getValue().trim()
              }
            });
        }
      }else{
        if(e.keyCode==13){
            __store =  this.lookupReference('dgvProductos').getStore();
            __store.load({
              params:{
                nombre : obj.getValue().trim()
              }
            });
        }
      }
      

    },

    onClickMantenimientoProducto:function(btn){
      _view  = 'wRegMaestros';
      _tit   = 'Registro de Maestros';
      _panel = Ext.ComponentQuery.query('#tabPrincipal')[0];
      try {
        if(_tit == ''){return 0;}
        if (!_panel.getChildByElement(_view)) {
          _panel.add({
            title: _tit,
            closable: true,
            id: _view,
            layout: 'fit',
            items: [{
              xtype: _view
            }]
          });

        }
        _panel.setActiveTab(_view);
      } catch (err) {
          console.info(err);
      }
    },
    onClickGuardarProducto: function (btn) {
        _form = Ext.ComponentQuery.query('#wFormProducto')[0];
        me    = this;
        /*cboinventario = me.lookupReference('cboinventario');
        cboventa      = me.lookupReference('cboventa');
        cbocompra     = me.lookupReference('cbocompra');*/
        /*if(cboinventario.getRawValue()==''){
            me.lookupReference('ccinventario').setValue(0);
        }
        if(cboventa.getRawValue()==''){
            me.lookupReference('ccventa').setValue(0);
        }
        if(cbocompra.getRawValue()==''){
            me.lookupReference('cccompra').setValue(0);
        }*/
        if (_form.isValid()) {

             this.lookupReference('')
             /** Recorrer el detalle de los Proveedores **/
             var _store =  Ext.ComponentQuery.query('#dgvDetProvProd')[0].getStore();
             me = this;
             _dataDetalle = [];
             _store.each(function (record) {
                 if (record.get('razonsocial') != '') {
                     _reg = {
                         "razonsocial": record.get('razonsocial'),
                         "precio": record.get("precio")
                    };
                     _dataDetalle.push(_reg);
                 }

             });
             _txt1 = Ext.ComponentQuery.query('#jsondetalle');
             _txt1[0].setValue(JSON.stringify(_dataDetalle));
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                      try {
                          var me = Ext.ComponentQuery.query('#wContenedorProducto')[0];
                          var l  = me.getLayout();
                          l.setActiveItem(0);
                          Ext.ComponentQuery.query('#dgvProductos')[0].getStore().reload();

                        } catch (e) {
                          console.log(e);return false;

                        }
                    }
                },
                failure: function () {
                    Ext.Msg.alert("Aviso","Se perdio la conexion con el servidor!");
                }
            });

        }
    },
    onClickCancelarProducto:function(btn){
        try {
          var me =  Ext.ComponentQuery.query('#wContenedorProducto')[0];    //this;
          var l = me.getLayout();
          l.setActiveItem(0);
        } catch (e) {
          console.log(e.toString());
        }

    },
    onClickNuevoProducto:function(btn)
    {
        Ext.ComponentQuery.query('#wFormProducto')[0].reset();
        Ext.ComponentQuery.query('#codigoserie')[0].focus();
    },

    onClickItemProductoERP : function( grid, record, index, eOpts ) {
        Ext.ComponentQuery.query('#btnExistencias')[0].setText(Ext.String.format('Existencias  : {0}',(record.get('existencias')==''?0:record.get('existencias'))      ));
        Ext.ComponentQuery.query('#btnPedidos')[0].setText(Ext.String.format('Cotizaciones  : {0}',(record.get('existencias')==''?0:record.get('cotizaciones'))));
        Ext.ComponentQuery.query('#btnVentas')[0].setText(Ext.String.format('Ventas  : {0}',(record.get('existencias')==''?0:record.get('ventas'))));
        
    },
    onClickItemProducto : function( grid, record, index, eOpts ) {
        Ext.ComponentQuery.query('#btnExistencias')[0].setText(Ext.String.format('Existencias  : {0}',(record.get('existencias')==''?0:record.get('existencias'))      ));
        Ext.ComponentQuery.query('#btnPedidos')[0].setText(Ext.String.format('Cotizaciones  : {0}',(record.get('existencias')==''?0:record.get('cotizaciones'))));
        Ext.ComponentQuery.query('#btnVentas')[0].setText(Ext.String.format('Ventas  : {0}',(record.get('existencias')==''?0:record.get('existencias'))   ));
        try {
            var me = Ext.ComponentQuery.query('#wContenedorProducto')[0];
            var l  = me.getLayout();
            l.setActiveItem(1);
            Ext.ComponentQuery.query('#wFormProducto')[0].loadRecord(record);
            Ext.ComponentQuery.query('#lblTituloProducto')[0].setText('Producto/Editar');
            Ext.Ajax.request({
                url :megafilmperu.util.Rutas.productoBuscarProveedores,
                params:{idprod : record.get('id')},
                success:function(response){
                    _obj = Ext.JSON.decode(response.responseText);
                    _store = Ext.ComponentQuery.query('#dgvDetProvProd')[0].getStore();
                    _store.removeAll();
                    _x = 0;
                    Ext.each(_obj.data,function(record){
                      console.log(record);
                      _data = {
                        'razonsocial' : record.razonsocial,
                        'precio' : record.precio
                      };
                     _store.insert(_x++,_data);
                    });
                }
            });

        } catch (e) {
            console.log(e);return false;
      }

    },
    onClickEliminarProducto:function(btn){
        me = this;
        Ext.Ajax.request({
                url: megafilmperu.util.Rutas.productoEliminar,
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                                Ext.ComponentQuery.query('#dgvProductos')[0].getStore().reload();
                           // me.lookupReference('myFrmProducto').reset();
                          //  me.lookupReference('dgvProductos').getStore().reload();
                    }
                }
             });
    },

    onClickIngresarUbicacionProducto:function(btn){
        __store = Ext.ComponentQuery.query('#dgvProductoExistencias')[0].getStore();
        __jsonData = [];
        __jsonTexto= '';
        __store.each(function(__record){
            if(__record.get('chk')){
                _reg = {"idproducto": __record.get('id')};
                __jsonData.push(_reg);
            }
        });
        __jsonTexto = JSON.stringify(__jsonData);

        Ext.create('megafilmperu.view.almacen.ProductoUbicacion', {codigo : __jsonTexto});
    },

    onClickAddProveedorProducto:function(btn){
       _store = Ext.ComponentQuery.query('#dgvDetProvProd')[0].getStore();
       _data = {
         'razonsocial' : '',
         'precio' : 0
       };
       if(_store.getCount()){
         _store.insert(_store.getCount() + 1,_data);
       }else{
          _store.insert(0,_data);
       }

    },
    onClickEliminarProveedorProducto:function(btn){
        var _rec   = btn.getWidgetRecord();
        var _store = Ext.ComponentQuery.query('#dgvDetProvProd')[0].getStore();
        if(_rec)
        {
           _store.remove(_rec);
        }
    },
    onClickRefrescarCombo:function(btn){
      Ext.ComponentQuery.query('#'+btn.combo)[0].getStore().load();
    }



});
