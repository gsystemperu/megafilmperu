    Ext.define('megafilmperu.view.puntoventa.ListaSeriesFraccion', { //**CAMBIAR
        extend: 'Ext.form.Panel',
        xtype: 'wListaSeriesFraccion', //**CAMBIAR
        alias: 'widget.wListaSeriesFraccion', //**CAMBIAR
        requires: [
            'Ext.layout.container.HBox',
            'megafilmperu.view.puntoventa.ListaSeriesUnidadesController',
            'Ext.grid.*',
            'Ext.grid.column.*',
            'Ext.form.field.*',
        ],
        layout: {
            type: 'fit',
            pack: 'start',
            align: 'stretch'
        },
        defaults: {
            frame: false,
            bodyPadding: 0
        },
        url : '',
        controller:'acciones-listaseriesunidades', //**CAMBIAR
        initComponent: function () {
            __storeSeriesFraccion      = Ext.create('megafilmperu.store.ListaSeriesFraccionVenta');

            Ext.Ajax.request({
                url :'resources/api/producto_existencias',
                params:{
                    idprod : this.codigo
                },
                success:function(response){
                   var __data = Ext.JSON.decode( response.responseText );
                   var __x = 0;
                  Ext.each(__data.data,function(record){
                    __dato = {
                        'chk': record.chk,
                        'id'  :  record.id,
                        'codigobarras': record.codigobarras,
                        'vencimiento' : record.vencimiento,
                        'medida_metros': record.medida_metros,
                        'cantidadventa' : 0,

                    };
                      __storeSeriesFraccion.insert(__x++,__dato);
                  });

                }
            });
            var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToMoveEditor: 1,
                autoCancel: false
            });

            Ext.apply(this, {
                items: [{
                        flex: 1,
                        layout: 'fit',
                        height : 300,
                        items: [
                          {
                            xtype: 'grid',
                            itemId: 'dgvSeriesProductosFraccionPdv',//**CAMBIAR
                            store: __storeSeriesFraccion,
                            sortableColumns: false,
                            cantidad : this.cantidad,
                            registro : this.registro,
                            plugins: [rowEditing],
                            selModel: 'cellmodel',
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 1
                            },
                            listeners: {
                                edit: 'onEditorSumarMontos'
                            },
                            columns: [
                              {
                               xtype:'booleancolumn',
                               width : 50,
                               dataIndex: 'chk',
                               align :'center',
                               renderer:function(value,metaData){
                                  if(value){
                                    metaData.style="background-color:#30B59B;color:#EEEEEE;fontSize:13px;";
                                    return 'OK';
                                  }


                               }
                                //disabled: true
                              },
                               {
                                    text: 'CODIGO SERIE UNICO',
                                    dataIndex: 'codigobarras',
                                    flex: 1
                                },
                                {
                                      text: 'VENCIMIENTO',
                                      dataIndex: 'vencimiento',
                                      flex: 0.5,
                                      align:'center'
                                },
                                {
                                    text: 'Stock (m.)',
                                    dataIndex: 'medida_metros',
                                    flex: 0.5,
                                    align:'right'
                                },{
                                   text : 'Cantidad (m.)',
                                   dataIndex:'cantidadventa',
                                   align:'right',
                                   flex: 0.5,
                                   editor:{
                                     xtype: 'numberfield',
                                     maxValue: 1000,
                                     minValue: 0,
                                     decimalPrecision :3

                                  }
                                },
                                {
                                    xtype: 'widgetcolumn',
                                    flex: 0.5,
                                    widget: {
                                        xtype: 'button',
                                        flex: 1,
                                        glyph: 0xf014,
                                        handler: 'onClickQuitarSeleccion'
                                    }
                                }

                            ],

                            tbar:[
                              {
                                xtype:'container',
                                layout:{
                                  type:'hbox',
                                  align:'stretch'
                                },
                                items:[
                                  {
                                    xtype:'hiddenfield',
                                    itemId:'txtSeriesVenta'

                                  },
                                  {
                                    xtype:'hiddenfield',
                                    itemId:'txtCantidadesVenta',
                                  },
                                  {
                                    xtype      :'textfield',
                                    value      :this.cantidad, //.toString() + ' (m.)',
                                    width : 200,
                                    fieldStyle :'text-align: center;font-size:35px;font-weight:bold;',
                                    labelWidth : 60,
                                    fieldLabel: '<b><div style="font-size:30px;margin-top:16px;">(m.)</div></b>',
                                    readOnly : true
                                  },
                                  {
                                    xtype:'textfield',
                                    width:420,
                                    itemId:'txtSerieUnico',
                                    emptyText :'-- CODIGO DE BARRAS --',
                                    enableKeyEvents : true,
                                    fieldStyle :'text-align: center;font-size:20px;font-weight:bold;',
                                    listeners:{
                                      keyup:'onKeyUpBuscarCodigoBarrasFraccion'
                                    }
                                  },

                                ]
                              }

                            ],
                            bbar:[
                              { xtype:'button', text :'CANCELAR',scale :'medium'},
                              { xtype:'button', text :'ACEPTAR',scale :'medium' , handler:'onClickGuardarSeriesFraccion'},
                              '->',
                              {
                                  xtype: 'numberfield',
                                  fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Items :</div></b>',
                                  itemId: 'txtTotalItems' ,
                                  decimalSeparator: '.',
                                  readOnly: true,
                                  fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',

                              },
                              {
                                  xtype: 'numberfield',
                                  fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Total :</div></b>',
                                  itemId: 'txtTotalCantidadesFraccion' ,
                                  decimalSeparator: '.',
                                  readOnly: true,
                                  fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',

                              }
                            ]
                            /*listeners :{
                                itemdblclick :'onSelectedCliente' //**CAMBIAR
                            }*/

                        }]
                    }
                ]
            });
            this.callParent();
        }
    });
