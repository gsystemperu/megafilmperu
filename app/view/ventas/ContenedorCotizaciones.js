Ext.define('megafilmperu.view.ventas.ContenedorCotizaciones', {
  extend: 'Ext.panel.Panel',
  xtype: 'wContenedorCotizaciones',
  itemId : 'wContenedorCotizaciones',
  requires: [
    'Ext.layout.container.Card',
    'megafilmperu.util.Rutas',
    'megafilmperu.view.ventas.AccionesContenedorCotizaciones',
    'megafilmperu.view.ventas.RegistrarCotizacion'
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
  controller :'acciones-contenedorcotizaciones',
  initComponent: function () {
    me = this;
    Ext.apply(this,
    {
      items: [
      {
        id: 'coti-0',
        xtype: 'wListadoCotizaciones'
      },
      {
        id: 'coti-1',
        xtype:'wRegistrarCotizacion',


      }
    ],
    tbar: me.getBotonesERP()

    });
    this.callParent();
  },
  getBotonesERP:function(){
    return obj = [
          {
              text: 'COTIZACIONES',
              itemId: 'btnVerCotizaciones',
              handler: "onClickVerCotizaciones",
          },
          {
              text: 'CREAR',
              itemId: 'btnIngresarCotizacion',
              handler: "onClickIngresarCotizacion",
          },
          {
                  text: 'IMPRIMIR',
                  itemId : 'btnImprimirCotizacion',
                  handler: "onClickImprimirPDFCotizacion",
                  hidden:true
          },
          {
                  text: 'CONFIRMAR VENTA',
                  itemId : 'btnConfirmarCotizacion',
                  handler: "onClickConfirmarCotizacion",
          },
          {
                  text: 'ENVIAR EMAIL',
                  itemId : 'btnEnviarCorrreoCotizacion',
                  hidden:true
                  //handler: "onClickImprimirPDFCotizacion",
          }
          
    ];
  }
});
