Ext.define('megafilmperu.view.ventas.ContenedorCotizacionesFacturar', {
  extend: 'Ext.panel.Panel',
  xtype: 'wContenedorCotizacionesFacturar',
  itemId : 'wContenedorCotizacionesFacturar',
  requires: [
    'Ext.layout.container.Card',
    'megafilmperu.util.Rutas',
    'megafilmperu.view.ventas.AccionesContenedorCotizacionesFacturar',

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
  controller :'acciones-contenedorcotizacionesfacturar',
  initComponent: function () {
    me = this;
    Ext.apply(this,
    {
      items: [
      {
        id: 'cotifac-0',
        xtype: 'wListadoCotizacionesFacturar'
      },
      {
        id: 'cotifac-1',
        xtype:'wRegistroCotizacionFacturar',
      },
      {
        id :'cotifac-2',
        xtype:'wVisualizarCotizacionFacturar'
      },
      {
        xtype:'wGuiaRemision'
      }
    ],
    tbar: me.getBotonesERP()

    });
    this.callParent();
  },
  getBotonesERP:function(){
    return obj = [
          {
              text: 'CREAR',
              handler: "onClickCrearCotizacionFactura",
          },
          {
            text :'IMPRIMIR DOCUMENTO',
            //handler : 'onClickDocumentoImprimir'
          },
          {
            text : 'GUIA REMISIÓN',
            handler:'onClickCrearGuiaRemision'
          },
          {
            text :'IMPRIMIR GUIA DE REMISIÓN',
            handler:'onClickGuiasRemisionImpresion'
          }
      ];
  }
});
