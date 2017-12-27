Ext.define('megafilmperu.view.conf.Empresa', {
    extend: 'Ext.form.Panel',
    alias: 'widget.wRegEmpresa',
    xtype: 'wRegEmpresa',
    itemId: 'wRegEmpresa',
    requires: [
      'Ext.form.field.*',
      'megafilmperu.util.Rutas',
      'megafilmperu.view.conf.EmpresaController'
    ],
    margin: 30,
    autoScroll: true,
    controller: 'acciones-empresa',
    url: megafilmperu.util.Rutas.actualizarEmpresa,
    layout: {
      type: 'vbox',
      pack: 'start',
      align: 'stretch'
    },
    initComponent: function () {
      me = this;
      Ext.apply(me, {
        items: me.getFormularioEmpresa(),
        bbar: [
          '->',
          {
            xtype: 'button',
            text: 'Cancelar',
            scale: 'medium',
            handler: 'onClickCancelarEmpresa'
          },
          {
            xtype: 'button',
            text: 'Grabar',
            scale: 'medium',
            handler: 'onClickGuardarEmpresa'
          }
  
        ]
      });
      me.callParent(arguments);
      me.getCargarDatosEmpresa();
    },
    getCargarDatosEmpresa:function(){
        Ext.Ajax.request({
            url: megafilmperu.util.Rutas.listarEmpresa, 
            success: function(response){
                ob = Ext.JSON.decode(response.responseText).data[0];
                Ext.ComponentQuery.query('hiddenfield[name=id]')[0].setValue(ob.id);
                Ext.ComponentQuery.query('textfield[name=razonsocial]')[0].setValue(ob.razonsocial);
                Ext.ComponentQuery.query('textfield[name=ruc]')[0].setValue(ob.ruc);
                Ext.ComponentQuery.query('textarea[name=direccion]')[0].setValue(ob.direccion);
                Ext.ComponentQuery.query('textfield[name=lema]')[0].setValue(ob.lema);
                Ext.ComponentQuery.query('textfield[name=correo]')[0].setValue(ob.correo);
                Ext.ComponentQuery.query('textfield[name=telefono]')[0].setValue(ob.telefono);
            }
         });
         return true;
    },
    getFormularioEmpresa: function () {
      sti  = Ext.create('megafilmperu.store.Tiendas', {});
      ssd1 = Ext.create('megafilmperu.store.ComboSeriesDocumentos');

      ssd1 = ssd1;//.filter('abreviatura','F');
      ssd2 = ssd1;//.filter('abreviatura','B');
      ssd3 = ssd1;//.filter('abreviatura','GR');
     
      var obj = [
    
        {
          xtype  : 'hiddenfield',
          name   : 'id',
          value: 0
        },
        {
          xtype: 'hiddenfield',
          name: 'jsondetalle',
          reference: 'jsondetalle'
        },
        {
          xtype: 'textfield',
          fieldLabel: 'Razón Social',
          name: 'razonsocial',
          allowBlank: false,
          fieldStyle: 'font-size:25px;text-transform: uppercase;background-color:#E1E1E1;border:false;'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'R.U.C',
            name: 'ruc',
            allowBlank: false,
            
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Dirección',
            name: 'direccion',
            allowBlank: true,
           
        },
        {
          xtype: 'container',
          layout: {
            type: 'hbox',
            aling: 'stretch'
          },
          hidden: false,
          padding: '0 0 10 0',
          defaultType:'textfield',
          items: [
              {
                    fieldLabel: 'Lema',
                    name: 'lema',
                    allowBlank: true,
                    flex: 1
                },
                {
                    fieldLabel: 'Correo',
                    name: 'correo',
                    type:'mail',
                    allowBlank: true,
                    flex: 1,
                    labelAlign:'right'
                },
                {
                    fieldLabel: 'Telefono',
                    name: 'telefono',
                    allowBlank: true,
                    flex: 1,
                    labelAlign:'right'
                },
           
          ]
        },
        {
            xtype: 'tabpanel',
            itemId: 'tabDetalleEmpresa',
            height: 300,
            activeItem: 1,
            items: [

                {
                    title: '..:: Tiendas ::..',
                    layout: 'fit',
                    tbar: [{
                        xtype: 'button',
                        text: 'Nuevo',
                        handler: 'onClickNuevaTienda'
                      },
                     
                    ],
                    items: [{
                      xtype: 'gridpanel',
                      store: sti,
                      reference: 'dgvTiendas',
                      selModel: 'rowmodel',
                      plugins: {
                        ptype: 'cellediting',
                        clicksToEdit: 1
                      },
                      columns: [
                        {
                          text: 'Dirección',
                          dataIndex: 'direccion',
                          flex: 1,
                          editor:{
                              xtype:'textfield'
                          }

                        },
                        {
                            text: 'Telefono',
                            dataIndex: 'telefono',
                            flex: 1,
                            editor:{
                                xtype:'textfield'
                            }
                        },
                        {
                            text: 'Celular',
                            dataIndex: 'celular',
                            flex: 1,
                            editor:{
                                xtype:'textfield'
                            }
                        },
                        {
                            text : 'Serie Boleta',
                            dataIndex: 'serieboleta',
                            flex :1,
                            editor:{
                                xtype:'combo',
                                store : ssd1,
                                valueField:'comboseriedocumento',
                                displayField:'comboseriedocumento'
                            }
                        },
                        {
                            text : 'Serie Factura',
                            dataIndex: 'seriefactura',
                            flex :1,
                            editor:{
                                xtype:'combo',
                                store : ssd2,
                                valueField:'comboseriedocumento',
                                displayField:'comboseriedocumento'
                            }
                        },
                        {
                            text : 'Serie Guia Remisión',
                            dataIndex: 'serieguiaremision',
                            flex :1,
                            editor:{
                                xtype:'combo',
                                store : ssd3,
                                valueField:'comboseriedocumento',
                                displayField:'comboseriedocumento'
                            }
                        },
                        {
                          xtype: 'widgetcolumn',
                          flex: 0.5,
                          widget: {
                            xtype: 'button',
                            flex: 1,
                            glyph: 0xf014,
                            handler: 'onClickEliminarTienda'
        
                          }
        
                        }
                      ],
                    }]
                  }
            ]
        }
      ];
      return obj;
    }
  
  
  
  });