    Ext.define('megafilmperu.view.puntoventa.ListaSeriesUnidades', { //**CAMBIAR
        extend: 'Ext.form.Panel',
        xtype: 'wListaSeriesUnidades', //**CAMBIAR
        alias: 'widget.wListaSeriesUnidades', //**CAMBIAR
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
            /*__storeProductoExistencias = Ext.create('megafilmperu.store.ProductoExistencias');
            __storeProductoExistencias.load({
                  params:{
                    idprod : this.codigo
                  }
            });*/

            __storeSeriesUnidad      = Ext.create('megafilmperu.store.ListaSeriesFraccionVenta');

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
                        'medida_metros': record.medida_metros
                        //'cantidadventa' : 0,

                    };
                      __storeSeriesUnidad.insert(__x++,__dato);
                  });

                }
            });

            Ext.apply(this, {
                items: [{
                        flex: 1,
                        layout: 'fit',
                        height : 300,
                        items: [{
                            xtype: 'grid',
                            itemId: 'dgvSeriesProductosUnidadesPdv',//**CAMBIAR
                            store: __storeSeriesUnidad,
                            sortableColumns: false,
                            cantidad : this.cantidad,
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
                                      text: 'METROS(m)',
                                      dataIndex: 'medida_metros',
                                      flex: 0.5,
                                      align : 'center'
                                  },
                                {
                                      text: 'VENCIMIENTO',
                                      dataIndex: 'vencimiento',
                                      flex: 0.5
                                  },
                                  {
                                      xtype: 'widgetcolumn',
                                      flex: 0.5,
                                      widget: {
                                          xtype: 'button',
                                          flex: 1,
                                          glyph: 0xf014,
                                          handler: 'onClickQuitarSeleccionUnidades'
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
                                    itemId:'txtSeriesVenta',
                                  },
                                  {
                                    xtype:'hiddenfield',
                                    itemId:'txtCantidadesVenta',
                                  },
                                  {
                                    xtype      :'textfield',
                                    value      :this.cantidad,
                                    width : 90,
                                    fieldStyle :'text-align: center;font-size:35px;font-weight:bold;',
                                    readOnly : true
                                  },
                                  {
                                    xtype:'textfield',
                                    width:350,
                                    itemId:'txtSerieUnico',
                                    emptyText  :'-- CODIGO DE BARRAS --',
                                    enableKeyEvents : true,
                                    fieldStyle :'text-align: center;font-size:20px;font-weight:bold;',
                                    listeners:{
                                      keyup:'onKeyUpBuscarCodigoBarras'
                                    }
                                  },

                                ]
                              }

                            ],
                            bbar:[
                              { xtype:'button', text :'CANCELAR',scale :'medium'},
                              { xtype:'button', text :'ACEPTAR',scale :'medium', handler:'onClickGuardarSeriesUnidad'},
                              '->',
                              {
                                  xtype: 'numberfield',
                                  fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Total :</div></b>',
                                  itemId: 'txtTotalSeriesUnidades' ,
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
