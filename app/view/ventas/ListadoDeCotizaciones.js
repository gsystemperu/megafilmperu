Ext.define('megafilmperu.view.ventas.ListadoDeCotizaciones', {
    extend: 'Ext.panel.Panel',
    xtype: 'wListadoCotizaciones',
    alias: 'widget.wListadoCotizaciones',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.container.ButtonGroup',
        'Ext.grid.column.*',
        'Ext.form.field.*',
        'Ext.panel.Panel',
        'megafilmperu.view.ventas.AccionesRegCotizacion',
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
    controller: 'acciones-regcotizacion',
    initComponent: function () {
        var storeCoti    = Ext.create('megafilmperu.store.Cotizaciones');
        var storeCotiDet = Ext.create('megafilmperu.store.CotizacionesDetalle');

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
                items: [{
                    xtype: 'grid',
                    itemId: 'dgvVentas',
                    reference: 'dgvVentas',
                    store: storeCoti,
                    columnLines: true,
                    sortableColumns: false,
                    requires: [
                        'Ext.grid.selection.SpreadsheetModel',
                        'Ext.grid.plugin.Clipboard'
                    ],
                    emptyText: 'NO HAY REGISTROS PARA MOSTRAR SEGUN EL RANGO DE FECHAS',
                    columns: [
                       {xtype: 'rownumberer',flex:0.3,align:'center'},
                      {
                            text: 'Fecha ',
                            dataIndex: 'vfecha',
                            flex: 0.8,
                            align: 'center'
                        },
                        {
                            text: 'Nombre / Razon Social',
                            dataIndex: 'nomcompleto',
                            flex: 2.5
                        },
                        {
                            text: 'RUC',
                            dataIndex: 'numrucper',
                            flex: 1,
                            align: 'right',

                        },
                        {
                            xtype: 'numbercolumn',
                            text: 'Sub Total',
                            dataIndex: 'valventacont',
                            flex: 1,
                            align: 'right'
                        },{
                            xtype: 'numbercolumn',
                            text: 'Impuesto',
                            dataIndex: 'valigvcont',
                            flex: 1,
                            align: 'right'
                        },
                        {
                            xtype: 'numbercolumn',
                            text: 'Total',
                            dataIndex: 'valtotalcont',
                            flex: 1,
                            align: 'right'
                        },
                        {
                            text: 'Estado',
                            dataIndex: 'descripcion',
                            flex: 1,
                            align: 'center',
                            renderer: function (value, metaData, record) {
                                if(record.data.estado == 1){
                                    metaData.style = "color:#ffffff;font-Size:12px;background-color:#adadad";
                                    return value;
                                }
                                if(record.data.estado == 2){
                                  metaData.style = "color:#ffffff;font-Size:12px;background-color:#5f7c8a";
                                  return value;
                                }
                                if(record.data.estado == 3){ // Completado
                                  metaData.style = "color:#ffffff;font-Size:12px;background-color:#85687D";
                                  return value;
                                }
                                if(record.data.estado == 4){ // Completado
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
                                glyph: 0xf044,
                                handler: 'onClickEditarCotizacion'

                            }

                        },
                        {
                            xtype: 'widgetcolumn',
                            width: 50,
                            widget: {
                                xtype: 'button',
                                width: 30,
                                glyph: 0xf014,
                                handler: 'onClickEliminarCotizacion'

                            }

                        }
                    ],

                    listeners: {
                        cellclick: 'onSelectedDetalleCotizacion'
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
                            reference: 'dfDesdeCotizacion',
                            itemId: 'dfDesdeCotizacion',
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
                            reference: 'dfHastaCotizacion',
                            itemId: 'dfHastaCotizacion',
                            width: 100
                        },
                        {
                            xtype: 'button',
                            glyph: megafilmperu.util.Glyphs.getGlyph('buscar'),
                            tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
                            handler: 'onClickBuscarCotizacionesPorFechas'
                        },

                    ]
                }]
            }, {
                xtype: 'panel',
                layout: 'fit',
                collapseDirection: 'right',
                border: false,
                flex: 0.7,
                items: [{
                    xtype: 'grid',
                    reference: 'dgvDetalleCotizacion',
                    itemId   : 'dgvDetalleCotizacion',
                    store: storeCotiDet,
                    columnLines: true,
                    sortableColumns: false,
                    requires: [
                        'Ext.grid.selection.SpreadsheetModel',
                        'Ext.grid.plugin.Clipboard'
                    ],
                    columns: [{
                            text: 'Producto',
                            dataIndex: 'descripcion',
                            flex: 2,
                            align: 'left'
                        },
                        {
                            text: 'Presentacion',
                            dataIndex: 'presentacion',
                            flex: 1,
                            align: 'left'
                        },
                        {
                            text: 'Precio',
                            dataIndex: 'precio',
                            flex: 0.5,
                            align: 'right'
                        },
                        {
                            text: 'Cantidad',
                            dataIndex: 'cantidad',
                            flex: 0.5,
                            align: 'right'
                        },
                        {
                            text: 'Total',
                            dataIndex: 'total',
                            flex: 0.5,
                            align: 'right'
                        }

                    ]
                }]



            }]
        });
        this.callParent();
        /*storeCoti.getProxy().extraParams = {
            vDesde: Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
            vHasta: Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
            vPersona: ''
        };
        storeCoti.load(1);*/
    }
});
