Ext.define('megafilmperu.store.StoreOrdenCompra', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/*
@DataSet :
Stores para las operaciones de Abastecimiento
==============================================================
*/
Ext.define('megafilmperu.store.OrdenesCompras', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.OrdenCompra',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams :{
        desde       : null,
        hasta       : null,
        proveedor   : 0
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/ordencompra_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty : 'totalreg'

        }
    }
});

/*
@DataSet :
Stores para las orden de compra confirmadas para ingresar a almacen
==============================================================
*/

Ext.define('megafilmperu.store.OrdenesCompraConfirmadas', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.OrdenCompra',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams :{
        desde       : null,
        hasta       : null,
        proveedor   : 0
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/ordencompra_listaconfirmadas'},
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty : 'totalreg'

        }
    }
});



/*
@DataSet :
Stores para las orden de compra confirmadas para ingresar a almacen
==============================================================
*/

Ext.define('megafilmperu.store.OrdenesCompraConfirmadasDetalle', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.OrdenCompraDetalle',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams :{id : 0},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/ordencompra_detalleconfirmadas'},
        reader: {
            type: 'json',
            rootProperty: 'data'

        }
    }
});






/*
@DataSet :
Stores para las operaciones de Abastecimiento Detalle
==============================================================
*//*
Ext.define('megafilmperu.store.AbastecimientoDetalle', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.AbastecimientoDetalle',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams :{id       : null},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/abastecimiento_detalle'},
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
*/
