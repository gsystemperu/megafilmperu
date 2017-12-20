/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('megafilmperu.view.main.MainController', {
  extend: 'Ext.app.ViewController',

  requires: [
    'Ext.window.MessageBox',
    'Ext.tab.Panel',
    'Ext.tree.Panel',
    'megafilmperu.store.tree.GestionClientes',
    'megafilmperu.store.tree.ControlAlmacen',
    'megafilmperu.store.tree.ControlVentas',
    'megafilmperu.store.tree.Mantenimiento',
    'megafilmperu.store.tree.ControlUsuarios',
    'megafilmperu.store.tree.ControlContabilidad',
    
  ],

  alias: 'controller.main',
  onExpandPanel: function (pan, obj) {
    /**
     * Expande el panel y Genera un DASHBOARD del Menú
     */

    this.lookupReference('')
    switch (pan.itemId) {
      case "panControlVentas":
        _panel = this.getView().down('tabpanel');
        if (!_panel.getChildByElement(pan.itemId)) {
          _panel.add({
            title: 'Control de Ventas',
            closable: true,
            flex: 1,
            id: pan.itemId
          });

        }
        _panel.setActiveTab(pan.itemId);

        break;
      case "panFinanzas":
        _panel = this.getView().down('tabpanel');
        if (!_panel.getChildByElement(pan.itemId)) {
          _panel.add({
            title: 'Finanzas',
            closable: true,
            flex: 1,
            id: pan.itemId
          });

        }
        _panel.setActiveTab(pan.itemId);

        break;
      case "panRecursosHumanos":
        _panel = this.getView().down('tabpanel');
        if (!_panel.getChildByElement(pan.itemId)) {
          _panel.add({
            title: 'Recursos Humanos',
            closable: true,
            flex: 1,
            id: pan.itemId
          });

        }
        _panel.setActiveTab(pan.itemId);
        break;
      case "panFacturaElectronica":
        _panel = this.getView().down('tabpanel');
        if (!_panel.getChildByElement(pan.itemId)) {
          _panel.add({
            title: 'Factura Electronica',
            closable: true,
            flex: 1,
            id: pan.itemId
          });

        }
        _panel.setActiveTab(pan.itemId);
        break;
      case "panControlAlmacen":
        _panel = this.getView().down('tabpanel');
        if (!_panel.getChildByElement(pan.itemId)) {
          _panel.add({
            title: 'Control Almacen',
            closable: true,
            id: pan.itemId,
            items: [{
              xtype: 'DashBoardCrm'
            }]
          });

        }
        _panel.setActiveTab(pan.itemId);

        break;
        /* case "panMantenimiento":
             _panel = this.getView().down('tabpanel');
             if (!_panel.getChildByElement(pan.itemId)) {
                 _panel.add({
                     title: 'Mantenimientos',
                     closable: true,
                     id: pan.itemId,
                     items: [{ xtype: 'DashBoardCrm' }]
                 });

             }
             _panel.setActiveTab(pan.itemId);

             break;*/



    }
  },
  init: function () {
    /*_panel = this.getView().down('tabpanel');
    if (!_panel.getChildByElement('panControlAlmacen')) {
        _panel.add({
            title: 'Control Almacen',
            closable: true,
            id: 'panControlAlmacen',
            //layout: 'fit',
            items: [{ xtype: 'DashBoardCrm' }]
        });

    }

    _panel.setActiveTab('panControlAlmacen');
    */
    /* |------ Cargar Menu Dinamico ------| */

    var _ref = this.getReferences();
    var store = Ext.create('megafilmperu.store.tree.ControlAlmacen');
    _ref.treeControlAlmacen.setStore(store);
    var store = Ext.create('megafilmperu.store.tree.ControlVentas');
    _ref.treeControlVentas.setStore(store);
    var store = Ext.create('megafilmperu.store.tree.Mantenimiento');
    _ref.treeMantenimiento.setStore(store);
    var store = Ext.create('megafilmperu.store.tree.ControlUsuarios');
    _ref.treeControlUsuarios.setStore(store);
   // var store = Ext.create('megafilmperu.store.tree.ControlContabilidad');
   // _ref.treeControlContabilidad.setStore(store);



  },
  onClickOpcionMenu: function (obj, record, item, index, e, eOpts) {

    _view = record.get("itemId");
    _tit = record.get("titulo");
    _panel = this.getView().down('tabpanel');
    try {
      if(_tit == ''){return 0;}
      if (!_panel.getChildByElement(_view)) {
        _panel.add({
          title: _tit,
          closable: true,
          id: _view,
          itemId: _view,
          layout: 'fit',
          items: [{
            xtype: _view,
            toc : (_tit=='Factura Nacionales'?1:2)
          }]
        });

      }
      if(_tit=='Factura'){
        if(_panel.getChildByElement('wContenedorPuntoVentaB')){
          _panel.remove('wContenedorPuntoVentaB');
        }
      }
      if(_tit=='Boleta'){
        if(_panel.getChildByElement('wContenedorPuntoVenta')){
          _panel.remove('wContenedorPuntoVenta');
        }
      }
      
      if(_tit=='Factura Nacionales'){
        if(_panel.getChildByElement('wContenedorFacturaProveedorImportado')){
          _panel.remove('wContenedorFacturaProveedorImportado');
        }
      }
      if(_tit=='Factura Importacion'){
        if(_panel.getChildByElement('wContenedorFacturaProveedor')){
          _panel.remove('wContenedorFacturaProveedor');
        }
      }
      _panel.setActiveTab(_view);
    } catch (err) {
      console.info(err);
    }


  }
});
