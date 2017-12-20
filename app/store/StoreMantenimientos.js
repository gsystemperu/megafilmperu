Ext.define('megafilmperu.store.StoreMantenimientos', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/* 
@DataSet :
Stores para los mantenimientos de las tablas maestras
==============================================================
*/
Ext.define('megafilmperu.store.Estados', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.Estado',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/estados_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('megafilmperu.store.Bancos', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.Banco',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/bancos_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('megafilmperu.store.Almacenes', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.Almacen',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/almacen_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('megafilmperu.store.AlmacenSecciones', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.AlmacenSecciones',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/almacen_secciones_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('megafilmperu.store.Categoria', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.Categoria',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/categoria_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('megafilmperu.store.Colores', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.Color',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/color_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('megafilmperu.store.Medidas', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.Medida',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/medidas_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('megafilmperu.store.TipoDeProductos', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.TipoDeProducto',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/tipo_producto_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('megafilmperu.store.UnidadDeMedidas', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.UnidadDeMedida',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/unidad_medida_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('megafilmperu.store.Tarifas', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.Tarifa',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/tarifa_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/* 
@DataSet :
Stores para los mantenimientos Moneda
==============================================================
*/
Ext.define('megafilmperu.store.Monedas', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.Moneda',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/moneda_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('megafilmperu.store.Tiendas', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModels'],
    model   :'megafilmperu.model.Tienda',
    autoLoad: true,
    extraParams:{
        idempresa : 1
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_tiendas'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('megafilmperu.store.ComboSeriesDocumentos', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.comboSerieDocumento',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/combo_listar_series_documento'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});