Ext.define('megafilmperu.store.StoreProveedores', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/* 
@DataSet :
Stores para las operaciones de Proveedores
==============================================================
*/
Ext.define('megafilmperu.store.Proveedores', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.Proveedor',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams:{
        proveedor: ''
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/proveedor_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});
