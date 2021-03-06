Ext.define('megafilmperu.view.compras.OrdenCompra', {
  extend: 'Ext.panel.Panel',
  xtype: 'wOrdenCompra',
  alias: 'widget.wOrdenCompra',
  requires: [
    'Ext.layout.container.HBox',
    'Ext.container.ButtonGroup',
    'Ext.grid.column.*',
    'Ext.form.field.*',
    'Ext.panel.Panel',
    'megafilmperu.store.DataTemp',
    'megafilmperu.view.compras.AccionesOrdenCompra'
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
  controller: 'acciones-ordencompra',
  initComponent: function () {
    var storeAbastecimiento = Ext.create('megafilmperu.store.OrdenesCompras');
    var storeProveedores = Ext.create('megafilmperu.store.Proveedores');
    //var storeAbastecimientoDet = Ext.create('megafilmperu.store.AbastecimientoDetalle');
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
      clicksToMoveEditor: 1,
      autoCancel: false
    });

    Ext.apply(this, {
      items: [{
          xtype: 'panel',
          flex: 1,
          margin: '0 3 0 0',
          layout: 'fit',
          border: false,
          items: [
            this.getPanelAbastecimiento(storeAbastecimiento)
          ],
          tbar: [
            this.getPanelToolBarAbastecimiento(storeProveedores)
          ]
        },
  
      ]
    });
    this.callParent();
  },
  getPanelToolBarAbastecimiento: function (storeProveedores) {
    return obj = {
      xtype: 'container',
      bodyPadding: 0,
      layout: {
        type: 'hbox',
        anchor: '100%'
      },
      columnWidth: 10,
      items: [{
          xtype: 'label',
          text: 'Fecha Desde',
          padding: '5px 0 0 0',
          border: false,
          width: 100,
          height: 25,
          style: {
            background: '#775c80',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '13px'
          }
        }, {
          xtype: 'datefield',
          value: new Date(),
          reference: 'dfDesde',
          itemId: 'dfDesdeOC',
          width: 100,
          format: 'd/m/Y'
        }, {
          xtype: 'label',
          text: 'Fecha Hasta',
          padding: '5px 0 0 0',
          border: false,
          width: 100,
          height: 25,
          style: {
            background: '#775c80',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '13px'
          }
        }, {
          xtype: 'datefield',
          value: new Date(),
          reference: 'dfHastaOC',
          itemId: 'dfHastaOC',
          width: 100,
          format: 'd/m/Y'
        }, {
          xtype: 'button',
          glyph: megafilmperu.util.Glyphs.getGlyph(
            'buscar'),
          tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
          handler: 'onClickBuscarOrdenCompraPorFechas'
        }, {
          xtype: 'label',
          text: 'Proveedor',
          padding: '5px 0 0 0',
          border: true,
          width: 100,
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
          xtype: 'combo',
          store: storeProveedores,
          itemId: 'cboProveedores',
          valueField: 'id',
          displayField: 'razonsocial',
          queryMode: 'local',
          flex: 1,
          width: 400,
          editable: false
        },
         {
          xtype: 'button',
          glyph: megafilmperu.util.Glyphs.getGlyph(
            'buscar'),
          tooltip: 'Buscar Pedidos Por Proveedor',
          handler: 'onClickBuscarOrdenCompraPorProveedor'
        },
         {
          xtype: 'button',
          glyph: megafilmperu.util.Glyphs.getGlyph(
            'nuevo'),
          tooltip: 'Formulario de proveedor',
          handler: 'onClickFormularioProveedor',
          control: 'cboProveedores'
        }


      ]
    };

  },
  getPanelAbastecimiento: function (storeAbastecimiento) {
    return obj = {
      xtype: 'grid',
      itemId: 'gridOrdenesCompra',
      reference: 'gridOrdenesCompra',
      store: storeAbastecimiento,
      columnLines: true,
      sortableColumns: false,

      requires: [
        'Ext.grid.selection.SpreadsheetModel',
        'Ext.grid.plugin.Clipboard'
      ],
      emptyText: 'NO HAY REGISTROS PARA MOSTRAR SEGUN EL RANGO DE FECHAS',
      columns: [
         {xtype: 'rownumberer'},
        {
          text: 'Fecha Orden',
          dataIndex: 'fecha',
          flex: 1,
          align: 'center',
        },
        {
          text: 'Codigo Generado',
          dataIndex: 'occodigo',
          flex: 1
        },
        {
          text: 'Nombre / Razon Social',
          dataIndex: 'razonsocial',
          flex: 4
        },
       {
          text: 'Estado',
          dataIndex: 'estado',
          flex: 1,
          renderer:function(value,style){
              if(value == 'OC ANULADA'){
                  return '<strong style="color:red">'+value+'</strong>';
              }else{
                return value;
              }
          }
        },
        {
          xtype:'numbercolumn',
          text: 'Total',
          dataIndex: 'totalorden',
          align : 'right',
          flex: 1
        },
        {
          text: 'Acuenta',
          dataIndex: 'pagoacuenta',
          flex: 1,
          align : 'right',
          hidden:true
        },
        {
          text: 'Saldo',
          dataIndex: 'saldopagar',
          flex: 1,
          align : 'right',
          hidden:true
        },
        {
          xtype: 'widgetcolumn',
          width: 60,
          hidden:true,
          widget: {
            xtype: 'button',
            width: 60,
            glyph: 0xf0d6,
            tooltip : 'INGRESAR PAGOS A CUENTA AL DOCUMENTO',
            handler: 'onClickIngresarPagoAcuenta',
            
          }

        },
        {
          xtype: 'widgetcolumn',
          width: 60,
          widget: {
            xtype: 'button',
            width: 60,
            glyph: 0xf044,
            handler: 'onClickEditarOrdenCompra'
          }

        },
        {
          xtype: 'widgetcolumn',
          width: 60,
          widget: {
            xtype: 'button',
            width: 60,
            glyph: 0xf014,
             handler: 'onClickAnularOrdenCompra'

          }

        }
      ]
    };

  },
  /*getPanelDetalle: function (storeAbastecimientoDet) {
    return obj = {
      xtype: 'panel',
      layout: 'fit',
      collapseDirection: 'right',
      border: false,
      flex: 0.7,
      items: [{
        xtype: 'grid',
        reference: 'dgvAbastecimientoDetalle',
        itemId: 'dgvAbastecimientoDetalle',
        store: storeAbastecimientoDet,
        columnLines: true,
        sortableColumns: false,
        requires: [
          'Ext.grid.selection.SpreadsheetModel',
          'Ext.grid.plugin.Clipboard'
        ],
        features: [{
          ftype: 'summary'
        }],
        columns: [{
            text: 'Producto',
            dataIndex: 'nombre',
            flex: 2,
            align: 'left'
          }, {
            text: 'Precio',
            dataIndex: 'precio',
            flex: 0.5,
            align: 'right'
          }, {
            text: 'Cantidad',
            dataIndex: 'cantidad',
            flex: 0.5,
            align: 'right'
          }, {
            text: 'Total',
            dataIndex: 'total',
            flex: 0.5,
            align: 'right',
            summaryType: 'sum',
            summaryRendeder: function (value, summaryData, dataIndex) {
              return value;
            }
          }

        ]
      }]



    };
  }
  */
});
