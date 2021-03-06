Ext.define('megafilmperu.store.Menu', {
    extend: 'Ext.data.Store',
    requires: [
        'megafilmperu.util.Util'
    ],
    model: 'megafilmperu.model.menu.Accordion',
    extraParams:{
      vusuario : 0
    },
    autoLoad: false,
    autoSync: true,
    proxy: {
        type: 'ajax',
        url: 'resources/api/usuario_menu',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        listeners: {
            exception: function(proxy, response, operation){
                megafilmperu.util.Util.showErrorMsg(response.responseText);
            }
        }
    }
});
