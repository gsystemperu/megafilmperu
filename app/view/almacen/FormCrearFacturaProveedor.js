Ext.define('megafilmperu.view.almacen.FormCrearFacturaProveedor', {
    extend: 'Ext.panel.Panel',
    xtype :'wFormCrearFacturaProveedor',
    alias: 'widget.wFormCrearFacturaProveedor',
    requires: [
        'Ext.grid.plugin.*',
        'Ext.form.field.*',
        'Ext.layout.container.*',
        'Ext.container.ButtonGroup',
        'megafilmperu.util.Rutas',
        'Ext.grid.plugin.RowEditing'
    ],
    bodyPadding: 5,
    controller: 'acciones-FacturaProveedor',
    initComponent: function () {
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        //var storeClientes = Ext.create('megafilmperu.store.Clientes');
        var storeProveedores = Ext.create('megafilmperu.store.Proveedores');
        var storeDetCotizacion = Ext.create('megafilmperu.store.DetalleCotizacion');
        var storeFormaPago = Ext.create('megafilmperu.store.FormaPago');
        var storeModoEntrega = Ext.create('megafilmperu.store.ModoEntrega');
        var storeDocumentoVenta = Ext.create('megafilmperu.store.DocumentoVenta');
        var storeMoneda         = Ext.create('megafilmperu.store.Monedas');
        
        me = this;
        Ext.applyIf(me, {
            items: [{
                    xtype: "form",
                    itemId: 'frmRegFacturaProveedor',
                    reference: 'frmRegFacturaProveedor',
                    url: megafilmperu.util.Rutas.facturacionGuardarCompra,
                    items: [{
                            xtype: 'panel',
                            flex: 1,
                            frame: false,
                            border: false,
                            items: [{
                                    xtype: 'hiddenfield',
                                    itemId: 'txtJsonDetalleFacturacion',
                                    name: 'jsondetalle'
                                },
                                {
                                  xtype: 'hiddenfield',
                                  name: 'idfacturacion',
                                  value: 0
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'idordencompra',
                                    itemId : 'idordencompra',
                                    value: 0
                                },
                                {
                                    xtype :'hiddenfield',
                                    name : 'tipofactura',
                                    itemId: 'tipofactura'
                                },
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    title: 'Datos Generales',
                                    layout: 'fit',
                                    items: [{
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '0 0 5 6',
                                            columnWidth: 0.5,
                                            defaults:{
                                                labelWidth: 150
                                            },
                                            items: [{
                                                    xtype: 'combobox',
                                                    itemId: 'cboProveedorFactura',
                                                    name : 'idprov',
                                                    fieldLabel: 'Nombre / Razon Social',
                                                    flex: 2,
                                                    fieldStyle: 'text-transform:uppercase',
                                                   
                                                    allowBlank: false,
                                                    editable: true,
                                                    forceSelection : true,
                                                    store: storeProveedores,
                                                    queryMode: 'local',
                                                    valueField: 'id',
                                                    displayField: 'razonsocial',
                                                    readOnly:true,
                                                    fieldStyle :'font-size:20px;'
                                                },
                                                
                                                 {

                                                    xtype: 'datefield',
                                                    fieldLabel: 'Fecha Registro',
                                                    value: new Date(),
                                                    labelAlign: 'right',
                                                    flex: 1,
                                                    name: 'fecharegistro',
                                                    allowBlank:false

                                                },
                                                {

                                                    xtype: 'datefield',
                                                    fieldLabel: 'Fecha Emisión',
                                                    value: new Date(),
                                                    labelAlign: 'right',
                                                    flex: 1,
                                                    name: 'fechaemision',
                                                    allowBlank:false
                                                },
                                                {
                                                  xtype:'datefield',
                                                  fieldLabel :'Fecha Vencimiento',
                                                  labelAlign :'right',
                                                  editable:false,
                                                  value : new Date(),
                                                  flex: 1,
                                                  name :'validohasta'
                                                },
                                                {

                                                    xtype: 'hiddenfield',
                                                    fieldLabel: 'Referencia',
                                                    labelAlign: 'right',
                                                    itemId: 'txtReferencia',
                                                    name   : 'vreferencia',
                                                }


                                            ]
                                        },

                                    ]

                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 80,
                                        //  padding:'0 5 0 0'
                                    },
                                    items: [{
                                            xtype: 'combo',
                                            fieldLabel: 'Forma Pago',
                                            store: storeFormaPago,
                                            displayField: 'descripcion',
                                            valueField: 'idfopag',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            name: 'idfopag',
                                            editable:false,
                                            itemId:'idfopag',
                                            value : 1,
                                            flex:1

                                        },
                                        {
                                            xtype: 'button',
                                            glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
                                            handler: 'onClickMantenimiento'
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Moneda',
                                            store: storeMoneda,
                                            itemId : 'cboMoneda',
                                            displayField: 'descripcion',
                                            valueField: 'id',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            name: 'idmoneda',
                                            labelAlign:'right',
                                            editable:false,
                                            value : 1,
                                            flex:1,
                                        },
                                        {
                                            xtype: 'button',
                                            glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
                                            handler: 'onClickMantenimiento'
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Documento',
                                            store: storeDocumentoVenta,
                                            displayField: 'descripcion',
                                            valueField: 'id',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            name: 'documentoventa',
                                            labelAlign:'right',
                                            editable:false,
                                            itemId:'documentoventa',
                                            value : 1,
                                            flex:1

                                        },
                                        {
                                            xtype: 'button',
                                            glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
                                            handler: 'onClickMantenimiento'
                                        },
                                        {
                                          xtype:'textfield',
                                          fieldLabel :'<b>Serie / Número</b>',
                                          labelAlign :'right',
                                          name : 'seriedoc',
                                          value : '001',
                                          flex : 0.5,
                                          labelWidth : 150,
                                          allowBlank:false,
                                          itemId : 'txtSerieNumero',
                                          fieldStyle : 'color:#ffffff;font-Size:15px;background-color:#9a9ba8;text-align:center;'
                                        },
                                        {
                                          xtype:'textfield',
                                          labelAlign :'right',
                                          name : 'numerodoc',
                                          itemId : 'txtNumeroDoc',
                                          flex : 0.5,
                                          allowBlank:false,
                                          fieldStyle : 'color:#ffffff;font-Size:15px;background-color:#9a9ba8;text-align:center;'
                                        },
                                    ]


                                },
                                {
                                  xtype:'numberfield',
                                  padding : '5 5 5 5',
                                  fieldLabel :'A Cuenta',
                                  name : 'pagoacuenta',
                                  value : 0,
                                  //flex : 2,
                                  labelWidth : 75
                                },


                                {
                                    xtype: 'fieldset',
                                    columnWidth: 0.1,
                                    title: 'Detalle',
                                    defaultType: 'textfield',
                                    items: [{
                                            xtype: 'container',
                                            margin: '0 0 0 -5',
                                            layout: 'fit',
                                            frame: true,
                                            border: false,
                                            items: [


                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    padding: '0 0 5 0',
                                                    items: [
                                                        /* {
                                                              xtype: 'label',
                                                              text: 'Buscar Producto',
                                                              width: 120,
                                                              height: 23,
                                                              style: {
                                                                  paddingTop: '3px',
                                                                  background: '#775c80',
                                                                  color: 'white',
                                                                  textAlign: 'center',
                                                                  fontWeight: 'bold',
                                                                  fontSize: '13px'
                                                              }
                                                          },
                                                        {
                                                            xtype: 'button',
                                                            glyph: megafilmperu.util.Glyphs.getGlyph('buscar'),
                                                           // handler: 'onClickBuscarProducto',
                                                            tooltip : 'Accion para buscar los productos ingresados'
                                                            //flex: 1
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
                                                            //handler: 'onClickNuevoProductoPorCotizacion',
                                                            tooltip : 'Accion para agregar un nuevo producto'
                                                            //flex: 0.5
                                                        },*/
                                                        {
                                                          xtype:'container',
                                                          layout:'hbox',
                                                          items:[
                                                            {
                                                              xtype: 'label',
                                                              text: 'Nro. Orden Compra :',
                                                              width: 120,
                                                              height: 23,
                                                              style: {
                                                                  paddingTop: '3px',
                                                                  background: '#775c80',
                                                                  color: 'white',
                                                                  textAlign: 'center',
                                                                  fontWeight: 'bold',
                                                                  fontSize: '13px'
                                                              }
                                                            },
                                                            {
                                                              xtype:'textfield',
                                                              flex : 1,
                                                              readOnly : true,
                                                              fieldStyle: 'text-align: center;font-size:15px;font-weight:bold; ',
                                                              name : 'occodigo'
                                                            },
                                                            {
                                                                xtype: 'label',
                                                                text: 'Tipo de Cambio :',
                                                                width: 120,
                                                                itemId : 'lblTipoCambio',
                                                                height: 23,
                                                                style: {
                                                                    paddingTop: '3px',
                                                                    background: '#775c80',
                                                                    color: 'white',
                                                                    textAlign: 'center',
                                                                    fontWeight: 'bold',
                                                                    fontSize: '13px'
                                                                }
                                                              },
                                                              {
                                                                xtype:'textfield',
                                                                flex : 1,
                                                                readOnly : false,
                                                                fieldStyle: 'text-align: center;font-size:15px;font-weight:bold; ',
                                                                name : 'tipocambio',
                                                                itemId : 'txtTipoCambio',
                                                                value : 0 
                                                              }
                                                          ]

                                                        }

                                                    ]
                                                }


                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'fit',
                                            margin: '0 0 5 0',
                                            items: [{
                                                xtype: 'grid',
                                                flex: 1,
                                                reference: 'dgvDetalleFacturaProveedor',
                                                itemId: 'dgvDetalleFacturaProveedor',
                                                store: storeDetCotizacion,
                                                plugins: [rowEditing],
                                                selModel: 'cellmodel',
                                                plugins: {
                                                    ptype: 'cellediting',
                                                    clicksToEdit: 1
                                                },
                                                columns: [{
                                                        text: 'Descripción',
                                                        dataIndex: 'descripcion',
                                                        flex: 3
                                                    },
                                                    {
                                                        xtype:'numbercolumn',
                                                        text: 'Cantidad',
                                                        dataIndex: 'cantidad',
                                                        flex: 0.5,
                                                        align: 'center',
                                                        editor: {
                                                            xtype: 'numberfield',
                                                            value: 0,
                                                            maxValue: 1000,
                                                            minValue: 0,
                                                            itemId: 'txtCantidadUnidad'

                                                        }
                                                    },
                                                    {
                                                        xtype:'numbercolumn',
                                                        text: 'Precio',
                                                        dataIndex: 'precio',
                                                        flex: 0.6,
                                                        align: 'center',
                                                        editor: {
                                                            xtype: 'numberfield',
                                                            format: '0.00',
                                                            decimalPrecision: 2,
                                                            decimalSeparator: '.'
                                                        }
                                                    },
                                                    {
                                                        xtype:'numbercolumn',
                                                        text: 'Total',
                                                        dataIndex: 'total',
                                                        flex: 0.5,
                                                        align: 'center'

                                                    },
                                                    {
                                                        xtype: 'widgetcolumn',
                                                        flex: 0.2,
                                                        widget: {
                                                            xtype: 'button',
                                                            width: 24,
                                                            glyph: 0xf014,
                                                            listeners: {
                                                                click: 'onClickEliminarDetalle'
                                                            }
                                                        }

                                                    }

                                                ],
                                                cls: '',
                                                height: 300,
                                                listeners: {
                                                    edit: 'onEditorCalcularTotal'
                                                }

                                            }]

                                        }
                                    ]

                                }, // fin fieldset Detalle
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            flex: 2.5,
                                            frame : false,
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            items: [{
                                                    xtype: 'textfield',
                                                    itemId: 'txtSubtotalventasFacturarProv',
                                                    name: 'valventacont',
                                                    value: "0.00",
                                                    fieldLabel: 'Sub Total',
                                                    readOnly: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    fieldStyle: 'text-align: right;',
                                                    hidden:false
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Igv',
                                                    itemId: 'txtIgvventasFacturarProv',
                                                    name: 'valigvcont',
                                                    value: "0.00",
                                                    fieldStyle: 'text-align: right;',
                                                    minValue: 0,
                                                    readOnly: true,
                                                    enableKeyEvents: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    hidden:false
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Total General ',
                                                    itemId: 'txtTotalGeneralFacturarProv',
                                                    value: "0.00",
                                                    name: 'valtotalcont',
                                                    minValue: 0,
                                                    readOnly: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    fieldStyle: 'text-align: right;'
                                                }
                                            ]
                                        }

                                    ]

                                },
                                {
                                    xtype: 'panel',
                                    buttons: [{
                                            xytpe: 'button',
                                            text: 'Cancelar',
                                            scale: 'medium',
                                            handler: 'onClickCancelarFacturaAproveedor'
                                        }, '-',
                                        {
                                            xytpe: 'button',
                                            text: 'Guardar',
                                            scale: 'medium',
                                            handler: 'onClickGuardarFacturaAproveedor'
                                        }


                                    ]


                                }
                            ]

                        }

                    ]
                }


            ]
        });

        me.callParent(arguments);
        
    }
});
