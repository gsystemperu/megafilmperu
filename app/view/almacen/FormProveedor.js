Ext.define('megafilmperu.view.almacen.FormProveedor', {
    extend: 'Ext.window.Window',
    xtype: 'wFormProveedor',
    alias: 'widget.wFormProveedor',
    requires: [
        'Ext.layout.container.VBox',
        'Ext.form.field.*',
        'Ext.form.Panel',
        'megafilmperu.view.almacen.AccionesProveedor'
    ],
    layout: 'fit',
    title: '..:: Registro de Proveedor ::..',
    width: 480,
    height: 300,
    autoShow: true,
    controller :'acciones-proveedor',
    config : {
        control:''
    },
    initComponent: function () {
       me = this;
        Ext.apply(this, {
            items: this.getFormulario(me.getControl())
        });
        this.callParent();
    },
    getFormulario: function (_idcontrol) {
        return obj = [
            {
                xtype: 'form',
                defaultType:'textfield',
                reference :'frmProveedor',
                padding : 10,
                defaults:{
                      anchor :'100%',
                      flex :1
                },
                url : megafilmperu.util.Rutas.proveedorGuardar,
                items:[
                    {
                        xtype:'hiddenfield',
                        name :'id',
                        value : 0
                    },
                    {
                        fieldLabel:'Razon Social',
                        allowBlank : false,
                        name : 'razonsocial',
                        
                    },
                    {
                        fieldLabel:'Contacto',
                        name :'contacto'
                       
                    },
                    {
                        fieldLabel:'Telefono',
                        name :'telefono'
                        
                    },
                    {
                        xtype:'textarea',
                        fieldLabel:'Direccion',
                        name :'direccion'
                        
                    },
                    {
                        xtype:'textarea',
                        fieldLabel:'Direccion Fiscal',
                        name :'direccionfiscal'
                        
                    }
                ],
                buttons:[
                    {
                        text :'Cancelar',
                        handler : 'onClickCancelarProveedor',
                        
                    },
                    {
                        text :'Guardar',
                        handler : 'onClickGuardarProveedorModal',
                        idcontrol : _idcontrol
                    }
                    
                ]
            }
        ];

    }
});