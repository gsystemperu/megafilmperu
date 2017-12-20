Ext.define('megafilmperu.view.contabilidad.frmTipoCambio', {
    extend: 'Ext.form.Panel',
    alias: 'widget.wTipoCambio',
    xtype: 'wTipoCambio',
    itemId : 'frmTipoCambio',
    requires: [
      'Ext.form.field.*',
      'megafilmperu.view.contabilidad.frmTipoCambioController'
    ],
    bodyPadding: 10,
    defaults: {
        anchor: '100%',
        labelWidth: 100
    },
    controller : 'contabilidad-frmTipoCambio',
    url : megafilmperu.util.Rutas.insertarTipoCambio,
    initComponent:function(){
        me = this;
        Ext.apply(this, {
            items :me.getItems() 
        });

        me.callParent(arguments);
    },
    getItems:function(){
        return obj =  [
        {
            xtype:'hiddenfield',
            itemId: 'idmoneda',
            value : 0,
            name: 'idmoneda'
        },
        {
        xtype: 'fieldcontainer',
        fieldLabel: 'Dolares',
        combineErrors: true,
        msgTarget : 'side',
        layout: 'hbox',
        defaults: {
            flex: 1,
            hideLabel: true
        },
        items: [{
            xtype: 'datefield',
            name: 'startDate',
            fieldLabel: 'Start',
            margin: '0 5 0 0',
            allowBlank: false,
            value : new Date(),
            editable :false
        }, {
            xtype     : 'numberfield',
            name      : 'cambiodolares',
            allowBlank: false,
            value     : 0
        },{
            xtype:'button',
            text : 'Guardar',
            moneda: 2,
            handler:'onClickGuardarTipoCambio'
            
        }]
      },
      {
        xtype: 'fieldcontainer',
        fieldLabel: 'Euros',
        combineErrors: true,
        msgTarget : 'side',
        layout: 'hbox',
        defaults: {
            flex: 1,
            hideLabel: true
        },
        items: [{
            xtype: 'datefield',
            name: 'startDate',
            fieldLabel: 'Start',
            margin: '0 5 0 0',
            allowBlank: false,
            value : new Date(),
            editable :false
        }, {
            xtype     : 'numberfield',
            name      : 'cambioeuros',
            allowBlank: false,
            value     : 0
        },
        {
            xtype:'button',
            text : 'Guardar',
            moneda: 3,
            handler:'onClickGuardarTipoCambio'
           
        }]
      }
];
   }
});