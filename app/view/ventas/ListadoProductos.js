Ext.define('megafilmperu.view.ventas.ListadoProductos', {
    extend: 'Ext.panel.Panel',
    xtype: 'wRegProducto',
    alias: 'widget.wRegProducto',
    requires: [
        'Ext.layout.container.HBox',
        'megafilmperu.view.ventas.AccionesRegCotizacion',
        'Ext.grid.*',
        'Ext.form.field.Number'
    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 5,
    defaults: {
        frame: true,
        bodyPadding: 5
    },
    controller:'acciones-regcotizacion',
    initComponent: function () {
        var storeProductos = Ext.create('megafilmperu.store.Productos');
        var storeUM = Ext.create('megafilmperu.store.UnidadMedida');
        var storePR = Ext.create('megafilmperu.store.Presentacion');
        var storeCA = Ext.create('megafilmperu.store.Categoria');
        storeProductos.load();
        Ext.apply(this, {
            items: [{
                    title: 'Registros',
                    flex: 3,
                    margin: '0 3 0 0',
                    layout: 'fit',
                    items: [{
                        xtype: 'grid',
                        itemId: 'dgvProductos',
                        store: storeProductos,
                        reference: 'dgvProductos',
                        sortableColumns: false,
                        columns: [{
                                text: 'Codigo',
                                dataIndex: 'codprod',
                                flex: 1,
                                align: 'center'
                            },
                            {
                                text: 'Descripcion',
                                dataIndex: 'desprod',
                                flex: 5
                            },
                            /*{
                                text: 'Stock Fisico',
                                dataIndex: 'stockprod',
                                flex: 1,
                                align: 'right'
                            },*/
                            {
                                xtype: 'numbercolumn', format:'0.00',
                                text: 'Precio Lima',
                                dataIndex: 'precioprod',
                                flex: 1,
                                align: 'right'
                            },
                            {
                                xtype: 'widgetcolumn',
                                flex: 0.5,
                                widget: {
                                    xtype: 'button',
                                    flex: 1,
                                    glyph: 0xf014,
                                    handler: 'onClickEliminarProducto'

                                }

                            }
                        ],
                        tbar: [{
                                xtype: 'fieldset',
                                title: '<b>Buscar Por</b>',
                                layout: 'hbox',
                                flex: 1,
                                padding: '0 5 10 5',
                                items: [{
                                        xtype: 'textfield',
                                        reference: 'txtBuscarCodigoProd',
                                        fieldLabel: 'Buscar Codigo',
                                        flex: 1,
                                        enableKeyEvents:true,
                                        listeners:{
                                         // focus:'onFocusTextoDeBusquedaProducto',
                                          keypress:'onKeyPressTextoDeBusquedaProducto'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        glyph: megafilmperu.util.Glyphs.getGlyph('buscar'),
                                        handler: 'onClickBuscarProductoCodigo'
                                    },
                                    {
                                        xtype: 'combo',
                                        reference: 'cboBuscarCategoriaProducto',
                                        fieldLabel: 'Familia',
                                        store: storeCA,
                                        queryMode: 'local',
                                        labelAlign:'right',
                                        displayField: 'descate',
                                        valueField: 'idcate',
                                        editable: false,
                                        listeners:{
                                           "select" : "onChangeBuscarCategoriaProducto"
                                        },
                                        flex: 1

                                    }
                                  /*  {
                                        xtype: 'textfield',
                                        reference: 'txtBuscarDescripcionProd',
                                        fieldLabel: 'Buscar Descripcion',
                                        flex: 1,
                                        labelWidth: 150,
                                        labelAlign: 'right',
                                        listeners:{
                                          focus:'onFocusTextoDeBusquedaProducto'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        glyph: megafilmperu.util.Glyphs.getGlyph('buscar'),
                                        handler: 'onClickBuscarProductoDescripcion'
                                    }*/
                                ]


                            },

                        ],
                        listeners: {
                             itemclick: 'onClickItemProducto'
                        }

                    }]
                },
                {
                    title: 'Informacion',
                    flex: 1.5,
                    margin: '0 10 0 0',
                    autoScroll: true,
                    items: [{
                        xtype: 'form',
                        reference: 'myFrmProducto',
                        url : megafilmperu.util.Rutas.productoGuardar,
                        layout: {
                            type: 'vbox',
                            pack: 'start',
                            align: 'stretch'
                        },
                        items: [{
                                xtype: 'hiddenfield',
                                name: 'idprod',
                                itemId:'idprod'

                            },
                            {
                                xtype: 'label',
                                text: 'Codigo',

                            },
                            {
                                xtype: 'textfield',
                                name: 'codprod',
                                itemId:'codprod',
                                allowBlank: false,

                            },
                            {
                                xtype: 'label',
                                text: 'Descripcion'
                            },
                            {
                                xtype: 'textfield',
                                name: 'desprod',
                                allowBlank: false,

                            },
                            {
                              xtype:'container',
                              layout:'hbox',
                              padding:'5px 5px 5px 5px',
                              items:[
                                {
                                    xtype: 'combo',
                                    name: 'idpres',
                                    fieldLabel:'Presentación',
                                    store: storePR,
                                    queryMode: 'local',
                                    displayField: 'despres',
                                    valueField: 'idpres',
                                    editable: false,
                                    flex: 4,
                                    itemId:'cboPresentacion'
                                },
                                {
                                  xtype: 'button',
                                  glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
                                  handler: 'onClickMantenimiento',
                                  flex: 0.5
                                }
                              ]
                            },
                            {
                                xtype: 'textfield',
                                name: 'presenprod',
                                allowBlank: true,

                            },
                            {
                             xtype:'container',
                             layout:'hbox',
                             padding:'5px 5px 5px 5px',
                             items:[
                               {
                                  xtype: 'combo',
                                  name: 'idumed',
                                  fieldLabel:'Unidad Medida',
                                  store: storeUM,
                                  queryMode: 'local',
                                  displayField: 'descripcion',
                                  valueField: 'idumed',
                                  editable: false,
                                  hidden:false
                              },
                               {
                                 xtype: 'button',
                                 glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
                                 handler: 'onClickMantenimiento',
                                 flex: 0.5
                               }
                             ]
                           },

                            {
                                xtype:'container',
                                layout:'hbox',
                                flex: 1,
                                padding : '0 0 5 0',
                                items:[
                                    {

                                        xtype:'numberfield',
                                        fieldLabel:'Precio Publico Lima',
                                        name : 'precioprod',
                                        flex: 1,
                                        allowDecimals: true,
                                        decimalSeparator: '.',
                                        decimalPrecision:2,
                                        step:'0.1',
                                        labelWidth:170,
                                        value : 0

                                     },{
                                        xtype:'numberfield',
                                        name : 'stockprod',
                                        fieldLabel:'Stock',
                                        labelAlign:'right',
                                        flex: 1,
                                        align:'right',
                                        value : 0,
                                        allowNegative: true,
                                         hideTrigger: true,
                                         hidden:true
                                    }
                                ]
                            },
                            {

                                xtype:'numberfield',
                                fieldLabel:'Precio Especial Lima 1',
                                name : 'precioprodlocalespecial',
                                flex: 1,
                                allowDecimals: true,
                                decimalSeparator: '.',
                                decimalPrecision:2,
                                step:'0.1',
                                labelWidth:170,
                                value : 0,


                             },
                             {

                                 xtype:'numberfield',
                                 fieldLabel:'Precio Especial Lima 2',
                                 name : 'precioprodlocalespecial2',
                                 flex: 1,
                                 allowDecimals: true,
                                 decimalSeparator: '.',
                                 decimalPrecision:2,
                                 step:'0.1',
                                 labelWidth:170,
                                 value : 0,


                              },
                              {
                                  xtype:'numberfield',
                                  fieldLabel:'Precio Especial Lima 3',
                                  name : 'precioprodlocalespecial3',
                                  flex: 1,
                                  allowDecimals: true,
                                  decimalSeparator: '.',
                                  decimalPrecision:2,
                                  step:'0.1',
                                  labelWidth:170,
                                  value : 0,
                               },
                             {

                                 xtype:'numberfield',
                                 fieldLabel:'Precio Provincia',
                                 name : 'precioprodprovincia',
                                 flex: 1,
                                 allowDecimals: true,
                                 decimalSeparator: '.',
                                 decimalPrecision:2,
                                 step:'0.1',
                                 labelWidth:170,
                                 value : 0
                              },
                              {

                                  xtype:'numberfield',
                                  fieldLabel:'Precio Especial Provincia 1',
                                  name : 'precioprodprovinciaespecial',
                                  flex: 1,
                                  allowDecimals: true,
                                  decimalSeparator: '.',
                                  decimalPrecision:2,
                                  step:'0.1',
                                  labelWidth:170,
                                  value : 0
                              },
                              {

                                  xtype:'numberfield',
                                  fieldLabel:'Precio Especial Provincia 2',
                                  name : 'precioprodprovinciaespecial2',
                                  flex: 1,
                                  allowDecimals: true,
                                  decimalSeparator: '.',
                                  decimalPrecision:2,
                                  step:'0.1',
                                  labelWidth:170,
                                  value : 0
                              },
                              {

                                  xtype:'numberfield',
                                  fieldLabel:'Precio Especial Provincia 3',
                                  name : 'precioprodprovinciaespecial3',
                                  flex: 1,
                                  allowDecimals: true,
                                  decimalSeparator: '.',
                                  decimalPrecision:2,
                                  step:'0.1',
                                  labelWidth:170,
                                  value : 0
                              },
                              {

                                  xtype:'numberfield',
                                  fieldLabel:'Precio Distribuidor Lima',
                                  name : 'precioproddistribuidorlima',
                                  flex: 1,
                                  allowDecimals: true,
                                  decimalSeparator: '.',
                                  decimalPrecision:2,
                                  step:'0.1',
                                  labelWidth:170,
                                  value : 0
                              },
                              {

                                  xtype:'numberfield',
                                  fieldLabel:'Precio Distribuidor Provincia',
                                  name : 'precioproddistribuidorprovincia',
                                  flex: 1,
                                  allowDecimals: true,
                                  decimalSeparator: '.',
                                  decimalPrecision:2,
                                  step:'0.1',
                                  labelWidth:170,
                                  value : 0
                              },
                              {
                                  xtype:'container',
                                  layout:'hbox',
                                  padding:'5px 5px 5px 5px',
                                  items:[
                                    {
                                       xtype: 'combo',
                                       name: 'idcate',
                                       fieldLabel:'Familia',
                                       store: storeCA,
                                       queryMode: 'local',
                                       displayField: 'descate',
                                       valueField: 'idcate',
                                       editable: false,
                                       allowBlank:false,
                                       flex : 4,
                                       itemId:'cboCategoria'
                                    },
                                    {
                                      xtype: 'button',
                                      glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
                                      handler: 'onClickMantenimiento',
                                      flex: 0.5
                                    }
                                  ]
                              },
                            {
                                xtype: 'label',
                                text: 'Marca'
                            },
                            {
                                xtype: 'textfield',
                                name: 'marcaprod',
                                allowBlank: true

                            },
                                                        {
                                xtype: 'label',
                                text: 'Procedencia'
                            },
                            {
                                xtype: 'textfield',
                                name: 'procedencia',
                                allowBlank: true

                            },
                            {
                                xtype:'container',
                                layout:'hbox',
                                flex: 1,
                                padding : '0 0 5 0',
                                items:[
                                    {

                                        xtype:'textfield',
                                        fieldLabel:'Equivalencia',
                                        name : 'evaleprod',
                                        flex: 1
                                    },{
                                        xtype:'textfield',
                                        name : 'rendimientoplacas',
                                        fieldLabel:'Rendimiento Placas',
                                        labelWidth:120,
                                        labelAlign:'right',
                                        flex: 1
                                    }
                                ]
                            }
                        ],
                        bbar: [
                          '->',
                          {
                                xtype: 'button',
                                text: 'Nuevo',
                                iconCls: 'fa fa-file fa-2x',
                                scale: 'medium',
                                handler: 'onClickNuevoProducto'
                            },
                            {
                                xtype: 'button',
                                text: 'Grabar',
                                iconCls: 'fa fa-thumbs-o-up fa-2x',
                                scale: 'medium',
                                handler: 'onClickGuardarProducto'
                            }

                        ]

                    }]

                }

            ]
        });
        this.callParent();
    }
});
