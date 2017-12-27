Ext.define('megafilmperu.model.DataModels', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }]
});

// @Model : Estado
Ext.define('megafilmperu.model.Estado', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        }
    ]
});

// @Model : Banco
Ext.define('megafilmperu.model.Banco', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Almacen
Ext.define('megafilmperu.model.Almacen', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Almacen Secciones
Ext.define('megafilmperu.model.AlmacenSecciones', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'idalmacen',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'usuario',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Almacen Categorias
Ext.define('megafilmperu.model.Categoria', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Almacen Color
Ext.define('megafilmperu.model.Color', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Medidas
Ext.define('megafilmperu.model.Medida', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Tipo de producto
Ext.define('megafilmperu.model.TipoDeProducto', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Unidad de Medida
Ext.define('megafilmperu.model.UnidadDeMedida', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Tarifa
Ext.define('megafilmperu.model.Tarifa', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'valor',
            type: 'float'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});


// @Model : Producto
Ext.define('megafilmperu.model.Producto', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: "codigoproducto",
            type: 'string'
        },
        {
            name: "nombre",
            type: 'string'
        },
        {
            name: "preciocompra",
            type: 'float'
        },
        {
            name: "precioventa",
            type: 'float'
        },
        {
            name: "precioventafraccion",
            type: 'float'
        },
        {
            name: "preciodolares",
            type: 'float'
        },
        {
            name: "stockminimo",
            type: 'int'
        },
        {
            name: "fechacaducidad",
            type: 'string'
        },
        {
            name: "idcolor",
            type: 'int'
        },
        {
            name: "idmedida",
            type: 'int'
        },
        {
            name: "idunidadmedida",
            type: 'int'
        },
        {
            name: "idunidadmedidafraccion",
            type: 'int'
        },
        {
            name: "idtipoproducto",
            type: 'int'
        },
        {
            name: "talla",
            type: 'string'
        },
        {
            name: "stockminimo",
            type: 'float'
        },
        {
            name: "manejastock",
            type: 'boolean'
        },
        {
            name: "existencias",
            type: 'integer'
        },
        {name: "preciounidadpublico",type: 'float'},
        {name: "preciounidadespecial",type: 'float'},
        {name: "preciounidadvip",type: 'float'},
        {name: "preciofraccionpublico",type: 'float'},
        {name: "preciofraccionespecial",type: 'float'},
        {name: "preciofraccionvip",type: 'float'},
        {name: "preciounidadremate",type: 'float'},
        {name: "preciofraccionremate",type: 'float'},
        {name: "ventas",type: 'float'},
        {name: "idpresentacion",type: 'integer'},
        {name: "precioporunidad",type: 'float'},
        {name: "precioporfraccion",type: 'float'},
        {name: "stock_metros",type: 'float'},
        {name: "procentajegerencial",type: 'float'},
        {name: "ccinventario",type: 'int'},
        {name: "cccompra",type: 'int'},
        {name: "ccventa",type: 'int'},
        {name: "generaserie",type: 'boolean'},

    ]
});

// @Model : Tarifa
Ext.define('megafilmperu.model.Proveedor', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'razonsocial',
            type: 'string'
        },
        {
            name: 'contacto',
            type: 'string'
        },
        {
            name: 'telefono',
            type: 'string'
        },
        {
            name: 'direccion',
            type: 'string'
        },
        {
            name: 'direccionfiscal',
            type: 'string'
        }
    ]
});


// @Model : Abastecimientos
Ext.define('megafilmperu.model.Abastecimiento', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'idprov',
            type: 'int'
        },
        {
            name: 'razonsocial',
            type: 'string'
        },
        {
            name: 'fecha',
            type: 'date'
        },
        {
            name: 'tipodoc',
            type: 'string'
        },
        {
            name: 'serie',
            type: 'string'
        },
        {
            name: 'numero',
            type: 'string'
        },
        {
            name: 'lote',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        },
        {
            name: 'feabastecimiento',
            type: 'string'
        }

    ]
});

// @Model : Abastecimiento detalle
Ext.define('megafilmperu.model.AbastecimientoDetalle', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idaba',
            type: 'int'
        },
        {
            name: 'item',
            type: 'int'
        },
        {
            name: 'idprod',
            type: 'int'
        },
        {
            name: 'nombre',
            type: 'string'
        },
        {
            name: 'cantidad',
            type: 'int'
        },
        {
            name: 'precio',
            type: 'int'
        },
        {
            name: 'total',
            type: 'int'
        },
        {
            name: 'vencimiento',
            type: 'date'
        }
    ]
});



