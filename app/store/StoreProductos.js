Ext.define('megafilmperu.store.StoreProductos', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/*
@DataSet :
Stores para las operaciones de Producto
==============================================================
*/
Ext.define('megafilmperu.store.Productos', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.Producto',
    autoLoad: true,
    remoteSort: true,
    autoSync  : false,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {
            read: 'resources/api/producto_listar',
            //update :' '
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


/*
@DataSet :
Stores para las operaciones de Producto
==============================================================
*/
Ext.define('megafilmperu.store.ProductosPorCliente', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.Producto',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams : {
        codigo  :'',
        cliente :'',
        nombre  :0
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/producto_listar_venta'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/*
@DataSet :
Stores para listar los productos para las ordenes de compra
==============================================================
*/
Ext.define('megafilmperu.store.ProductosOrdenCompra', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.Producto',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams :{
        idprov : 0,
        nombre : ''
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/producto_listar_oc'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


/*
@DataSet :
Stores para visualizar las series de cada producto por lote y guia
==============================================================
*/
Ext.define('megafilmperu.store.ProductoExistencias', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.ProductoExistencia',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/producto_existencias'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});
