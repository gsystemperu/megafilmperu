Ext.define('megafilmperu.view.main.Main', {
  extend: 'Ext.container.Viewport',
  layout: 'border',
  alias: 'wMain',
  requires: [
    'megafilmperu.view.main.MainController',
    'megafilmperu.view.menu.Tree'
  ],
  controller: 'main',
  items: [
   
    {
      region: 'west',
      collapsible: true,
      collapsed : true,
      titleCollapse :false,
      title: '::. MEGAFILM PERU.::',
       width: 250,
      layout: {
        type: 'accordion',
        titleCollapse: true,
        animate: true,
        activeOnTop: false,
        fill: false
      },
      items: [{
        title: 'Configuraciones',
        itemId: 'panMantenimiento',
        iconCls: 'fa  fa-window-maximize',
        bodyPadding: 0,
        items: [{
          xtype: 'menutree',
          reference: 'treeMantenimiento', //'treeGestionClientes',
          layout: 'fit',
          rootVisible: true,
          listeners: {
            itemClick: 'onClickOpcionMenu'
          }
        }]


      }, {
        title: 'Control de Almacen',
        itemId: 'panControlAlmacen', //'panGestionCliente',
        iconCls: 'fa fa-dropbox',
        listeners: [{ expand: 'onExpandPanel' }],
        bodyPadding: 0,
        items: [{
          xtype: 'menutree',
          reference: 'treeControlAlmacen', //'treeGestionClientes',
          layout: 'fit',
          rootVisible: true,
          listeners: {
            itemClick: 'onClickOpcionMenu'
          }
        }]


      }, 
      {
        title: 'Control de Ventas',
        itemId: 'panControlVentas',
        iconCls: 'fa fa-line-chart',
    
        items: [{
          xtype: 'menutree',
          reference: 'treeControlVentas',
          layout: 'fit',
          rootVisible: true,
          listeners: {
            itemClick: 'onClickOpcionMenu'
          }
        }]

      },
      {
        title: 'Control de Compras',
        itemId: 'panCompras',
        iconCls: 'fa fa-bullhorn',
        //listeners: [{ expand: 'onExpandPanel' }],
        items: [{
          xtype: 'menutree',
          reference: 'treeControlCompras',
          layout: 'fit',
          rootVisible: true,
          listeners: {
            itemClick: 'onClickOpcionMenu'
          }
        }]
        
      },
      {
        title: 'Reportes - Listados',
        itemId: 'panReportesListados',
        iconCls: 'fa fa-server',
        //listeners: [{ expand: 'onExpandPanel' }],
        html: 'Panel content!'
      }, 
      {
        title: 'Importacion de Datos',
        itemId: 'panImportacionDatos',
        iconCls: 'fa fa-server',
        //listeners: [{ expand: 'onExpandPanel' }],
        html: 'Panel content!'
      }, {
        title: 'Control de Usuarios',
        itemId: 'panControlUsuarios',
        iconCls: 'fa fa-users',
        //listeners: [{ expand: 'onExpandPanel' }],
        items: [{
          xtype: 'menutree',
          reference: 'treeControlUsuarios',
          layout: 'fit',
          rootVisible: false,
          useArrows: true,
        }]
      }]

    }, {
      region: 'center',
      padding: 5,
      reference: 'tabPrincipal',
      activeTab: 0,
      plain: true,
      layout:'fit',
      defaults: {
        bodyPadding: 5,
        scrollable: true
      },
      items: [{
        title: 'Nosotros',
        bodyPadding: '200 0 0 300',
        //html: '<div style="text-aling:center;"><label style="font-size:50px;color:red;" >Global Soft Per&uacute;  </label><p><label style="font-size:15px;color:#5c617c">Programador =>  Cesar Leyva <br> Celular =>  999 874 314  </label></div>'
      }]
    }
  ]

});
