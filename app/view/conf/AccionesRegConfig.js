
Ext.define('megafilmperu.view.conf.AccionesRegConfig', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-config',
    requires:['megafilmperu.util.Rutas'],

    //@ Tabla Estado
    //=============================================
    onClickGuardarEstado:function(btn){
        _form = this.lookupReference('frmEstados');
        _form.submit({
            waitMsg: 'Guardando informacion...',
            success: function(form, action) {
                /*_dgv = Ext.ComponentQuery.query('#dgvPedidos');
                _dgvd = Ext.ComponentQuery.query('#dgvLotePedidoDetalle');
                if(_dgvd[0]){
                    _dgvd[0].getStore().load();
                }else{
                    _dgv[0].getStore().load();
                }
                Ext.Msg.alert("Aviso", action.result.msg);
                _view.close();*/
            },
            failure: function() {
                Ext.Msg.alert("Aviso", action.result.msg);
                //_view.close();
            }
        });
    },
    onClickNuevoEstado:function(btn)
    {
        this.lookupReference('frmEstados').reset();
        Ext.ComponentQuery.query('#txtDescripcionEstado')[0].focus();
    },
    onSelectedEstado : function( grid, record, index, eOpts ) {this.lookupReference('frmEstados').loadRecord(record)},

      //@ Tabla Bancos
    //=============================================
    onClickGuardarBanco: function (btn) {
        _form = this.lookupReference('frmBancos');
        me    = this;
        if (_form.isValid()) {
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                        me.lookupReference('dgvBancos').getStore().reload();
                    }                   
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });

        }
    },
    onClickNuevoBanco:function(btn)
    {
        this.lookupReference('frmBancos').reset();
        Ext.ComponentQuery.query('#txtDescripcionBanco')[0].focus();
    },
    onSelectedBanco : function( grid, record, index, eOpts ) {this.lookupReference('frmBancos').loadRecord(record)},

    onClickEliminarBanco:function(btn){
        me = this;
        Ext.Ajax.request({
                url: megafilmperu.util.Rutas.bancoEliminar, 
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmBancos').reset();
                            me.lookupReference('dgvBancos').getStore().reload();
                    } 
                }
             });
    },
     //@ Tabla Categorias
    //=============================================
    onClickGuardarCategoria:function(btn){
        _form = this.lookupReference('frmCategoria');
        if(_form.isValid()){
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                        me.lookupReference('dgvCategoria').getStore().reload();
                    }                   
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });
        }
    },
    onClickNuevoCategoria:function(btn)
    {
        this.lookupReference('frmCategoria').reset();
        Ext.ComponentQuery.query('#txtDescripcionCategoria')[0].focus();
    },
    onSelectedCategoria : function( grid, record, index, eOpts ) {this.lookupReference('frmCategoria').loadRecord(record)},

     onClickEliminarCategoria:function(btn){
        me = this;
        Ext.Ajax.request({
                url: megafilmperu.util.Rutas.categoriaEliminar, 
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmCategoria').reset();
                            me.lookupReference('dgvCategoria').getStore().reload();
                    } 
                }
             });

     },
     //@ Tabla Colores
    //=============================================
    onClickGuardarColor:function(btn){
        _form = this.lookupReference('frmColores');
        if(_form.isValid()){
             _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                        me.lookupReference('dgvColores').getStore().reload();
                    }                   
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });
        }
    },
    onClickNuevoColor:function(btn)
    {
        this.lookupReference('frmColores').reset();
        Ext.ComponentQuery.query('#txtDescripcionColor')[0].focus();
    },
    onSelectedColor : function( grid, record, index, eOpts ) {this.lookupReference('frmColores').loadRecord(record)},

    onClickEliminarColor:function(btn){
         me = this;
        Ext.Ajax.request({
                url: megafilmperu.util.Rutas.colorEliminar, 
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmColores').reset();
                            me.lookupReference('dgvColores').getStore().reload();
                    } 
                }
             });
    },
       //@ Tabla Medida
    //=============================================
    onClickGuardarMedida:function(btn){
        _form = this.lookupReference('frmMedidas');
        if(_form.isValid()){
           _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                        me.lookupReference('dgvMedidas').getStore().reload();
                    }                   
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });
        }
    },
    onClickNuevoMedida:function(btn)
    {
        this.lookupReference('frmMedidas').reset();
        Ext.ComponentQuery.query('#txtDescripcionMedidas')[0].focus();
    },
    onSelecteMedida : function( grid, record, index, eOpts ) {this.lookupReference('frmMedidas').loadRecord(record)},
    onClickEliminarMedida:function(btn){
         me = this;
        Ext.Ajax.request({
                url: megafilmperu.util.Rutas.medidaEliminar, 
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmMedidas').reset();
                            me.lookupReference('dgvMedidas').getStore().reload();
                    } 
                }
             });
    },
       //@ Tabla Unidad Medida
    //=============================================
    onClickGuardarUnidadMedida:function(btn){
        _form = this.lookupReference('frmUnidadMedida');
        if(_form.isValid()){
            _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                        me.lookupReference('dgvUnidadMedida').getStore().reload();
                    }                   
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });
        }
    },
    onClickNuevoUnidadMedida:function(btn)
    {
        this.lookupReference('frmUnidadMedida').reset();
        Ext.ComponentQuery.query('#txtDescripcionUnidadMedida')[0].focus();
    },
    onSelectedUnidadMedida : function( grid, record, index, eOpts ) {this.lookupReference('frmUnidadMedida').loadRecord(record)},
    onClickEliminarUnidadMedida:function(btn){
        
          me = this;
        Ext.Ajax.request({
                url: megafilmperu.util.Rutas.unidadMedidaEliminar, 
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmUnidadMedida').reset();
                            me.lookupReference('dgvUnidadMedida').getStore().reload();
                    } 
                }
             });

    },
       //@ Tabla Tipo Producto
    //=============================================
    onClickGuardarTipoProducto:function(btn){
        _form = this.lookupReference('frmTipoProducto');
        if(_form.isValid()){
             _form.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    if(action.result.error!=0){
                        me.lookupReference('dgvTipoProducto').getStore().reload();
                    }                   
                },
                failure: function () {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });
        }
    },
    onClickNuevoTipoProducto:function(btn)
    {
        this.lookupReference('frmTipoProducto').reset();
        Ext.ComponentQuery.query('#txtDescripcionTipoProducto')[0].focus();
    },
    onSelectedTipoProducto : function( grid, record, index, eOpts ) {this.lookupReference('frmTipoProducto').loadRecord(record)},
    onClickEliminarTipoProducto:function(btn){
          me = this;
        Ext.Ajax.request({
                url: megafilmperu.util.Rutas.tipoProductoEliminar, 
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            me.lookupReference('frmTipoProducto').reset();
                            me.lookupReference('dgvTipoProducto').getStore().reload();
                    } 
                }
             });

    },
        //@ Tabla Tarifas
    //=============================================
    onClickGuardarTarifa:function(btn){
        _form = this.lookupReference('frmTarifas');
        if(_form.isValid()){
            console.log("guardado");
        }
    },
    onClickNuevoTarifa:function(btn)
    {
        this.lookupReference('frmTarifas').reset();
        Ext.ComponentQuery.query('#txtDescripcionTarifa')[0].focus();
    },
    onSelectedTarifa : function( grid, record, index, eOpts ) {this.lookupReference('frmTarifas').loadRecord(record)},

    onClickEliminarTarifa:function(btn){
        console.log(btn.getWidgetRecord());
    }
});