// @Model : Orden de Compra
Ext.define('megafilmperu.model.OrdenCompra', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'idprov',
            type: 'int'
        },
        {
            name: 'razonsocial',
            type: 'string'
        },
        {
            name: 'fecha',
            type: 'string'
        },
        {
            name: 'estado',
            type: 'string'
        },
        {
            name: 'fpedido',
            type: 'string'
        },
        {
            name: 'incluyeigv',
            type: 'boolean'
        },
        {
            name: 'occodigo',
            type: 'string'
        },
        {name : 'totalordencompra',type:'float'},
        {name: 'totalorden',type: 'float'},
        {name: 'pagoacuenta',type: 'float'},
        {name: 'saldopagar',type: 'float'},
        {name: 'idordencompra',type: 'int'},
        {name: 'serienumeronacional',type: 'string'},
        {name: 'nroinvoice',type: 'string'}


    ]
});



// @Model : Orden de Compra Detalle estado confirmado
//
Ext.define('megafilmperu.model.OrdenCompraDetalle', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idordencompra',type: 'int'},
        {name :'item',type:'int'},
        {name :'idprod',type:'int'},
        {name :'producto',type:'string'},
        {name :'cantidad',type:'float'},
        {name :'preciocompra',type:'float'},
        {name :'cantidadrecibida',type:'float'},
        {name :'total',type:'float'},
        {name :'saldo',type:'float'}
    ]
});

// @Model : Producto existencias con sus series
Ext.define('megafilmperu.model.ProductoExistencia', {
    extend: 'Ext.data.Model',
    fields: [
        {name :'id',type:'int'},
        {name: 'fechaingreso',type:'string'},
        {name :'idprodeedor',type:'int'},
        {name :'razonsocial',type:'string'},
        {name :'numeroguia',type:'string'},
        {name :'numerolote',type:'string'},
        {name :'codigobarras',type:'string'},
        {name: "vencimiento",type:'string'},
        {name: "idseccion",type:'int'},
        {name: "seccionalmacen",type:'string'},
        {name: "ubicacion",type:'string'},
        {name: "observaciones",type:'string'},
        {name: "estado",type:'string'},
        {name: "chk",type:'boolean'},
        {name: "medida_metros",type:'float'},
        {name: "cantidadventa",type:'float'}
    ]
});


// @Model : Plan Contable
Ext.define('megafilmperu.model.PlanContable', {
    extend: 'Ext.data.Model',
    fields: [
        {name :'id',type:'int'},
        {name: 'cuenta',type:'int'},
        {name :'descripcion',type:'string'}
    ]
});

// @Model : Moneda
Ext.define('megafilmperu.model.Moneda', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'abreviatura',
            type: 'string'
        },
        {
            name: 'simbolo',
            type: 'string'
        }
    ]
});


// @Model : Tienda
//
Ext.define('megafilmperu.model.Tienda', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',type: 'int'},
        {name :'idempresa',type:'int'},
        {name :'direccion',type:'string'},
        {name :'telefono',type:'string'},
        {name :'celular',type:'string'},
        {name :'seriefactura',type:'string'},
        {name :'serieboleta',type:'string'},
        {name :'serieguiaremision',type:'string'}
        
    ]
});

// @Model : Tienda
//
Ext.define('megafilmperu.model.Empresa', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',type: 'int'},
        {name :'razonsocial',type:'string'},
        {name :'ruc',type:'string'},
        {name :'direccion',type:'string'},
        {name :'lema',type:'string'},
        {name :'correo',type:'string'},
        {name :'telefono',type:'string'},
        {name :'contacto',type:'string'}
        
    ]
});

// @Model : Lista de productos para el inventario
//
Ext.define('megafilmperu.model.ProductoInventario', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'codigoproducto',type: 'string'},
        {name :'id',type:'integer'},
        {name :'nombre',type:'string'},
        {name :'stockfisico',type:'integer'},
        {name :'inventario',type:'integer'},
        {name :'diferencia',type:'integer'},
        
    ]
});

// @Model : Listado de Registros de inventario
//
Ext.define('megafilmperu.model.InventarioRegistro', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',type: 'string'},
        {name :'referencia',type:'string'},
        {name :'fechainventario',type:'date'},
        {name :'idestado',type:'integer'},
        {name :'estado',type:'string'},
        {name :'stockfisico',type:'integer'},
        {name :'inventario',type:'integer'},
        {name :'diferencia',type:'integer'},
        {name :'detalle',type:'string'}
        
    ]
});




