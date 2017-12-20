Ext.define('megafilmperu.view.ventas.FormCliente', {
    extend: 'Ext.form.Panel',
    alias : 'widget.wFormClienteListado',
    xtype : 'wFormClienteListado',
    itemId : 'wFormClienteListado',
    requires   : [
        'Ext.form.field.*',
        'megafilmperu.util.*',
        'megafilmperu.view.ventas.AccionesRegCotizacion',
    ],
    reference : 'myFormClienteListado',
    margin: 30,
    autoScroll: true,
    controller:'acciones-regcotizacion',
    submitEmptyText : false,
    url : megafilmperu.util.Rutas.clienteGuardarViaListado,
    layout: {
      type: 'vbox',
      pack: 'start',
      align: 'stretch'
    },
    initComponent: function()
    {
        me = this;
        var storeTipoDoc = Ext.create('megafilmperu.store.TipoDocumentos');
        Ext.apply(me,
        {
          items :me.getFormularioCliente(storeTipoDoc),
          bbar: ['->',
          {
              xtype: 'button',
              text: 'Cancelar',
              scale: 'medium',
              handler: 'onClickCancelarClienteViaListado'
          },
              {
                  xtype: 'button',
                  text: 'Grabar',
                  scale: 'medium',
                  handler: 'onClickGuardarClienteViaListado'
              }
          ]
        });
        me.callParent(arguments);
    },
    getFormularioCliente: function (storeTipoDoc)
    {
      var obj = [
         

            {
                xtype: 'label',
                text :'Nombres o Razon Social',
                padding:'0 0 10 0',
                border: false,
                style: {
                  color: '#775c80',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }
              },

            {
                xtype: 'textfield',
                name: 'nombreper',
                allowBlank: false,
                reference:'nombreper',
                fieldStyle:'text-transform:uppercase;font-size:20px;',
                //readOnly: true
            },
            {
                xtype: 'label',
                text: 'Número R.U.C'
            },
            {
                xtype:'container',
                layout:'hbox',
                items:[
                  {
                      xtype: 'textfield',
                      name: 'numrucper',
                      reference :'numrucper',
                      flex: 1
                  }
                  //{
                  //  xtype:'button',
                  //  glyph: megafilmperu.util.Glyphs.getGlyph('buscar'),
                  //  flex: 0.5,
                  //  handler:'onClickBuscarRUCDatos'
                  // }
                ]
            },

            {
                xtype: 'label',
                text: 'Dirección'
            },
            {
                xtype: 'textfield',
                name: 'domiciper',
                reference: 'domiciper'
            },
            {
                xtype: 'label',
                text: 'Telefono'
            },
            {
                xtype: 'textfield',
                name: 'telefper'
            },

            {
                xtype: 'label',
                text: 'Celular'
            },
            {
                xtype: 'textfield',
                name: 'celper'
            },
            {
                xtype: 'label',
                text: 'Correo'
            },
            {
                xtype: 'textfield',
                name: 'correoper',
                vtype: 'email'
            },
            {
                xtype: 'label',
                text: 'Provincia'
            },
            {
                xtype: 'textfield',
                name: 'provinciaper'
            },
            {
              xtype:'radiogroup',
              fieldLabel: 'Precio',
              columns: 4,
              hidden:false,
              items: [
                  {
                      boxLabel  : 'PUBLICO',
                      inputValue: 1,
                      name      : 'tipoprecioper',
                      value : true

                  }, {
                      boxLabel  : 'ESPECIAL' ,
                      name      : 'tipoprecioper',
                      inputValue : 2

                  },
                  {
                      boxLabel  : 'VIP',
                      name      : 'tipoprecioper',
                      inputValue : 3

                  },
                  {
                      boxLabel  : 'GERENCIAL',
                      name      : 'tipoprecioper',
                      inputValue : 4

                  }
              ]
            },
            {
              xtype:'numberfield',
              fieldLabel :'Porcentaje Gerencial (%)',
              name : 'porcentajegerencial',
              minvalue : 0,
              labelWidth  : 200,
              value : 0,
              fieldStyle :'font-size:16px;font-weight: bold;'
            },
            {
                xtype: 'label',
                text :'Contacto :',
                padding:'0 0 10 0',
                border: false,
                style: {
                  color: '#775c80',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: '19px'
                }
              },
                {
                    xtype: 'hiddenfield',
                    name: 'idper',
                    itemId:'idper',
                    value:0
    
                },
                {
                    xtype: 'label',
                    text: 'Ape. Paterno',
                    hidden :true
                },
                {
                    xtype: 'textfield',
                    name: 'paternoper',
                    itemId: 'paternoper',
                    allowBlank: true,
                    hidden :true
                    //readOnly: true
    
                },
                {
                    xtype: 'textfield',
                    name: 'maternoper',
                    allowBlank: true,
                     fieldStyle:'text-transform:uppercase',
                   // readOnly: true,
    
                },
    
                {
                  xtype:'fieldcontainer',
                  layout:'hbox',
                  items:[
                    {
                        xtype: 'combo',
                        name: 'iddocidentidad',
                        store: storeTipoDoc,
                        queryMode: 'local',
                        displayField: 'descripcion',
                        valueField: 'idtipdoc',
                        value: 1,
                        editable: false,
                        flex: 1.5
                    },
                    {
                        xtype: 'textfield',
                        name: 'numdocper',
                        flex:1
                    },
                  ]
                }
      ];
      return obj;
    }

});
