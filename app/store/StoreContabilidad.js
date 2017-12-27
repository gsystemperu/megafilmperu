Ext.define('megafilmperu.store.StoreContabilidad', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/* 
@DataSet :
Stores del Plan Contable
==============================================================
*/
Ext.define('megafilmperu.store.PlanContable', {
    extend: 'Ext.data.Store',
    storeId : 'storePlanContable',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.PlanContable',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_plan_contable'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});
