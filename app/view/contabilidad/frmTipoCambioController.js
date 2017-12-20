Ext.define('megafilmperu.view.contabilidad.frmTipoCambioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contabilidad-frmTipoCambio',
    onClickGuardarTipoCambio:function(btn){
        __view = Ext.ComponentQuery.query('#wfrmTipoCambio')[0];
        __frm  = Ext.ComponentQuery.query('#frmTipoCambio')[0];
        if(__frm.isValid()){
             Ext.ComponentQuery.query('#idmoneda')[0].setValue(btn.moneda);
            __frm.submit({
                waitMsg: 'Guardando informacion...',
                success: function (form, action) {
                    __view.close();
                },
                failure: function (action) {
                    megafilmperu.util.Util.showToast("Guardado el tipo de cambio");
                   __view.close();
                }
            });
        }
    }

});
