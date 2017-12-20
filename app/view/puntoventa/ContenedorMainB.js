Ext.define('megafilmperu.view.puntoventa.ContenedorMainB', {
  extend: 'Ext.panel.Panel',
  xtype: 'wContenedorPuntoVentaB',
  itemId : 'wContenedorPuntoVentaB',
  reference : 'wContenedorPuntoVentaB',
  requires: [
    'Ext.layout.container.Card',
    'megafilmperu.view.puntoventa.AccionesContenedorMain',
    'megafilmperu.view.puntoventa.Main',
    'megafilmperu.view.puntoventa.Pago'
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
  controller :'acciones-contenedormain',
  initComponent: function () {
    me = this;
    Ext.apply(this, {
      items: [{
        id: 'pdv-0',
        xtype: 'wPdv'
      },
      {
        id : 'pdv-1',
        xtype:'wPuntoVentaPago'
      },
      {
        id : 'pdv-2',
        xtype:'wListadoPdv'
      }

    ],
    tbar: me.getBotonesERP()

    });
    this.callParent();
  },
  getBotonesERP:function(){
    __storeClientes  = Ext.create('megafilmperu.store.Clientes');
    return obj = [
      {
        xtype:'combo',
        flex: 2.9,
        fieldStyle : 'font-size:18px;font-weight:bold; text-transform:uppercase;',
        store  :__storeClientes,
        valueField : 'idper',
        displayField : 'nombreper',
        queryMode : 'local',
        itemId :'cboCliente',
        editable:false,
        allowBlank:false,
        emptyText: 'SELECCIONAR AL CLIENTE',
        listeners: {
           select :'onSelectSeleccionarCliente'
        }
      },
      {
        xtype:'hiddenfield',
        itemId : 'txtPorcentajeGerencia',
        value  : 0
      },
      {
        xtype:'button',
        itemId : 'btnNuevoClientePdv',
        glyph: megafilmperu.util.Glyphs.getGlyph('nuevo'),
        combo : 'cboCliente',
        flex: 0.2,
        handler:'onClickNuevoClientePDV'


      },
      '->',
      {
        text : 'APERTURAR',
        itemId:'btnAperturar',
        scale : 'medium',
        handler:'onClickAperturarCaja'
      },
      {
        text : 'REGRESAR',
        itemId:'btnRegresar',
        scale : 'medium',
        handler:'onClickRegresarPago'
      },
       {
         text : 'PAGO',
         itemId:'btnVentasPdv',
         scale : 'medium',
         handler:'onClickIngresarPago'
       },
       {
         text : 'LISTADO VENTAS',
         itemId:'btnListadoVentasPdv',
         scale : 'medium',
         handler:'onClickListadoVentaPdv'
       },


    ];
  },


});
