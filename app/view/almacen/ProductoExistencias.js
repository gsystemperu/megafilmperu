Ext.define('megafilmperu.view.almacen.ProductoExistencias', {
  extend: 'Ext.form.Panel',
  xtype: 'wProductosExistencias',
  alias: 'widget.wProductosExistencias',
  requires: [
    'Ext.layout.container.HBox',
    'Ext.container.ButtonGroup',
    'Ext.grid.column.*',
    'Ext.form.field.*',
    'Ext.panel.Panel',
    'megafilmperu.store.DataTemp',
    'megafilmperu.view.almacen.AccionesProducto',
    'Ext.grid.plugin.*',
    'megafilmperu.util.Rutas'
  ],
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  bodyPadding: 0,
  defaults: {
    bodyPadding: 0,
    border: false
  },
  controller: 'acciones-producto',
  initComponent: function () {
    var storeProductoExistencias = Ext.create('megafilmperu.store.ProductoExistencias');
    Ext.apply(this, {
      items: [
        this.getDatosDelProducto(),
        this.getPanelDetalle(storeProductoExistencias)
      ]
    });
    this.callParent();

  },
  getDatosDelProducto: function () {
    return obj = {
      xtype: 'panel',
      frame: false,
      defaultType: 'textfield',
      layout: 'hbox',
      padding: 5,
      bodyPadding: 5,
      defaults: {
        labelWidth: 150,
        labelAlign: 'right'
      },
      items: [
        {
            xtype: 'label',
            text :'Producto / Existencias',
            padding: '5px 5px 5px 5px',
            border: false,
            flex: 1,
            height : 25,
            style: {
              color: '#775c80',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: '15px'
            }
          },
          {
            xtype: 'label',
            text: 'Codigo',
            padding: '5px 0 0 0',
            border: false,
            width: 60,
            height: 25,
            style: {
              background: '#775c80',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '13px'
            }
          },
         {
          xtype: 'textfield',
          reference: 'txtCodigoProducto',
          flex: 1,
          enablekeyevent : true,
          listeners:{
            keyup: 'onKeyUpBuscarCodigoSerie'
          }
        },
        {
          xtype: 'button',
          glyph: megafilmperu.util.Glyphs.getGlyph('buscar'),
          tooltip: 'Busca el producto por codigo de serie',
          //handler: 'onClickBuscarOrdenCompraPorFechas'
        },
        {
          xtype: 'label',
          text: 'Lote',
          padding: '5px 0 0 0',
          border: false,
          width: 60,
          height: 25,
          style: {
            background: '#775c80',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '13px'
          }
        }, {
          xtype: 'textfield',
          itemId: 'txtNumerolote',
          flex: 0.5,
        },
        {
          xtype: 'button',
          glyph: megafilmperu.util.Glyphs.getGlyph('buscar'),
          tooltip: 'Buscador al producto por su numero lote',
          //handler: 'onClickBuscarOrdenCompraPorFechas'
        },
        {
          xtype: 'button',
          glyph: 0xf0d1,
          text :'Almacen',
          tooltip : 'Opcion para registrar la ubicacion del producto en almacen.',
          handler: 'onClickIngresarUbicacionProducto'
        }


      ]
    };
  },
  getPanelDetalle: function (storeProductoExistencias) {
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
      clicksToMoveEditor: 1,
      autoCancel: false
    });

    return obj = {
      xtype: 'panel',
      layout: 'fit',
      itemId: 'panCargando',
      border: false,
      flex: 0.7,
      items: [{
        xtype: 'grid',
        //autoScroll: true,
        reference: 'dgvProductoExistencias',
        itemId: 'dgvProductoExistencias',
        store: storeProductoExistencias,
        columnLines: true,
        sortableColumns: false,
        columns: [
             {
              xtype:'checkcolumn',
              width : 50,
              dataIndex: 'chk',
              locked: true
            },
          {
            text: 'Fecha Ingreso',
            dataIndex: 'fechaingreso',
          width : 90,
            align: 'center',
            locked: true
          },
          {
            text: 'Proveedor',
            dataIndex: 'razonsocial',
            width : 180,
            align: 'left',
              locked: true
          },
          {
            text: 'Codigo',
            dataIndex: 'codigobarras',
            width : 180,
            align: 'left',
              locked: true
          },
          {
            text: 'Estado',
            dataIndex: 'estado',
          width : 110,
            align: 'left'
          },
          {
            text: 'Nro. GUIA',
            dataIndex: 'numeroguia',
            width : 110,
            align: 'right'
          },
          {
            text: 'Nro. Lote',
            dataIndex: 'numerolote',
              width : 110,
            align: 'right'
          },
          {
            text : 'Seccion Almacen',
            dataIndex :'seccionalmacen',
          width : 300,
          },
          {
            text : 'Ubicacion',
            dataIndex :'ubicacion',
            width : 300,
          },
          {
            text: 'Observaciones',
            dataIndex: 'observaciones',
          width : 300,
          },
          {
            text: 'Vencimiento',
            dataIndex: 'vencimiento',
              width : 100,
            align: 'center'
          },

          /*{
           xtype: 'widgetcolumn',
           flex: 0.5,
           widget: {
             xtype: 'button',
             flex: 1,
             glyph: 0xf0d1,
             tooltip : 'Opcion para registrar la ubicacion del producto en almacen.',
             handler: 'onClickIngresarUbicacionProducto'
           }
          }*/
        ],

      }]



    };
  }
});
