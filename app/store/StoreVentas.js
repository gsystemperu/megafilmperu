Ext.define('megafilmperu.store.StoreVentas', {
    extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }
});

// @DataSet :

Ext.define('megafilmperu.store.Clientes', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.Cliente',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idper',direction: 'ASC'}],
    extraParams: { vDocumento: '', vRuc: '', vDatos: ''},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/buscar_cliente'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/*
Ext.define('megafilmperu.store.Productos', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.Producto',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    groupField: 'categoria',
    sorters: [{property: 'idprod',direction: 'ASC'}],
    extraParams: { vCodigo: '', vDescripcion: '', vCategoria : null},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/buscar_producto'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});*/

Ext.define('megafilmperu.store.ProductosPorPrecioPersona', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.ProductoPorCliente',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    //groupField: 'categoria',
    sorters: [{property: 'idprod',direction: 'ASC'}],
    extraParams: { vCodigo: '', vDescripcion: '', vCategoria : null,vIdCliente:0},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/buscar_producto_por_persona'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});
//AGREGAR CAMPOS
Ext.define('megafilmperu.store.DetalleCotizacion', {
    extend: 'Ext.data.Store',
    fields: [
            {name: "idprod", type:'int' },
            {name: "descripcion", type:'string' },
            {name: "cantidad", type:'int' },
            {name: "precio", type:'float' },
            {name: "total", type:'float' }  ,
            {name: "vencimiento",type:'date', format:'d/m/Y'},
            {name : "preciopublico",type:'float'},
            {name : "precioespecial",type:'float'},
            {name : "preciovip",type:'float'},
            {name : "preciofraccionpublico",type:'float'},
            {name : "preciofraccionespecial",type:'float'},
            {name : "preciofraccionvip",type:'float'},
            {name :'series',type:'string'},
            {name :'seriescantidades',type:'string'},
            {name :'estado',type:'string'},

    ],
    proxy: { type: 'memory' }
});

Ext.define('megafilmperu.store.TipoDocumentos', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.TipoDocumento',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idtipdoc',direction: 'ASC'}],
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_documentos'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('megafilmperu.store.Cotizaciones', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.Cotizacion',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idcoti',direction: 'ASC'}],
    extraParams: {
        vDesde: '',
        vHasta: '',
        vPersona : ''
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_cotizaciones'},
        reader: {
            type: 'json',
            rootProperty: 'data',
            //totalProperty: 'totalreg'
        }
    }
});

Ext.define('megafilmperu.store.CotizacionesDetalle', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.CotizacionDetalle',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'item',direction: 'ASC'}],
    extraParams: { vIdCotizacion: 0 },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/cotizacion_detalle_vista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('megafilmperu.store.FormaPago', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.FormaPago',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idfopag',direction: 'ASC'}],
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_forma_pago'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('megafilmperu.store.ModoEntrega', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.ModoEntrega',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idmodo',direction: 'ASC'}],
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_modo_entrega'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('megafilmperu.store.Vendedores', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.Vendedor',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idvend',direction: 'ASC'}],
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_vendedores'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('megafilmperu.store.UnidadMedida', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.UnidadMedida',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idumed',direction: 'ASC'}],
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_unidad_medida'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});



Ext.define('megafilmperu.store.Presentacion', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.Presentacion',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idpres',direction: 'ASC'}],
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_presentacion'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('megafilmperu.store.Categoria', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.Categoria',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idcate',direction: 'ASC'}],
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_categorias'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('megafilmperu.store.CotizacionesEstadistica', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.Cotizacion',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idcoti',direction: 'ASC'}],
    extraParams: {
        vDesde: '',
        vHasta: '',
        vPersona : ''
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/estadistica_por_cliente'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('megafilmperu.store.CotizacionesEstadisticaProducto', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.EstProducto',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idcoti',direction: 'ASC'}],
    extraParams: {
        vDesde: '',
        vHasta: '',
        vProducto : 0
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/estadistica_por_producto'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('megafilmperu.store.CotizacionesEstadisticaVendedor', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.Cotizacion',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    sorters: [{property: 'idcoti',direction: 'ASC'}],
    extraParams: {
        vDesde: '',
        vHasta: '',
        vProducto : 0
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/estadistica_por_vendedor'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('megafilmperu.store.CotizacionesDelCliente', {
    extend: 'Ext.data.Store',requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.Cotizacion',
    autoLoad: false,extraParams: {vCodigo : 0},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/buscar_cotizaciones_cliente'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('megafilmperu.store.CotizacionesFacturar', {
    extend: 'Ext.data.Store',requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.CotizacionesFacturar',
    autoLoad: true,
    extraParams: {vDesde : '',vHasta:''},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/cotizaciones_a_facturar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('megafilmperu.store.DocumentoVenta', {
    extend: 'Ext.data.Store',requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.TipoDocumentoVenta',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/documentos_venta_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('megafilmperu.store.PuntoVentaPagos', {
    extend: 'Ext.data.Store',requiere:['molinoavila.model.DataModelVentas'],
    model   :'megafilmperu.model.CotizacionesFacturar',
    autoLoad: false,
    extraParams: {desde : '',hasta:''},
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/buscar_punto_venta_pagos'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


// @ Store : Listado de Motivos de Translado para las guias de remisión

Ext.define('megafilmperu.store.MotivosTranslados', {
    extend: 'Ext.data.Store',
    requiere:['megafilmperu.model.DataModelVentas'],
    model   :'megafilmperu.model.MotivoTranslado',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/listar_motivos_translado'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});