Ext.define('megafilmperu.view.almacen.ListadoFacturarProveedor', {
    extend: 'Ext.panel.Panel',
    xtype: 'wListadoFacturarProveedor',
    alias: 'widget.wListadoFacturarProveedor',
    requires: [
      'Ext.layout.container.HBox',
      'Ext.container.ButtonGroup',
      'Ext.grid.column.*',
      'Ext.form.field.*',
      'Ext.panel.Panel',
      'megafilmperu.store.DataTemp',
      'megafilmperu.view.almacen.AccionesFacturaProveedor',
      'Ext.grid.plugin.*'
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
    controller: 'acciones-FacturaProveedor',
    initComponent: function () {
      var storeOrdenCompraConfirmada = Ext.create('megafilmperu.store.OrdenesCompraConfirmadas');
      var storeProveedores = Ext.create('megafilmperu.store.Proveedores');
      var storeOrdenCompraConfirmdaDet = Ext.create('megafilmperu.store.TmpOrdenCompraConfirmadas');
  
      Ext.apply(this, {
        items: [{
            xtype: 'panel',
            flex: 1,
            margin: '0 3 0 0',
            layout: 'fit',
            border: false,
            items: [
              this.getPanelAbastecimiento(storeOrdenCompraConfirmada)
            ],
            tbar: [
              this.getPanelToolBarAbastecimiento(storeProveedores)
            ]
          }
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
            itemId: 'dfDesde',
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
            reference: 'dfHasta',
            itemId: 'dfHasta',
            width: 100,
            format: 'd/m/Y'
          }, {
            xtype: 'button',
            glyph: megafilmperu.util.Glyphs.getGlyph(
              'buscar'),
            tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
            handler: 'onClickBuscarOrdenCompraConfirmadasFacturaPorFechas'
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
            handler: 'onClickBuscarOrdenCompraConfirmadasFacturaPorProveedor'
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
        itemId: 'gridOrdenesCompraConfirFacturar',
        reference: 'gridOrdenesCompraConfirFacturar',
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
            dataIndex: 'fordencompra',
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
            flex: 3
          },
          {
             xtype:'numbercolumn',
             text : 'Total Compra',
             align : 'right',
             flex : 1,
             dataIndex : 'totalordencompra'
          },
          {
            text : 'Doc. Nro. Nacional',
            align : 'right',
            flex : 1,
            dataIndex : 'serienumeronacional'
          },
          {
            text : 'INVOICE',
            align : 'right',
            flex : 1,
            dataIndex : 'nroinvoice'
         },
         {
            text: 'Estado',
            dataIndex: 'estado',
            flex: 1,
            align:'center',
            renderer: function (value, metaData, record) {
              if(record.data.idestado == 2){
                  metaData.style = "color:#ffffff;font-Size:12px;background-color:#adadad";
                  return value;
              }
              if(record.data.idestado == 7){
                metaData.style = "color:#ffffff;font-Size:12px;background-color:#5f7c8a";
                return value;
              }
              if(record.data.idestado == 3){ // Completado
                metaData.style = "color:#ffffff;font-Size:12px;background-color:#85687D";
                return value;
              }
            }
          },
          {
            xtype: 'widgetcolumn',
            width: 60,
            widget: {
              xtype: 'button',
              width: 60,
              glyph: 0xf044,
              tooltip  :'Editar ORDEN DE COMPRA',
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
              tooltip : 'Anular FACTURA PROVEEDOR',
               handler: 'onClickAnularFacturaProveedor'
  
            }
  
          }
        ],
      };
  
    },
   /* getPanelDetalle: function (storeAbastecimientoDet) {
      var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
          clicksToMoveEditor: 1,
          autoCancel: false
      });
  
      return obj = {
        xtype: 'panel',
        layout: 'fit',
        border: false,
        flex: 0.7,
        items: [{
          xtype: 'grid',
          reference: 'dgvOrdenCompraConfirDetalle',
          itemId: 'dgvOrdenCompraConfirDetalle',
          store: storeAbastecimientoDet,
          columnLines: true,
          sortableColumns: false,
          selModel: 'rowmodel',
            plugins: [rowEditing],
          plugins: {
              ptype: 'cellediting',
              clicksToEdit: 1
          },
          columns: [{
              text: 'Producto',
              dataIndex: 'producto',
              flex: 1.5,
              align: 'left'
            }, {
              xtype:'numbercolumn',
              text: 'Cantidad',
              dataIndex: 'cantidad',
              flex: 0.5,
              align: 'right'
            },
            {
              text: 'Cant. Recibida',
              dataIndex: 'cantidadrecibida',
              flex: 0.5,
              align: 'right',
              renderer:function(value,metaData){
                  metaData.style="background-color:#30B59B;color:#EEEEEE;fontSize:13px;";
                  return value;
              },
              editor: {
                  xtype: 'numberfield',
                  value: 0,
                  maxValue: 1000,
                  minValue: 0,
                  itemId: 'txtCantidadRecibida'
  
              }
            },
            {
              text: 'Guia Ingreso',
              dataIndex: 'numeroguia',
              flex: 0.5,
              align: 'right',
              editor: {
                  value: 0,
                  itemId: 'txtNumeroGuia'
  
              },
              renderer:function(value,metaData){
                  metaData.style="background-color:#30B59B;color:#EEEEEE;font-size:13px;";
                  return value;
              },
            },
            {
                xtype: 'datecolumn',
                text: 'Vencimiento',
                dataIndex: 'vencimiento',
                flex: 0.5,
                align: 'center',
                format : 'd/m/Y',
                renderer:function(value,metaData){
                    metaData.style="background-color:#30B59B;color:#EEEEEE;font-size:13px;";
                    return Ext.util.Format.date(value,'d/m/Y');
                },
                editor: {
                    xtype: 'datefield',
                    value: new Date(),
                    format: 'd/m/Y',
                    maskRe : /[0-9\/]/,
                }
            },
            {
                xtype: 'checkcolumn',
                text: 'Gen. Serie',
                dataIndex: 'genserie',
                flex: 0.5,
                align: 'center',
                editor : {
                    xtype:'checkbox',
  
                }
  
            },
  
            {
              xtype:'numbercolumn',
              text: 'Precio',
              dataIndex: 'preciocompra',
              flex: 0.5,
              align: 'right'
            },
             {
              xtype:'numbercolumn',
              text: 'Sub total',
              dataIndex: 'total',
              flex: 0.5,
              align: 'right'
            }
          ],
          tbar:[
            {
              text :'Actualizar Stock'
            }
          ]
        }]
  
  
  
      };
    }*/
  });
  