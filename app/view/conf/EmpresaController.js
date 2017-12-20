Ext.define('megafilmperu.view.conf.EmpresaController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.acciones-empresa',
  requires: ['megafilmperu.util.Rutas'],

  //@Acciones
  onClickNuevaTienda: function (btn) {
    r = Ext.create('megafilmperu.model.Tienda');
    d = this.lookupReference('dgvTiendas').getStore();
    d.add(r);
  },
  onClickEliminarTienda: function (btn) {
    r = btn.getWidgetRecord();
    d = this.lookupReference('dgvTiendas').getStore();
    d.remove(r);
  },
  onClickGuardarEmpresa: function (btn) {
    d = this.lookupReference('dgvTiendas').getStore();
    f = Ext.ComponentQuery.query('#wRegEmpresa')[0];
    ca = d.getCount();
    rs = [];
    w = 0
    for (var i = 0; i < ca; i++) {
      r = d.getAt(i);
      //if(r.modified){ w= 1 ;}
      da = {
        id: ( Ext.isNumeric(r.get('id')) == true ? r.get('id') : 0),
        idempresa: 1,
        direccion: r.get('direccion'),
        telefono: r.get('telefono'),
        celular: r.get('celular'),
        seriefactura: (r.get('seriefactura') == '' ? '0-0' : r.get('seriefactura')),
        serieboleta: (r.get('serieboleta') == '' ? '0-0' : r.get('serieboleta')),
        serieguiaremision: (r.get('serieguiaremision') == '' ? '0-0' : r.get('serieguiaremision'))
      };
      rs.push(da);
    }
    this.lookupReference('jsondetalle').setValue(JSON.stringify(rs));
    me = this;
    if (f.isValid()) {
      f.submit({
        waitMsg: 'Guardando informacion...',
        success: function (form, action) {
           if(action.result.error!=0){
                      try {
                          d.reload();
                    } catch (e) {console.log(e);return false;}
            }
        },
        failure: function () {
          Ext.Msg.alert("Aviso", "Error en guardar la información");
        }
      });
    }

  },
  onClickCancelarEmpresa:function(btn){
    Ext.ComponentQuery.query('#wRegEmpresa')[1].close();
  }

});
