Ext.define('megafilmperu.view.almacen.InventarioInicialController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.almacen-inventarioinicial',
    
    //@Acciones
    onEditorCalcularDiferencia:function(editor, e){
        s = e.record.get('stockfisico');
        i = e.record.get('inventario');
        t = s - i;
        e.record.set('diferencia', t.toFixed(2));
    },
    onClickGuardarInventario:function(btn){
        f =  Ext.ComponentQuery.query('#wRegInventarioInicial')[0];    //this.lookupReference('frmRegCotizacion');
        if (f.isValid()) {

            d = [];
            st = this.lookupReference('dgvInvNuevo').getStore();
            me = this;
            st.each(function (re) {
                console.log(re);
                   reg = {
                        "idprod"     : re.get('id'),
                        "stockfisico": re.get('stockfisico'),
                        "inventario": re.get("inventario"),
                        "diferencia": re.get("diferencia")                   
                    };
                    d.push(reg);
            });
            this.lookupReference('jsondetalle').setValue(JSON.stringify(d));
            f.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    me =  Ext.ComponentQuery.query('#wContenedorInventario')[0];    //this;
                    l = me.getLayout();
                    l.setActiveItem(0);
                    Ext.ComponentQuery.query('#dgvInvReg')[0].getStore().load();
                    megafilmperu.util.Util.showToast('Inventario Guardado!');

                },
                failure: function (action) {
                    Ext.Msg.alert("Aviso", action.result.msg);
                }
            });
        } else {
            megafilmperu.util.Util.showErrorMsg('Ingresar los datos para la cotización!');
        }
    },
    onClickCancelarInventario:function(btn){
        try {
            var me =  Ext.ComponentQuery.query('#wContenedorInventario')[0];    //this;
            var l = me.getLayout();
            l.setActiveItem(0);
          } catch (e) {
            console.log(e);
          }
    }

});
