Ext.define('megafilmperu.view.ventas.AccionesRegCotizacion', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-regcotizacion',

    //@Cliente Seleccionar grilla
    onSelectedCliente:function( grid, record, index, eOpts ){
      try {
        var me =  Ext.ComponentQuery.query('#wContenedorCliente')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(1);
        Ext.ComponentQuery.query('#wFormClienteListado')[0].loadRecord(record);
      } catch (e) {
        console.log('Editar Cliente');
      }
    },
    onClickCancelarClienteViaListado:function(){
      try {
        var me =  Ext.ComponentQuery.query('#wContenedorCliente')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(0);
      } catch (e) {
        console.log(e.tostring());
      }
    },

    onSelectedClienteERP:function( grid, record, index, eOpts ){
      try {
          _txt = Ext.String.format('Cotizaciones  : {0}',record.get('cotizaciones'));
          Ext.ComponentQuery.query('#btnCotizaciones')[0].setText(_txt);


      } catch (e) {
        console.log('Select ERP cliente');
      }
    },

    onClickBuscarProducto: function (btn) {
      if(Ext.ComponentQuery.query('#cboDatosCliente')[0].getValue()){
        var _win = Ext.create('megafilmperu.view.ventas.BuscarProducto', { cliente: Ext.ComponentQuery.query('#cboDatosCliente')[0].getValue()});
        _win.show(btn, function () {}, this);
      }else{
        Ext.Msg.alert("Aviso","Buscar al cliente para buscar los precios de los productos !!"); return false;
      }
    },
    onClickIngresarCotizacion: function (btn) {
        var _win = Ext.create('megafilmperu.view.ventas.RegistrarCotizacion');
        _win.show(btn, function () {}, this);
    },
    onClickEliminarProducto:function(button, event, eOpts){
        var rec = button.getWidgetRecord();
        me = this;

        Ext.MessageBox.confirm('Aviso','Desea eliminar el producto ?',function(btn){
          if(btn=='yes'){
            if (rec) {
               Ext.Ajax.request({
                   url :megafilmperu.util.Rutas.productoEliminar,
                   params:{
                     idproducto : rec.get('idprod')
                   },
                   success:function(response){
                     var data = Ext.JSON.decode(response.responseText);
                     Ext.each(data,function(r){
                       if(r.error != 0)
                            me.lookupReference('dgvProductos').getStore().load();
                     });
                   }
               });
            }
          }
        });
    },
    onClickEliminarCliente:function(button, event, eOpts){
      var rec = button.getWidgetRecord();
      me = this;

      Ext.MessageBox.confirm('Aviso','Desea eliminar al Cliente ?',function(btn){
        if(btn=='yes'){
          if (rec) {
             Ext.Ajax.request({
                 url :megafilmperu.util.Rutas.clienteEliminar,
                 params:{
                   vIdPersona : rec.get('idper')
                 },
                 success:function(response){
                   var data = Ext.JSON.decode(response.responseText);
                   Ext.each(data,function(r){
                     if(r.error != 0)
                            Ext.ComponentQuery.query('#dgvClientes')[0].getStore().load();
                         // me.lookupReference('dgvClientes').getStore().load();
                   });
                 }
             });
          }
        }
      });
    },
    onClickEliminarCotizacion:function(button, event, eOpts){
      var rec = button.getWidgetRecord();
      me = this;
      Ext.MessageBox.confirm('Aviso','Desea Anular la cotizacion ?',function(btn){
        if(btn=='yes'){
          if (rec) {
             Ext.Ajax.request({
                 url :megafilmperu.util.Rutas.cotizacionEliminar,
                 params:{
                   vIdCoti : rec.get('vid')
                 },
                 success:function(response){
                   var data = Ext.JSON.decode(response.responseText);
                   Ext.each(data,function(r){
                     if(r.error != 0)
                          me.lookupReference('dgvVentas').getStore().load();
                   });
                 }
             });
          }
        }
      });
    },
     onClickEditarCotizacion: function (btn) {

        var _grid = this.lookupReference('dgvVentas');
        var _rec = _grid.getSelectionModel().getSelection()[0];
        if(_rec){
            var me =  Ext.ComponentQuery.query('#wContenedorCotizaciones')[0];    //this;
            var l = me.getLayout();
            l.setActiveItem(1);
            Ext.ComponentQuery.query('#frmRegCotizacion')[0].reset();
            Ext.ComponentQuery.query('#frmRegCotizacion')[0].loadRecord(_rec);
            Ext.ComponentQuery.query('#dgvDetalleVenta')[0].getStore().removeAll();

            Ext.Ajax.request({
                url :megafilmperu.util.Rutas.cotizacionDetalle,
                params:{
                  vIdCotizacion : _rec.get('vid')
                },
                success:function(response){
                   var _obj = Ext.JSON.decode(response.responseText);
                   var _dataDetalle = Ext.ComponentQuery.query('#dgvDetalleVenta')[0].getStore();
                   Ext.each(_obj.data,function(record,i){ //eddy
                      if (record.cantidad != 0) {
                          _reg = {
                              "idprod": record.id,
                              "cantidad": record.cantidad,
                              "descripcion": record.descripcion,
                              "precio": record.precio,
                              "total": record.total,
                              "vencimiento": Ext.Date.format(record.vencimiento, 'd/m/Y')   //(record.vencimiento==null? null:  Ext.Date.format(record.vencimiento, 'd/m/Y') )
                          };
                          _dataDetalle.insert(0,_reg);
                      }
                   });
                }
            });

          //} catch (e) {
          //  console.log('Editar Cotizacion');
          //}
            /*var _win = Ext.create('megafilmperu.view.ventas.EditarCotizacion', { cotizacion: _rec.get('idcoti') });
            var form = _win.down("form");
            form.loadRecord(_rec);
            _win.show(btn, function() {}, this);*/
        }

    },

    onClickNuevoCliente: function (btn) {
        var _win = Ext.create('megafilmperu.view.ventas.RegistrarCliente');
        _win.show(btn, function () {}, this);
    },
    onClickNuevoProductoPorCotizacion: function (btn) {
        var _win = Ext.create('Ext.window.Window', {
            layout:'fit',
            width:1200,
            height:700,
            autoShow:true,
            modal:true,
            itemId : 'winProductoCoti',
            items:[
              {
                xtype:'wRegProducto'
              }
            ]
        });
    },
    onClickCancelarCliente: function () {
        _win = this.getView();
        _win.close();
    },

    onSelectOptionProducto: function (combo, record, index) {
        Ext.ComponentQuery.query('#txtCantidad')[0].focus();
    },
    onKeyPressCantidad: function (txt, e, eOpts) {
        if (e.keyCode == 13) {
            me = this;
            var _store = me.lookupReference('dgvDetalleVenta').getStore();
            var _producto = me.lookupReference('cboDescripcionProd');

            _pro = _producto.getValue();
            _pro = _pro.split('-');
            _data = {
                idprod: parseInt(_pro[0]),
                descripcion: _producto.getRawValue(),
                cantidad: txt.getValue(),
                precio: parseFloat(_pro[1]),
                total: parseInt(1) * parseInt(txt.getValue())
            };
            if (_store.findRecord('idprod', parseInt(_pro[0]))) {
                Ext.Msg.alert("Error", "Producto ya se encuentra cargada");
                return false;
            }
            _store.insert(0, _data);
            _producto.setRawValue('');
            txt.setValue(0);
            this.onCalcularTotalVenta();
        }

    },
    onEditorCalcularTotal: function (editor, e) {
      var _cant = 0;
      var _pre = 0;
      _cant = e.record.get('cantidad');
      _pre = e.record.get('precio');
      _tot = _pre * _cant;
      e.record.set('total', _tot.toFixed(2));
      this.onCalcularTotalVenta();
    },


    onSelectedIncluyeIGV: function (obj, newValue, oldValue, eOpts) {
        this.onCalcularTotalVenta();
    },
    onCalcularTotalVenta: function () {
        me = this;
        var store = Ext.ComponentQuery.query('#dgvDetalleVenta')[0].getStore();
        var _tot = 0;
        store.each(function (record) {
            _tot = _tot + record.get('total');
        });
        Ext.ComponentQuery.query('#txtSubtotalventas')[0].setValue(_tot.toFixed(2));
        if (Ext.ComponentQuery.query('#_incluyeigv')[0].getValue()){
            Ext.ComponentQuery.query('#txtSubtotalventas')[0].setHidden(true);
            Ext.ComponentQuery.query('#txtIgvventas')[0].setHidden(true);
            var _igv = 0;
        }
        else{
            Ext.ComponentQuery.query('#txtSubtotalventas')[0].setHidden(false);
            Ext.ComponentQuery.query('#txtIgvventas')[0].setHidden(false);
            var _igv = _tot * 0.18;
        }

        Ext.ComponentQuery.query('#txtIgvventas')[0].setValue(_igv.toFixed(2));
        var _totven = 0;
        _totven = _tot + _igv;
        Ext.ComponentQuery.query('#txtTotalGeneral')[0].setValue(  Ext.util.Format.number(_totven.toFixed(2), "0,000.00")  );
    },
    onClickEliminarDetalle: function (button, event, eOpts) {
        var grid = this.lookupReference('dgvDetalleVenta');
        var store = grid.getStore();
        var rec = button.getWidgetRecord();
        if (rec) {
            store.remove(rec);
            this.onCalcularTotalVenta();
        }
    },
    onClickSalirCotizacion:function(){
          var me =  Ext.ComponentQuery.query('#wContenedorCotizaciones')[0];    //this;
          var l = me.getLayout();
          l.setActiveItem(0);

    },
    onClickGuardarCotizacion: function () {
       var _form =  Ext.ComponentQuery.query('#frmRegCotizacion')[0];    //this.lookupReference('frmRegCotizacion');
        if (_form.isValid()) {

            var _dataDetalle = [];
            var _store = this.lookupReference('dgvDetalleVenta').getStore();
            me = this;
            _store.each(function (record) {
                if (record.get('cantidad') != 0) {
                    _reg = {
                        "idprod": record.get('idprod'),
                        "cantidad": record.get('cantidad'),
                        "precio": record.get("precio"),
                        "total": record.get("total"),
                        "vencimiento": (record.get("vencimiento")==null? null:  Ext.Date.format(record.get("vencimiento"), 'd/m/Y') )
                    };
                    _dataDetalle.push(_reg);
                }

            });
            _txt1 = Ext.ComponentQuery.query('#txtJsonDetalle');
            _txt1[0].setValue(JSON.stringify(_dataDetalle));
            var _view = this.getView();
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    var me =  Ext.ComponentQuery.query('#wContenedorCotizaciones')[0];    //this;
                    var l = me.getLayout();
                    l.setActiveItem(0);
                    _dgv = Ext.ComponentQuery.query('#dgvVentas')[0];
                    _dgv.getStore().load();

                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                    _view.close();
                }
            });
        } else {
            megafilmperu.util.Util.showErrorMsg('Ingresar los datos para la cotización!');
        }
    },

    //@ Acciones de Matenimiento

    onClickMantenimiento: function () {
        var _win = Ext.create('megafilmperu.view.ventas.Mantenimiento');
    },

    //@ Acciones Clientes
    //@ Accion en la ventana de registro de usuario por el formulario de cotizaciones
    onClickGuardarCliente: function () {
        var _form = this.lookupReference('myFormCliente');
        var _store = Ext.ComponentQuery.query('#cboDatosCliente')[0].getStore();
        if (_form.isValid()) {
            var _view = this.getView();
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    _store.load();
                    _view.close();
                },
                failure: function (error) {
                    Ext.Msg.alert("Aviso", "Error al guardar");
                    _view.close();
                }
            });
        } else {
            megafilmperu.util.Util.showErrorMsg('Ingresar los datos para la cotización!');
        }
    },
    onClickGuardarClienteViaListado: function () {
        var _form =   Ext.ComponentQuery.query('#wFormClienteListado')[0];   //this.lookupReference('myFormClienteListado');
        var _store =  Ext.ComponentQuery.query('#dgvClientes')[0].getStore();  //this.lookupReference('dgvClientes').getStore();
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    _store.getProxy().extraParams = {
                        vDocumento: null,
                        vRuc: null,
                        query: null
                    };
                    _store.load(1);
                    var me =  Ext.ComponentQuery.query('#wContenedorCliente')[0];    //this;
                    var l = me.getLayout();
                    l.setActiveItem(0);
                },
                failure: function () {
                    megafilmperu.util.Util.showErrorMsg("Error al momento de grabar la informacion");
                }
            });
        } else {
            megafilmperu.util.Util.showErrorMsg('Ingresar los datos del cliente!');
        }
    },

    onClickRowProducto: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
      /*
          precioprod   = 1
          precioprodlocalespecial = 2
          precioprodprovincia  = 3
          precioprodprovinciaespecial = 4
      */

        //(record.get('tipodeventa');
        __tipo_precio = record.get('_tipoprecio');

        me = this;
        __store         = Ext.ComponentQuery.query('#dgvDetalleVenta')[0].getStore();
        __precio         = 0;
        __total         = 0;

        /*
        1;"PUBLICO"
        2;"ESPECIAL"
        3;"VIP"
        4;"GERENCIAL"

        */
        switch (__tipo_precio)
        {
          case 1:
            __total  =  parseInt(1) * parseFloat(record.get('preciounidadpublico'));
            __precio =  parseFloat(record.get('preciounidadpublico'));
          break;
          case 2:
            __total =  parseInt(1) * parseFloat(record.get('preciounidadespecial'));
            __precio =  parseFloat(record.get('preciounidadespecial'));
          break;
          case 3:
            __total =  parseInt(1) * parseFloat(record.get('preciounidadvip'));
            __precio =  parseFloat(record.get('preciounidadvip'));
          break;
          case 4:
            __total  =  parseInt(1) * parseFloat(record.get('preciounidadpublico'));
            __precio =  parseFloat(record.get('preciounidadpublico'));
          break;
        }

        _data = {
                idprod      : parseInt(record.get('id')),
                descripcion : record.get('nombre'),
                cantidad        : 1,
                precio          : __precio ,     //parseFloat(record.get('precioprod')),
                total           : __total  ,     //parseInt(1) * parseFloat(record.get('precioprod')),
                preciopublico   : record.get('preciounidadpublico'),
                precioespecial  : record.get('preciounidadespecial'),
                preciovip       : record.get('preciounidadvip'),
                preciofraccionpublico   :record.get('preciofraccionpublico'),
                preciofraccionespecial  :record.get('preciofraccionespecial'),
                preciofraccionvip       :record.get('preciofraccionesvip')
            };

        if (__store.findRecord('idprod', parseInt( record.get('id') ))) {
            Ext.Msg.alert("Error", "Producto ya se encuentra cargada");
            return false;
        }
        __store.insert(0, _data);
        this.onCalcularTotalVenta();
    },

    onClickBuscarProductoPorNombre: function (obj) {
        me = this;
        _store     = me.lookupReference('dgvBuscarProducto').getStore();
        _idCliente = this.lookupReference('tipopreciopersona').getValue();
        _store.getProxy().extraParams = {
            vCodigo: '',
            vDescripcion: me.lookupReference('txtProductoNombre').getValue(),
            vIdCliente : _idCliente

        };
        _store.load(1);
    },
    onChangeBuscarCategoriaProducto:function(combo, record, eOpts){
        me = this;
        _store = me.lookupReference('dgvProductos').getStore();
        _store.getProxy().extraParams = {vCodigo: null,vDescripcion: null,vCategoria : record.get('idcate')};
        _store.load(1);

    },

    onSelectedDetalleCotizacion: function (obj, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        me = this;
        if(record.get('estado')==3)
        {
          Ext.ComponentQuery.query('#btnImprimirCotizacion')[0].setDisabled(true);
          //Ext.ComponentQuery.query('#btnEditarCotizacion')[0].setDisabled(true);
        }else{
          //Ext.ComponentQuery.query('#btnEditarCotizacion')[0].setDisabled(false);
          Ext.ComponentQuery.query('#btnImprimirCotizacion')[0].setDisabled(false);
        }

        _store = me.lookupReference('dgvDetalleCotizacion').getStore();
        _store.getProxy().extraParams = {
            vIdCotizacion: record.get('vid')
        };
        _store.load(1);
    },

    /*onClickRefrescarListadoCotizaciones: function () {
        me = this;
        _store = me.lookupReference('dgvVentas').getStore();
        _store.load(1);
    },*/

    onClickBuscarCotizacionesPorFechas: function () {
        me = this;
        _store = me.lookupReference('dgvVentas').getStore();
        _store.getProxy().extraParams = {
            vDesde: Ext.ComponentQuery.query('#dfDesdeCotizacion')[0].getRawValue(),
            vHasta: Ext.ComponentQuery.query('#dfHastaCotizacion')[0].getRawValue(),
            vPersona: ''
        };
        _store.load(1);
        _storeDet = me.lookupReference('dgvDetalleCotizacion').getStore();
        _storeDet.removeAll();
    },
    //@Cliente  Nuevo
    onClickNuevoClienteLista: function (btn) {
        var form = this.lookupReference('myFormClienteListado');
        form.reset();
        Ext.ComponentQuery.query('#idper')[0].setValue(0);
        Ext.ComponentQuery.query('#paternoper')[0].focus();
    },
    //@Cliente Buscar Numero Dni
    onClickBuscarClienteDni: function (obj, e, eOpts) {
        txtDni = this.lookupReference('txtDniBuscar');

        var store = this.lookupReference('dgvClientes').getStore();
        store.getProxy().extraParams = {
            vDocumento: (txtDni.getValue().trim() == '' ? null : txtDni.getValue().trim()),
            vRuc: null,
            query: null
        };
        store.load(1);
    },
    //@Cliente Buscar Numero Ruc
    onClickBuscarClienteRuc: function (obj, e, eOpts) {
        t = this.lookupReference('txtRucBuscar');
        st = this.lookupReference('dgvClientes').getStore();
        st.getProxy().extraParams = {
            vDocumento: null,
            vRuc: (t.getValue().trim() == '' ? null : t.getValue().trim()),
            query: null
        };
        st.load();

    },
    //Obtener datos del cliente por su RUC
    onClickBuscarRUCDatos:function(){
        _form           = this.lookupReference('myFormClienteListado');
        _rucper         = this.lookupReference('numrucper').getValue();
        _txtNombre      = this.lookupReference('nombreper');
        _txtDireccion   = this.lookupReference('domiciper');
        megafilmperu.util.Util.obtenerDatosRUC(_rucper,_txtNombre,_txtDireccion,_form);
    },
    //Obtener datos del cliente por su RUC
    onClickBuscarRUCDatosSimple:function(){
        _form           = this.lookupReference('myFormCliente');
        _rucper         = this.lookupReference('vnumruc').getValue();
        _txtNombre      = this.lookupReference('vnombre');
        _txtDireccion   = this.lookupReference('vdireccion');
        megafilmperu.util.Util.obtenerDatosRUCSimple(_rucper,_txtNombre,_txtDireccion,_form);
    },
    //@Cliente Buscar Por Cliente
    onClickBuscarClienteQuery: function (obj, e, eOpts) {
        t = this.lookupReference('txtQueryBuscar');
        st = this.lookupReference('dgvClientes').getStore();
        st.getProxy().extraParams = {
            vDocumento: null,
            vRuc: null,
            query: (t.getValue().trim() == '' ? null : t.getValue().trim())
        };
        st.load(1);
    },


    //@Producto Seleccionar un Producto Listado
    onClickItemProducto: function (obj, record, item, index, e, eOpts) {
        console.log(record);
        var form = this.lookupReference('myFrmProducto');
        form.loadRecord(record);
    },

    // @ Producto Buscar por Codigo
    onClickBuscarProductoCodigo: function () {
        txtCodigo = this.lookupReference('txtBuscarCodigoProd');
        var store = this.lookupReference('dgvProductos').getStore();
        store.getProxy().extraParams = {
            vCodigo: (txtCodigo.getValue().trim() == '' ? null : txtCodigo.getValue().trim()),
            query: null
        };
        store.load(1);
    },
    // @ Producto Buscar por Descripcion
    onClickBuscarProductoDescripcion: function () {
        txtQuery = this.lookupReference('txtBuscarDescripcionProd');
        var store = this.lookupReference('dgvProductos').getStore();
        store.getProxy().extraParams = {
            vCodigo: null,
            query: (txtQuery.getValue().trim() == '' ? null : txtQuery.getValue().trim())
        };
        store.load(1);
    },

    // @Producto Metodo para Guardar
    onClickGuardarProducto: function (btn) {
        var _form = this.lookupReference('myFrmProducto');
        var _store = this.lookupReference('dgvProductos').getStore();
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {

                  if(Ext.ComponentQuery.query('#wRegistrarCotizacion')[0]){
                      Ext.ComponentQuery.query('#winProductoCoti')[0].close();
                  }else{
                      _store.reload();
                  }
                },
                failure: function () {
                    Ext.Msg.alert("Error","Error al momento de grabar los datos");
                }
            });
        } else {
            megafilmperu.util.Util.showErrorMsg('Ingresar los datos del producto');
        }
    },
    // @Producto Metodo Nuevo
    onClickNuevoProducto: function (btn) {
        var form = this.lookupReference('myFrmProducto');
        form.reset();
        Ext.ComponentQuery.query('#idprod')[0].setValue(0);
        Ext.ComponentQuery.query('#codprod')[0].focus();
    },

    //Lost Focus para los mantenimientos de Producto y Clientes
    /*onFocusTextoDeBusquedaProducto:function( texto, event, eOpts ){
          this.lookupReference('txtBuscarCodigoProd').setValue('');
          this.lookupReference('txtBuscarCodigoProd').setValue('');
    },
    onFocusTextoDeBusquedaCliente:function( texto, event, eOpts ){
          //this.lookupReference('txtDniBuscar').setValue('');
          this.lookupReference('txtRucBuscar').setValue('');
          this.lookupReference('txtQueryBuscar').setValue('');
    },*/
    // Key Event : Presionando ENTER
    onKeyPressTextoDeBusquedaProducto:function(texto, e, eOpts){
      if(e.charCode == 13){this.onClickBuscarProductoCodigo();}
    },
    onKeyPressTextoDeBusquedaProducto2:function(texto, e, eOpts){
      if(e.charCode == 13){this.onClickBuscarProductoPorNombre();}
    },

    onKeyPressTextoDeBusquedaRuc:function(texto, e, eOpts){
        if(e.charCode == 13){this.onClickBuscarClienteRuc();}
      },
      onKeyPressTextoDeBusquedaDesc:function(texto, e, eOpts){
        if(e.charCode == 13){this.onClickBuscarClienteQuery();}
      },

      
    //-----------------------------------------------------------
    onClickBuscarCotizacionesAnteriores:function(btn){
        var _codcliente = this.lookupReference('cboDatosCliente').getValue();
        console.log(_codcliente);
        if(_codcliente)
            Ext.create('megafilmperu.view.ventas.CotizacionesClienteBuscar',{ codigo : _codcliente });

    }
});
