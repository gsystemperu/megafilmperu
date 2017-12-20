Ext.define('megafilmperu.view.ventas.ContenedorCliente', {
  extend: 'Ext.panel.Panel',
  xtype: 'wContenedorCliente',
  itemId : 'wContenedorCliente',
  reference : 'wContendedorCliente',
  requires: [
    'Ext.layout.container.Card',
    'megafilmperu.util.Rutas',
    'megafilmperu.view.ventas.FormCliente',
    'megafilmperu.view.ventas.AccionesContenedorClientes'
  ],
  layout: {
    type: 'card',
    align: 'stretch',
    deferredRender: true,
  },
  bodyPadding: 0,
  defaults: {
    bodyPadding: 0,
    border: false
  },
  controller :'acciones-contenedorclientes',
  initComponent: function () {
    me = this;
    Ext.apply(this, {
      items: [{
        id: 'clie-0',
        xtype: 'wRegCliente'
      },
      {
        id: 'clie-1',
        xtype:'wFormClienteListado'

      }
    ],
    tbar: me.getBotonesERP()

    });
    this.callParent();
  },
  getBotonesERP:function(){
    _cotizaciones = 0;
    _txt1 = Ext.String.format('Cotizaciones  : {0}',_cotizaciones);
    _documentos = 0;
    _txt2 = Ext.String.format('Facturación  : {0}',_documentos);

    return obj = [
      {

       text     : 'Clientes',
       iconCls :'fa fa-user fa-2x',
       textAlign :'center',
       iconAlign:'top',
       scale :'medium',
       width:150 ,
       itemId:'btnClientes',
       handler:'onClickVerClientes',

        },
        {

         text : 'Nuevo',
         iconCls :'fa  fa-plus-circle  fa-2x',
         textAlign :'center',
         iconAlign:'top',
         scale :'medium',
         width:150 ,
         itemId:'btnNuevoCliente',
         handler:'onClickNuevoCliente',

          },
        {

         text : _txt1,
         iconCls :'fa  fa-id-badge  fa-2x',
        // glyph: 0xf014,
         textAlign :'center',
         iconAlign:'top',
         scale :'medium',
         width:150 ,
         itemId:'btnCotizaciones',
         handler:'onClickVerCotizaciones',

       },
       {
         text : _txt2,
         iconCls :'fa  fa-credit-card  fa-2x',
         textAlign :'center',
         iconAlign:'top',
         scale :'medium',
         itemId:'btnFacturasBoletas',
         width:150 ,
       }
    ];
  }

});
