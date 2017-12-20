Ext.define('megafilmperu.model.DataModelVentas', {extend: 'Ext.data.Model',fields: [{ name: 'id', type: 'int' }]});

// @Model : Producto
Ext.define('megafilmperu.model.ProductoPorCliente', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'codigobarras', type: 'string' },
        { name: 'codigoproducto', type: 'string' },
        { name: 'nombre', type: 'string' },
        { name: 'idunidadmedida', type: 'int' },
        { name: 'unidadmedida', type: 'string' },
        { name: 'preciounidadpublico', type: 'float' },
        { name: 'preciounidadespecial', type: 'float' },
        { name: 'preciounidadvip', type: 'float' },
        { name: 'preciofraccionpublico', type: 'float' },
        { name: 'preciofraccionespecial', type: 'float' },
        { name: 'preciofraccionvip', type: 'float' },
        { name: 'preciounidadremate', type: 'float' },
        { name: 'preciofraccionremate', type: 'float' },
        { name: 'tipodeventa', type: 'integer' },
        { name: 'talla', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'medida', type: 'string' },
          { name: 'presentacion', type: 'string' }

    ]
});

// @Model : Cliente
Ext.define('megafilmperu.model.Cliente', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idper', type: 'int' },
        { name: 'paternoper', type: 'string' },
        { name: 'maternoper', type: 'string' },
        { name: 'nombreper', type: 'string' },
        { name: 'sexoper', type: 'string' },
        { name: 'fnaciper', type: 'string' },
        { name: 'iddocidentidad', type: 'int' },
        { name: 'descripcion', type: 'string' },
        { name: 'numdocper', type: 'string' },
        { name: 'numrucper', type: 'string' },
        { name: 'domiciper', type: 'string' },
        { name: 'telefper', type: 'string' },
        { name: 'celper', type: 'string' },
        { name: 'idestado', type: 'int' },
        { name: 'nomcompleto', type: 'string' },
        { name: 'correoper', type: 'string' },
        { name: 'provinciaper', type: 'string' },
        { name: 'tipoprecioper', type: 'int' },
        { name: 'cotizaciones', type: 'int' },
        { name: 'porcentajegerencial', type: 'float' }


    ]
});

// @Model Tipo Documento

Ext.define('megafilmperu.model.TipoDocumento', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idtipdoc', type: 'int' },
        { name: 'descripcion', type: 'string' },
    ]
});

// @Model Tipo Documento de Venta

Ext.define('megafilmperu.model.TipoDocumentoVenta', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'descripcion', type: 'string' },
    ]
});

// @Model Listado de Cotizaciones

Ext.define('megafilmperu.model.Cotizacion', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'vid', type: 'int' },//idcoti
        { name: 'tidcoti', type: 'string' },
        { name: 'vfecha', type: 'string' }, //fechacoti
        { name: 'idper', type: 'int' },
        { name: 'nomcompleto', type: 'string' },
        { name: 'estado', type: 'int' },
        { name: 'descripcion', type: 'string' },
        { name: 'valtotalcont', type: 'float' },
        { name : 'numdocper',type:'string'},
        { name : 'numrucper',type:'string'},
        { name : 'domiciper',type:'string'},
        { name : 'vendedor',type:'string'},
        { name : 'referencia',type:'string'},
        { name : 'vformapago',type:'int'},
        { name : 'vmodoentrega',type:'int'},
        { name : 'incluyeigv',type:'boolean'},
        { name : 'fechavalidohasta',type:'string'},
        { name : 'comentario',type:'string'},


    ]
});

// @Model Listado de Cotizacion Detalle

Ext.define('megafilmperu.model.CotizacionDetalle', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ctcodigo', type: 'string' },
        { name: 'idcoti', type: 'int' },
        { name: 'item', type: 'int' },
        { name: 'descripcion', type: 'string' },
        { name: 'idpresentacion', type: 'int' },
        { name: 'presentacion', type: 'string' },
        { name: 'precio', type: 'float' },
        { name: 'cantidad', type: 'int' },
        { name: 'total', type: 'float' },
        { name: 'vecimiento', type: 'date' },
        { name: 'idprod', type: 'int' },

    ]
});



// @Model Forma de Pago

Ext.define('megafilmperu.model.FormaPago', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idfopag', type: 'int' },
        { name: 'descripcion', type: 'string' }

    ]
});



// @Model Modo de Entrega

Ext.define('megafilmperu.model.ModoEntrega', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idmodo', type: 'int' },
        { name: 'item', type: 'int' }

    ]
});

// @Model Vendedor

