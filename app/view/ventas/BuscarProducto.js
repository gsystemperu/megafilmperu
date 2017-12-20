Ext.define('megafilmperu.view.ventas.BuscarProducto', {
    extend: 'Ext.window.Window',
    alias: 'widget.wBuscarProducto',
    xtype: 'wBuscarProducto',
    requires: [
      'megafilmperu.view.ventas.AccionesRegCotizacion'
    ],
    config : {
      cliente : 0
    },
    autoShow: true,
    width: 1100,
    height: 600,
    title: ' :: Buscar Producto :: ',
    iconCls: 'fa fa-address-card-o fa-2x',
    controller: 'acciones-regcotizacion',
    bodyPadding: 5,
    modal: true,
    layout: {
        type: 'fit',
        align: 'stretch',
        pack: 'start'
    },

    initComponent: function () {
        var store = Ext.create('megafilmperu.store.ProductosPorPrecioPersona');
        me        = this;
        store.getProxy().extraParams={vIdCliente : me.getCliente()};
        store.load();
        me = this;
        Ext.apply(me, {
            items: [
                  {
                    xtype:'hiddenfield',
                    itemId:'tipopreciopersona',
                    reference :'tipopreciopersona',
                    value : me.getCliente()
                  },
                  {
                    xtype: 'grid',
                    reference: 'dgvBuscarProducto',
                    store:store,
                    columns: [
                       {
                            text:'Producto',
                            width : 250,
                            dataIndex:'nombre',
                            locked: true
                        },
                        {
                            text:'Unidad Medida',
                            dataIndex:'unidadmedida',
                            width : 180,
                            locked : true
                        },
                        {
                            text:'Talla',
                            width : 150,
                            dataIndex:'talla',
                            align : 'right'
                        },
                        {
                            text:'Color',
                            width : 150,
                            dataIndex:'color',
                            align : 'right'
                        },
                        {
                            text:'Medidas',
                            width : 150,
                            dataIndex:'medida',
                            align : 'right'
                        },
                        {
                            text:'Presentacion',
                            width : 150,
                            dataIndex:'presentacion',
                            align : 'right'
                        }

                    ],
                     features: [{

                        ftype: 'grouping',
                        groupHeaderTpl: '{name}',
                        hideGroupedHeader: true,
                        startCollapsed: true
                    }],
                     listeners: {
                            cellclick: 'onClickRowProducto'
                        }
                }

            ],
            tbar:[
                {
                    xtype:'textfield',
                    fieldLabel :'<b>Producto</b>',
                    reference : 'txtProductoNombre',
                    flex: 1,
                    selectOnFocus:true,
                    enableKeyEvents : true,
                    listeners:{
                      keypress:'onKeyPressTextoDeBusquedaProducto2'
                    }
                },
                {
                    xtype:'button',
                    glyph: megafilmperu.util.Glyphs.getGlyph('buscar'),
                    handler :'onClickBuscarProductoPorNombre'

                }
            ]

        });
        me.callParent();
    }
});
