Ext.define('megafilmperu.view.almacen.FormProducto', {
  extend: 'Ext.form.Panel',
  alias: 'widget.wFormProducto',
  xtype: 'wFormProducto',
  itemId: 'wFormProducto',
  requires: [
    'Ext.form.field.*',
    'megafilmperu.util.Rutas',
    'megafilmperu.view.almacen.AccionesProducto',

  ],
  reference: 'myFrmProducto',
  margin: 30,
  autoScroll: true,
  controller: 'acciones-producto',
  submitEmptyText: false,
  url: megafilmperu.util.Rutas.productoGuardar,
  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },
  initComponent: function () {
    me = this;
    var storeColores = Ext.create('megafilmperu.store.Colores');
    var storeMedida = Ext.create('megafilmperu.store.Medidas');
    var storeUnidadMedida = Ext.create('megafilmperu.store.UnidadDeMedidas');
    var storeTipoProd = Ext.create('megafilmperu.store.TipoDeProductos');
    var storeProveedores = Ext.create('megafilmperu.store.Proveedores');
    var storePresentacion = Ext.create('megafilmperu.store.Presentacion');
    Ext.apply(me, {
      items: me.getFormularioProducto(storeColores, storeMedida, storeUnidadMedida, storeTipoProd, storeProveedores, storePresentacion),
      bbar: [
        '->',
        {
          xtype: 'button',
          text: 'Cancelar',
          scale: 'medium',
          handler: 'onClickCancelarProducto'
        },
        {
          xtype: 'button',
          text: 'Grabar',
          scale: 'medium',
          handler: 'onClickGuardarProducto'
        }

      ]
    });
    me.callParent(arguments);
  },
  getFormularioProducto: function (storeColores, storeMedida, storeUnidadMedida, storeTipoProd, storeProveedores, storePresentacion) {
    _storeDetProvProd = Ext.create('megafilmperu.store.DetProductoProveedor', {});
    _storePlanContable = Ext.create('megafilmperu.store.PlanContable');
    var obj = [
      /*{
          xtype: 'label',
          text :'Producto / Nuevo',
          padding:0,
          border: false,
          flex: 1,
          //height : 30,
          padding:'5 5 5 5',
          style: {
            color: '#775c80',
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: '15px'
          }
        },*/
      {
        xtype: 'hiddenfield',
        name: 'id',
        value: 0
      },
      {
        xtype: 'hiddenfield',
        name: 'jsondetalle',
        itemId: 'jsondetalle'
      },
      {
        xtype: 'label',
        text :'Producto/Nuevo',
        itemId: 'lblTituloProducto',
        
        //flex: 1,
        /*height : 10,*/
        style: {
          color: '#775c80',
          textAlign: 'left',
          fontWeight: 'bold',
          fontSize: '20px'
        }
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Codigo Producto',
        name: 'codigoproducto',
        itemId: 'codigoserie'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Codigo Barras',
        name: 'codigobarras'
      },
      {
        xtype: 'textfield',
        fieldLabel: 'Nombre',
        name: 'nombre',
        allowBlank: false,
        fieldStyle: 'font-size:20px;text-transform: uppercase;background-color:#c1c1c1;border:false;'
      },
      {
        xtype: 'container',
        layout: {
          type: 'hbox',
          anchor: '100%'
        },
        padding: '0 0 5 0',
        items: [{
            xtype: 'combo',
            fieldLabel: 'Tipo Producto',
            name: 'idtipoproducto',
            itemId: 'tipoproducto',
            displayField: 'descripcion',
            valueField: 'id',
            queryMode: 'local',
            editable: false,
            flex: 1,
            store: storeTipoProd,
            emptyText: '---- Seleccionar -----',
            allowBlank: false
          },
          {
            xtype: 'button',
            glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
            handler: 'onClickMantenimientoProducto'
          },
          {
            xtype: 'button',
            glyph: megafilmperu.util.Glyphs.getGlyph('refrescar'),
            handler: 'onClickRefrescarCombo',
            combo: 'tipoproducto'
          },
        ]

      },
      {
        xtype: 'container',
        layout: {
          type: 'hbox',
          align: 'stretch'
        },
        padding: '0 0 10 0',
        defaultType: 'combo',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Talla',
            name: 'talla',
            flex: 2

          },
          {
            fieldLabel: 'Color',
            name: 'idcolor',
            itemId: 'cboColor',
            flex: 2,
            store: storeColores,
            valueField: 'id',
            displayField: 'descripcion',
            queryMode: 'local',
            editable: false,
            emptyText: '---- Seleccionar -----',
            labelAlign: 'right',
            labelWidth: 125
          },
          {
            xtype: 'button',
            glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
            handler: 'onClickMantenimientoProducto'
          },
          {
            xtype: 'button',
            glyph: megafilmperu.util.Glyphs.getGlyph('refrescar'),
            combo: 'cboColor',
            handler: 'onClickRefrescarCombo'
          },
        ]
      },
      {
        xtype: 'container',
        layout: {
          type: 'hbox',
        },
        padding: '0 0 10 0',
        defaultType: 'combo',
        items: [{
            fieldLabel: 'Unidad Medida',
            name: 'idunidadmedida',
            itemId: 'cboUnidadMedida',
            flex: 1,
            store: storeUnidadMedida,
            displayField: 'descripcion',
            valueField: 'id',
            queryMode: 'local',
            editable: false,

            emptyText: '---- Seleccionar -----',
          },
          {
            xtype: 'button',
            glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
            handler: 'onClickMantenimientoProducto'
          },
          {
            xtype: 'button',
            glyph: megafilmperu.util.Glyphs.getGlyph('refrescar'),
            combo: 'cboUnidadMedida',
            handler: 'onClickRefrescarCombo'
          },

          {
            fieldLabel: 'U.M. Fraccion',
            name: 'idunidadmedidafraccion',
            itemId: 'cboUnidadMedidaFraccion',
            flex: 1,
            labelAlign: 'right',
            store: storeUnidadMedida,
            displayField: 'descripcion',
            valueField: 'id',
            queryMode: 'local',
            editable: false,
            hidden: false,
            emptyText: '---- Seleccionar -----',
          },
          {
            xtype: 'button',
            glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
            handler: 'onClickMantenimientoProducto'
          },
          {
            xtype: 'button',
            glyph: megafilmperu.util.Glyphs.getGlyph('refrescar'),
            combo: 'cboUnidadMedidaFraccion',
            handler: 'onClickRefrescarCombo'
          }
        ]

      },
      {
        xtype: 'container',
        layout: {
          type: 'hbox',
        },
        hidden: false,
        padding: '0 0 10 0',
        defaultType: 'combo',
        items: [{
            fieldLabel: 'Medida',
            name: 'idmedida',
            itemId: 'cboMedida',
            flex: 1,
            store: storeMedida,
            valueField: 'id',
            displayField: 'descripcion',
            queryMode: 'local',
            editable: false,
            emptyText: '---- Seleccionar -----',
          },
          {
            xtype: 'button',
            glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
            handler: 'onClickMantenimientoProducto'
          },
          {
            xtype: 'button',
            glyph: megafilmperu.util.Glyphs.getGlyph('refrescar'),
            combo: 'cboMedida',
            handler: 'onClickRefrescarCombo'
          },
          {
            fieldLabel: 'Presentación',
            labelAlign: 'right',
            name: 'idpresentacion',
            itemId: 'cboPresentacion',
            flex: 1,
            store: storePresentacion,
            displayField: 'despres',
            valueField: 'idpres',
            queryMode: 'local',
            editable: false,
            emptyText: '---- Seleccionar -----',
          },
          {
            xtype: 'button',
            glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
            handler: 'onClickMantenimientoProducto'
          },
          {
            xtype: 'button',
            glyph: megafilmperu.util.Glyphs.getGlyph('refrescar'),
            combo: 'cboPresentacion',
            handler: 'onClickRefrescarCombo'
          },
        ]

      },
      {
        xtype: 'container',
        layout: {
          type: 'hbox',
          aling: 'stretch'
        },
        hidden: false,
        padding: '0 0 10 0',
        items: [{
            xtype: 'numberfield',
            fieldLabel: 'Precio Compra',
            name: 'preciocompra',
            fieldStyle: 'font-size:15px;',
            flex: 2
          },
          {
            xtype: 'checkbox',
            boxLabel: 'MANEJA STOCK',
            name: 'manejastock',
            padding: ' 10 10 10 5 ',
            flex: 1,
            checked : true
          },
          {
            xtype: 'checkbox',
            boxLabel: 'GENERA SERIE',
            name: 'generaserie',
            padding: ' 10 10 10 5 ',
            flex: 1
          }
        ]
      },



      {
        xtype: 'tabpanel',
        itemId: 'tabDetalleProducto',
        height: 300,
        activeItem: 1,
        items: [{
            title: '..: Venta :..',
            hidden: false,
            layout: {
              type: 'vbox',
              align: 'stretch'
            },
            bodyPadding: 10,
            items: [

              {
                xtype: 'container',
                padding: '5 5 5 5',

                layout: {
                  type: 'hbox',
                  flex: 1,
                },
                items: [{

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Unidad Publico',
                    name: 'preciounidadpublico',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 2,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0,
                    allowBlank: false

                  },
                  {

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Unidad Especial',
                    name: 'preciounidadespecial',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 2,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0,
                    labelAlign: 'right'
                  },
                  {

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Unidad VIP',
                    name: 'preciounidadvip',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 2,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0,
                    labelAlign: 'right'
                  }

                ]
              },

              {
                xtype: 'container',
                padding: '5 5 5 5',

                layout: {
                  type: 'hbox',
                  flex: 1,
                },
                items: [{

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Fracción Publico',
                    name: 'preciofraccionpublico',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 2,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0,
                    allowBlank: false

                  },
                  {

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Fracción Especial',
                    name: 'preciofraccionespecial',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 2,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0,
                    labelAlign: 'right'
                  },
                  {

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Fracción VIP',
                    name: 'preciofraccionvip',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 2,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0,
                    labelAlign: 'right'
                  }

                ]
              },

              {
                xtype: 'container',
                padding: '5 5 5 5',

                layout: {
                  type: 'hbox',
                  flex: 1,
                },
                items: [{

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Remate Unidad',
                    name: 'preciounidadremate',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 2,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0,
                    allowBlank: false

                  },
                  {

                    xtype: 'numberfield',
                    fieldLabel: 'Precio Remate Fracción',
                    name: 'preciofraccionremate',
                    flex: 1,
                    allowDecimals: true,
                    decimalSeparator: '.',
                    decimalPrecision: 2,
                    step: '0.1',
                    labelWidth: 170,
                    value: 0,
                    labelAlign: 'right'
                  }
                ]
              },




            ]
          },
          {
            title: '..:: Proveedores ::..',
            layout: 'fit',
            tbar: [{
                xtype: 'button',
                text: 'nuevo',
                handler: 'onClickAddProveedorProducto'
              },
              {
                xtype: 'button',
                text: 'Nuevo Proveedor',
                handler: 'onClickNuevoProveedor'
              },
            ],
            items: [{
              xtype: 'gridpanel',
              store: _storeDetProvProd,
              itemId: 'dgvDetProvProd',
              selModel: 'rowmodel',
              plugins: {
                ptype: 'cellediting',
                clicksToEdit: 1
              },
              columns: [{
                  text: 'Nombre/Razón Social',
                  dataIndex: 'razonsocial',
                  flex: 3,
                  editor: {
                    xtype: 'combo',
                    //typeAhead: true,
                    //triggerAction: 'all',
                    store: storeProveedores,
                    valueField: 'razonsocial',
                    displayField: 'razonsocial',
                    editable: false
                  }
                },
                {
                  xtype: 'numbercolumn',
                  text: 'Precio Compra',
                  dataIndex: 'precio',
                  flex: 1,
                  editor: {
                    xtype: 'numberfield',
                    value: 0
                  }
                },
                {
                  xtype: 'widgetcolumn',
                  flex: 0.5,
                  widget: {
                    xtype: 'button',
                    flex: 1,
                    glyph: 0xf014,
                    handler: 'onClickEliminarProveedorProducto'

                  }

                }
              ],
            }]
          },
          {
            title: '..:: Cuenta Contable ::..',
            layout: {
              type: 'hbox',
              align: 'anchor'
            },
            bodyPadding: 15,
            defaults: {
              flex: 1,
              labelAlign: 'right'
            },
            items: [{
                xtype: 'combo',
                reference: 'cboinventario',
                store: _storePlanContable,
                fieldLabel: 'Inventario',
                nro: 1,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'descripcion',
                name: 'ccinventario',
              },
              {
                xtype: 'combo',
                fieldLabel: 'Compra',
                reference: 'cbocompra',
                nro: 2,
                value: 0,
                store: _storePlanContable,
                valueField: 'id',
                displayField: 'descripcion',
                queryMode: 'local',
                reference: 'cccompra',
              },
              {
                xtype: 'combo',
                reference: 'cboventa',
                fieldLabel: 'Venta',
                nro: 3,
                value: 0,
                store: _storePlanContable,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'descripcion',
                reference: 'ccventa',
              }
            ]
          }

        ]

      }






    ];
    return obj;
  }



});