Ext.define('megafilmperu.model.Vendedor', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idvend', type: 'int' },
        { name: 'nomvend', type: 'string' },
        { name: 'apevend', type: 'string' },
        { name: 'emailvend', type: 'string' },
        { name: 'televend', type: 'string' },
        { name: 'celvend', type: 'string' },
        { name: 'completo', type: 'string' }


    ]
});

// @Model Unidad Medida

Ext.define('megafilmperu.model.UnidadMedida', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idumed', type: 'int' },
        { name: 'descripcion', type: 'string' },
        { name: 'abreviatura', type: 'string' }
    ]
});


// @Model Unidad Medida

Ext.define('megafilmperu.model.Presentacion', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idpres', type: 'int' },
        { name: 'despres', type: 'string' },
        { name: 'abrepres', type: 'string' }
    ]
});

// @Model Categoria
/*
Ext.define('megafilmperu.model.Categoria', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idcate', type: 'int' },
        { name: 'descate', type: 'string' },
        { name: 'abrecate', type: 'string' }
    ]
});*/

// @Model Estadistica Por Producto

Ext.define('megafilmperu.model.EstProducto', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idcoti', type: 'string' },
        { name: 'fechacoti', type: 'string' },
        { name: 'idprod', type: 'int' },
        { name: 'cantidad', type: 'int' },
        { name: 'precio', type: 'float' },
        { name: 'total', type: 'float' },
        { name: 'idvend', type: 'int' },
        { name: 'vendedor', type: 'string' }
    ]
});


// @Model Listado de Cotizaciones a Facturar

Ext.define('megafilmperu.model.CotizacionesFacturar', {
    extend: 'Ext.data.Model',
    fields: [
      { name: 'idfacturacion', type: 'int' },
        { name: 'idcoti', type: 'int' },
        { name: 'idcotitxt', type: 'string' },
        { name: 'fechacoti', type: 'string' },
        { name: 'idper', type: 'int' },
        { name: 'nomcompleto', type: 'string' },
        { name: 'estado', type: 'integer' },
        { name: 'domiciper', type: 'string' },
        { name: 'telefper', type: 'string' },
        { name: 'numdocper', type: 'string' },
        { name: 'numrucper', type: 'string' },
        { name: 'estadodesc', type: 'string' },
        { name: 'validohasta', type: 'string' },
        { name: 'totalcoti', type: 'float' },
        { name: 'estadodesc', type: 'string' },
        { name: 'idfopag', type: 'integer' },
        { name: 'idmodo', type: 'integer' },
        { name: 'incluyeigv', type: 'boolean' },
        { name: 'fechafact', type: 'string' },
        { name: 'docinterno', type: 'string' },
        { name: 'tipodoc', type: 'string' },
        { name: 'pagoacuenta', type: 'float' },
        { name: 'saldopagar', type: 'float' },
        { name: 'valtotalcont', type: 'float' },
        { name: 'valigvcont', type: 'float' },
        { name: 'valventacont', type: 'float' },
        { name: 'seriedoc', type: 'string' },
        { name: 'numerodoc', type: 'string' },
        { name: 'serie', type: 'string' },
        { name: 'numero', type: 'string' },
        
        { name: 'id', type: 'integer' },
        { name: 'fechaemision', type: 'string' },
        { name: 'puntopartida', type: 'string' },
        { name: 'puntollegada', type: 'string' },
        { name: 'fechatraslado', type: 'string' },
        { name: 'costominimo', type: 'float' },
        { name: 'razonsocialdestinatario', type: 'string' },
        { name: 'rucdestinatario', type: 'string' },
        { name: 'dnidestinatario', type: 'string' },
        { name: 'marcanumeroplaca', type: 'string' },
        { name: 'numeroconstanciainscripcion', type: 'string' },
        { name: 'numerolicenciaconductor', type: 'string' },
        { name: 'empresatransporterazonsocial', type: 'string' },
        { name: 'empresatransporteruc', type: 'string' },
        { name: 'idmotivotranslado ', type: 'integer' },
        
    ]
});



// @Model Detalle de ingreso al almacen , muestra todos los ingresos de una orden de compra
Ext.define('megafilmperu.model.MotivoTranslado', {
    extend: 'Ext.data.Model',
    fields: [
      {name: "id", type:'int' },
      {name: "descripcion", type:'string' },
    ]
});

// @Model : Series de documento de venta para los combo de grilla
//
Ext.define('megafilmperu.model.comboSerieDocumento', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'abreviatura',type: 'string'},
        {name: 'comboseriedocumento',type: 'string'}
    ]
});
