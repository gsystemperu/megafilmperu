Ext.define('megafilmperu.view.ventas.ListadoDeCotizacionesFacturar', {
    extend: 'Ext.panel.Panel',
    xtype: 'wListadoCotizacionesFacturar',
    alias: 'widget.wListadoCotizacionesFacturar',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.container.ButtonGroup',
        'Ext.grid.column.*',
        'Ext.form.field.*',
        'Ext.panel.Panel',
        'megafilmperu.view.ventas.AccionesRegCotizacionesFacturar',
        'megafilmperu.store.DataTemp'
    ],
    layout: {
        type: 'vbox',
        //pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 0,
    defaults: {
        bodyPadding: 0,
        border: false
    },
    controller: 'acciones-regcotizacionfacturar',
    initComponent: function () {
        var storeCotiFacturar    = Ext.create('megafilmperu.store.CotizacionesFacturar');

        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        me = this;
        Ext.apply(this, {
            items: [
              me.getListadoCotizacionesAfacturar(storeCotiFacturar,rowEditing)
            ],
            //bbar:me.getBarraTotales()
        });
        this.callParent();
    },
    getBarraTotales:function(){
      return obj = [
          '->',
          {
            xtype:'label',
            text :'TOTAL'
          },{
            xtype:'numberfield',
            padding:'0 50 0 15'
          }
      ];
    },
    getListadoCotizacionesAfacturar:function(storeCotiFacturar,rowEditing){
      return obj = {
        xtype: 'panel',
        flex: 1,
        margin: '0 3 0 0',
        layout: 'fit',
        items: [{
            xtype: 'grid',
            itemId: 'dgvVentasFacturar',
            reference: 'dgvVentasFacturar',
            store: storeCotiFacturar,
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
                    text: 'F.Cotizacion',
                    dataIndex: 'fechacoti',
                    flex: 0.5,
                    align: 'center'
                },
                {
                        text: 'F.Facturado',
                        dataIndex: 'fechafact',
                        flex: 0.5,
                        align: 'center'
                },
                {
                        text: 'Doc. Interno',
                        dataIndex: 'docinterno',
                        flex: 0.5,
                        align: 'center'
                },
                {
                        text: 'Tipo',
                        dataIndex: 'tipodoc',
                        flex: 0.3,
                        align: 'center'
                },
                {
                    text: 'Nombre / Razon Social',
                    dataIndex: 'nomcompleto',
                    flex: 1.5
                },
                
                {
                    xtype: 'numbercolumn',
                    text: 'Total',
                    dataIndex: 'valtotalcont',
                    flex: 0.7,
                    align: 'right'
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Acuenta',
                    dataIndex: 'pagoacuenta',
                    flex: 0.7,
                    align: 'right'
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Saldo',
                    dataIndex: 'saldopagar',
                    flex: 0.7,
                    align: 'right',
                    renderer:function (value, metaData, record){
                        if(record.get('pagoacuenta')>0){
                            return value;
                        }else{
                            return parseFloat(0).toFixed(2);
                        }
                    }
                },
                {
                    text: 'Guia',
                    dataIndex: 'guia',
                    flex: 0.5,
                    align: 'center',
                    renderer:function (value, metaData, record){
                        if(record.get('serie')!=''){
                            return record.get('serie')+'-'+record.get('numero');
                        }
                    }
                        
                },
                {
                    text: 'Estado',
                    dataIndex: 'descripcion',
                    flex: 0.7,
                    align: 'center',
                    renderer: function (value, metaData, record) {
                        console.log( record.data );
                        if(record.data.estado == 1){
                            metaData.style = "color:#ffffff;font-Size:12px;background-color:#adadad";
                            return value;
                        }
                        if(record.data.estado == 2){
                          metaData.style = "color:#ffffff;font-Size:12px;background-color:#5f7c8a";
                          return value;
                        }
                        if(record.data.estado == 3 || record.data.estado == 6){ // Facturado
                          metaData.style = "color:#ffffff;font-Size:12px;background-color:#85687D";
                          return value;
                        }
                        if(record.data.estado == 4 ){ // Completado
                            metaData.style = "color:#ffffff;font-Size:12px;background-color:#C1175A";
                            return value;
                          }
                      }
                     
                },
                {
                    xtype: 'widgetcolumn',
                    width: 50,
                    widget: {
                        xtype: 'button',
                        width: 30,
                        glyph: 0xf0d6,
                        tooltip : 'INGRESAR PAGOS A CUENTA AL DOCUMENTO',
                        handler: 'onClickIngresarPagoAcuenta'

                    }

                },
                {
                    xtype: 'widgetcolumn',
                    width: 50,
                    widget: {
                        xtype: 'button',
                        width: 30,
                        glyph: 0xf014,
                        handler: 'onClickEliminarcotizacionFacturar'

                    }

                }
            ],
            listeners: {
                celldblclick: 'onClickVisualizarCotizacionFactura'
            }
        }],
        tbar: [{
            xtype: 'container',
            bodyPadding: 0,
            layout: 'hbox',
            columnWidth: 10,
            items: [{
                    xtype: 'label',
                    text: 'Fecha Desde',
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
                }, {
                    xtype: 'datefield',
                    value: new Date(),
                    reference: 'dfDesde',
                    itemId: 'dfDesde',
                    width: 100
                },
                {
                    xtype: 'label',
                    text: 'Fecha Hasta',
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
                }, {
                    xtype: 'datefield',
                    value: new Date(),
                    reference: 'dfHasta',
                    itemId: 'dfHasta',
                    width: 100
                },
                {
                    xtype: 'button',
                    glyph: megafilmperu.util.Glyphs.getGlyph('buscar'),
                    tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
                    handler: 'onClickBuscarCotizacionesFacturasPorFechas'
                },

            ]
        }]
      };//Fin Objeto
    }
});
