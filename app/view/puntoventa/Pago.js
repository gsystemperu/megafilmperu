Ext.define('megafilmperu.view.puntoventa.Pago',{
    extend: 'Ext.form.Panel',
    xtype :'wPuntoVentaPago',
    alias : 'wPuntoVentaPago',
    itemId :'wPuntoVentaPago',

    layout:{type:'vbox',align:'stretch'},
    padding : 100,
    controller:'puntoventa-main',
    initComponent:function(){
         me = this;
         Ext.apply(this,{
            items:[
              me.getPanelPago(),
              me.getPanelTotales()
            ],
            buttons:[
              {
                text :'GUARDAR PAGO',
                scale :'medium',
                handler:'onClickGuardarCajaPago'

              }
            ]
         });
        this.callParent(arguments);

    },
    getPanelTotales:function(){
      return obj = {
        xtype:'panel',
        layout:{
          type:'vbox',
          align :'stretch'
        },
        defaults:{
          labelWidth : 300
        },
        bodyPadding: '30',
        padding : '5 0 0 0',
        items:[
          {
            xtype  :'hiddenfield',
            itemId : 'txtIdTienda',
            value  : 0
          },
          {
              xtype: 'textfield',
              maskRe: new RegExp("[0-9.]+"),
              fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Total</div></b>',
              itemId: 'txtTotalVentaPago' ,
              readOnly: true,
              fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',
            
          },
          {
              xtype: 'textfield',
              maskRe: new RegExp("[0-9.]+"),
              fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Descuento (%)</div></b>',
              itemId: 'txtPorcentajeDescuento' ,
              value : 0,
              readOnly: true,
              fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',
          },
          {
              xtype: 'textfield',
              maskRe: new RegExp("[0-9.]+"),
              fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Sub Total</div></b>',
              itemId: 'txtTotalVentaCajaValidar' ,
              //decimalSeparator: '.',
              readOnly: true,
              fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',
              //decimalPrecision:2

          },
          {
              xtype: 'textfield',
              maskRe: new RegExp("[0-9.]+"),
              fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">I.G.V</div></b>',
              itemId: 'txtTotalVentaCajaIgv' ,
              //decimalSeparator: '.',
              readOnly: true,
              fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',
              //decimalPrecision:2

          },

          {
              xtype: 'textfield',
              maskRe: new RegExp("[0-9.]+"),
              fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Total Neto</div></b>',
              itemId: 'txtTotalVentaCajaGeneral' ,
              //decimalSeparator: '.',
              readOnly: true,
              fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',
              //decimalPrecision:2

          },
          /** oculto   **/
          {
              xtype: 'numberfield',
              fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Pago Acuenta </div></b>',
              itemId: 'txtAcuentaVentaCajaValidar' ,
              decimalSeparator: '.',
              readOnly: false,
              fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',
              enableKeyEvents: true,
              value : 0,
              listeners:{
                keyup:'onKeyPagoAcuenta'
              },
              hidden:true
          },
          {
              xtype: 'numberfield',
              fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Saldo </div></b>',
              itemId: 'txtSaldoVentaCajaValidar' ,
              decimalSeparator: '.',
              readOnly: true,
              value : 0,
              fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',
              hidden:true
          }

        ]
      };
    },
    getPanelPago:function(){
      var _storeFormaPago = Ext.create('megafilmperu.store.FormaPago');
      return obj = {
          xtype:'panel',
          layout:{
            type:'hbox',
            align :'stretch'
          },
          //padding : 100,
          items:[
            {
                xtype:'radiogroup',
                vertical: true,
                hidden:true,
                itemId : 'rgtipodocumento',
                flex: 1,
                items:[
                  {boxLabel:'NOTA',name: 'dv',inputValue:'3',value:true, readOnly : true,},
                  {boxLabel:'BOLETA',name: 'dv',inputValue:'2' , readOnly : true,},
                  {boxLabel:'FACTURA',name: 'dv',inputValue:'1', readOnly : true,}
                ]
            },
            {
                xtype:'label',
                text :'FORMA PAGO',
                padding: '5px 0 0 0',
                border: true,
                width: 110,
                height: 25,
                style: {
                    background: '#775c80',
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '11px'
                }
            },
            {
              xtype:'combo',
              flex: 0.5 ,
              labelAlign:'right',
              //fieldSt yle : 'font-size:18px;font-weight:bold; text-transform:uppercase;',//
              store  :_storeFormaPago,
              valueField : 'idfopag',
              displayField : 'descripcion',
              queryMode : 'local',
              itemId :'cboFormaPagoPv',
              editable:false,
              allowBlank:false,
              value : 1
            },
            {
                xtype:'label',
                text :'DOCUMENTO',
                padding: '5px 0 0 0',
                border: true,
                hidden : true,
                width: 90,
                height: 25,
                style: {
                    background: '#775c80',
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '11px'
                }
            },
            {
              xtype:'textfield',
              allowBlank :true,
              flex   : 0.5,
              value  : '001',
              itemId : 'txtSerieDoc',
              hidden : true
            },
            {
              xtype:'textfield',
              allowBlank :true,
              flex: 0.5,
              itemId : 'txtNumeroDoc',
              hidden:true
            }
          ]
      };

    }


});
