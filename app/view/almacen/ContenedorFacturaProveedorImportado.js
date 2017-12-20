
Ext.define('megafilmperu.view.almacen.ContenedorFacturaProveedorImportado', {
    extend: 'Ext.panel.Panel',
    xtype: 'wContenedorFacturaProveedorImportado',
    itemId : 'wContenedorFacturaProveedorImportado',
    requires: [
      'Ext.layout.container.Card',
      'megafilmperu.util.Rutas',
      'megafilmperu.view.almacen.AccionesFacturaProveedor'
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
    controller :'acciones-FacturaProveedor',
    initComponent: function () {
      me = this;
      Ext.apply(this,
      {
        items: [
        {
          xtype: 'wListadoFacturarProveedor'
        },
        {
          xtype:'wFormCrearFacturaProveedor',
        }
        /*,
        {
          xtype:'wVisualizarCotizacionFacturar'
        }*/
      ],
      tbar: me.getBotonesERP()
  
      });
      this.callParent();
    },
    getBotonesERP:function(){
      return obj = [
            {
                text: 'CREAR',
                handler: "onClickCrearFacturaAproveedor",
            },
            {
              text :'IMPRIMIR'
            }
            
      ];
    }
  });
  