Ext.define('megafilmperu.view.ventas.RegistrarCotizacion', {
  extend: 'Ext.panel.Panel',
  xtype: 'wRegistrarCotizacion',
  alias: 'widget.wRegistrarCotizacion',
  requires: [
    'Ext.grid.plugin.*',
    'Ext.form.field.*',
    'megafilmperu.util.Rutas',
    'Ext.grid.plugin.RowEditing'
  ],
  itemId: 'wRegistrarCotizacion',
  bodyPadding: 5,
  controller: 'acciones-regcotizacion',
  initComponent: function () {
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
      clicksToMoveEditor: 1,
      autoCancel: false
    });

    var storeClientes = Ext.create('megafilmperu.store.Clientes');
    var storeProductos = Ext.create('megafilmperu.store.Productos');
    var storeDetCotizacion = Ext.create('megafilmperu.store.DetalleCotizacion');
    var storeFormaPago = Ext.create('megafilmperu.store.FormaPago');
    var storeModoEntrega = Ext.create('megafilmperu.store.ModoEntrega');
    var storeVendedores = Ext.create('megafilmperu.store.Vendedores');

    me = this;
    Ext.applyIf(me, {
      items: [{
          xtype: "form",
          itemId: 'frmRegCotizacion',
          reference: 'frmRegCotizacion',
          url: megafilmperu.util.Rutas.cotizacionGuardar,
          items: [{
              xtype: 'panel',
              flex: 1,
              frame: false,
              border: false,
              items: [{
                  xtype: 'hiddenfield',
                  itemId: 'txtJsonDetalle',
                  name: 'vjsondetalle'
                },
                {
                  xtype: 'hiddenfield',
                  name: 'vid',
                  itemId: 'vid',
                  value: 0
                },
                {
                  xtype: 'fieldset',
                  defaultType: 'textfield',
                  layout: 'fit',
                  items: [{
                      xtype: 'container',
                      layout: {
                        type: 'vbox',
                        align: 'stretch'
                      },
                      margin: '0 0 5 6',
                      columnWidth: 0.5,
                      items: [{
                          xtype: 'container',
                          layout: {
                            type: 'hbox',
                            align: 'stretch'
                          },
                          padding: '5 0 5 0',
                          items: [{
                              xtype: 'combobox',
                              itemId: 'cboDatosCliente',
                              name: 'idper',
                              fieldLabel: 'Nombre / Razon Social',
                              flex: 3,
                              fieldStyle: 'text-transform:uppercase',
                              labelWidth: 150,
                              allowBlank: false,
                              editable: false,
                              forceSelection: true,
                              store: storeClientes,
                              queryMode: 'local',
                              displayField: 'nombreper',
                              valueField: 'idper'
                            },
                            {
                              xtype: 'button',
                              glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
                              handler: 'onClickNuevoCliente',
                              flex: 0.5
                            },
                          ]
                        },
                        {
                          xtype: 'container',
                          layout: {
                            type: 'hbox',
                            align: 'stretch'
                          },
                          padding: '5 0 5 0',
                          defaults:{
                            labelWidth : 200
                          },
                          items: [{

                              xtype: 'datefield',
                              fieldLabel: 'Fecha Venta',
                              value: new Date(),
                              labelAlign: 'left',
                              flex: 1,
                              itemId: 'dtFechaVenta',
                              name: 'vfecha'

                            },
                            {
                              xtype: 'datefield',
                              fieldLabel: 'Válido Hasta',
                              labelAlign: 'right',
                              editable: false,
                              name: 'fechavalidohasta',
                              value: new Date(),
                              flex: 1,
                            },
                            {

                              xtype: 'textfield',
                              fieldLabel: 'Referencia',
                              labelAlign: 'right',
                              flex: 1,
                              itemId: 'txtReferencia',
                              name: 'vreferencia',
                              hidden: true

                            },
                            {
                              xtype: 'combo',
                              fieldLabel: 'Forma Pago',
                              store: storeFormaPago,
                              displayField: 'descripcion',
                              valueField: 'idfopag',
                              queryMode: 'local',
                              allowBlank: false,
                              name: 'vformapago',
                              editable: false,
                              itemId: 'idfopag',
                              value: 1,
                              flex: 1,
                              labelAlign: 'right'

                            },
                            {
                              xtype: 'button',
                              glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
                              handler: 'onClickMantenimiento'
                            },
                            {
                              xtype: 'combo',
                              fieldLabel: 'Modo de Entrega',
                              store: storeModoEntrega,
                              displayField: 'descripcion',
                              valueField: 'idmodo',
                              queryMode: 'local',
                              allowBlank: false,
                              name: 'vmodoentrega',
                              labelAlign: 'right',
                              editable: false,
                              itemId: 'vmodoentrega',
                              value: 1,
                              flex: 1,
                            },
                            {
                              xtype: 'button',
                              glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
                              handler: 'onClickMantenimiento'
                            }


                          ]
                        }



                      ]
                    },

                  ]

                },
                {
                  xtype: 'container',
                  layout: 'hbox',
                  hidden: true,
                  defaults: {
                    labelWidth: 120,

                  },
                  items: [{
                      xtype: 'combo',
                      fieldLabel: 'Asignar a Vendedor',
                      store: storeVendedores,
                      displayField: 'completo',
                      valueField: 'idvend',
                      queryMode: 'local',
                      allowBlank: true,
                      name: 'vvendedor',
                      labelAlign: 'right',
                      editable: false,
                      itemId: 'vvendedor',
                      hidden: true

                    },
                    {
                      xtype: 'button',
                      glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
                      handler: 'onClickMantenimiento'
                    },

                  ]


                },


                {
                  xtype: 'fieldset',
                  columnWidth: 0.1,
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
                          items: [{
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
                              handler: 'onClickBuscarProducto',
                              tooltip: 'Accion para buscar los productos ingresados'
                              //flex: 1
                            },
                            {
                              xtype: 'container',
                              layout: 'hbox',
                              items: [{
                                  xtype: 'label',
                                  text: 'Nro. Cotizacion :',
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
                                  xtype: 'textfield',
                                  flex: 1,
                                  disabled: true,
                                  fieldStyle: 'text-align: center;font-size:15px;font-weight:bold; ',
                                  value: 'CT000000000000',
                                  name: 'ctcodigo'
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
                        reference: 'dgvDetalleVenta',
                        itemId: 'dgvDetalleVenta',
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
                            xtype: 'numbercolumn',
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

                            xtype: 'numbercolumn',
                            text: 'Cant. Fracción',
                            dataIndex: 'cantidadfraccion',
                            hidden: true,
                            flex: 0.5,
                            align: 'center',
                            editor: {
                              xtype: 'numberfield',
                              value: 0,
                              maxValue: 1000,
                              minValue: 0,
                              itemId: 'txtCantidadFraccion'

                            }
                          },
                          {

                            xtype: 'numbercolumn',
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

                            xtype: 'numbercolumn',
                            text: 'Total',
                            dataIndex: 'total',
                            flex: 0.5,
                            align: 'center'

                          },
                          {
                            xtype: 'datecolumn',
                            dataIndex: 'vencimiento',
                            hidden: true,
                            flex: 0.5,
                            format: 'd/m/Y',
                            text: 'Vencimiento',
                            editor: {
                              xtype: 'datefield',
                              format: 'd/m/Y',
                              value: new Date()
                            }
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
                  items: [{
                      xtype: 'panel',
                      frame: false,
                      flex: 1,
                      padding: '5 10 5 5',
                      // html: '<div style="text-aling:center;"> <img src="resources/images/lgsis.png" width="100" height="50"> </div>',
                      items: [{
                        xtype: 'container',
                        layout: 'hbox',
                        hidden: true,
                        items: [{
                          xtype: 'checkboxfield',
                          boxLabel: 'Precio incluye el I.G.V.',
                          name: 'vincluyeigv',
                          itemId: '_incluyeigv',
                          //readOnly:true,
                          value: 0,
                          /*listeners: {
                              change: {
                                  fn: 'onSelectedIncluyeIGV'
                              }
                          }*/

                        }]
                      }]
                    },
                    {
                      xtype: 'textarea',
                      flex: 1.9,
                      height: 100,
                      name: 'comentario',
                      empyText: 'Algun comentario para esta cotización',
                      fieldStyle: 'font-size:12px;text-transform:uppercase;'

                    },
                    {
                      xtype: 'panel',
                      flex: 1,
                      padding: '0 0 0 0',
                      items: [{
                          xtype: 'textfield',
                          itemId: 'txtSubtotalventas',
                          name: 'valventacont',
                          value: "0.00",
                          fieldLabel: 'Sub Total',
                          readOnly: true,
                          width: 280,
                          labelWidth: 120,
                          fieldStyle: 'text-align: right;',
                          labelAlign: 'right',
                          fieldStyle: 'text-align: right;font-size:16px;',


                        },
                        {
                          xtype: 'textfield',
                          fieldLabel: 'Igv',
                          itemId: 'txtIgvventas',
                          name: 'valigvcont',
                          value: "0.00",
                          readOnly: true,
                          enableKeyEvents: true,
                          width: 280,
                          labelWidth: 120,
                          labelAlign: 'right',
                          fieldStyle: 'text-align: right;font-size:16px;'

                        },
                        {
                          xtype: 'textfield',
                          fieldLabel: 'Total ',
                          labelAlign: 'right',
                          itemId: 'txtTotalGeneral',
                          value: "0.00",
                          name: 'valtotalcont',
                          minValue: 0,
                          readOnly: true,
                          width: 280,
                          labelWidth: 120,
                          fieldStyle: 'text-align: right;font-size:16px;',

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
                      handler: 'onClickSalirCotizacion'
                    }, '-',
                    {
                      xytpe: 'button',
                      text: 'Guardar',
                      scale: 'medium',
                      handler: 'onClickGuardarCotizacion'
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
