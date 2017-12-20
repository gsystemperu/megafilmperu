Ext.define('megafilmperu.store.DataTemp', {
    extend: 'Ext.data.Store',
    fields: ["id", "descripcion"],
    data: [{ id: 'test' }],
    proxy: { type: 'memory' }
});

Ext.define('megafilmperu.store.TipoDocumento', {
    extend: 'Ext.data.Store',
    fields: ["id", "descripcion"],
    data: [
        { id: 'SD', descripcion: 'SIN DOCUMENTO' },
        { id: 'B', descripcion: 'BOLETA' },
        { id: 'F', descripcion: 'FACTURA' },
        { id: 'OP', descripcion: 'ORDEN PEDIDO' },
        { id: 'G', descripcion: 'GUIA' }
    ],
    proxy: { type: 'memory' }
});

Ext.define('megafilmperu.store.DetalleAbastecimiento', {
    extend: 'Ext.data.Store',
    fields: [
            {name: "idprod", type:'int' },
            {name: "producto", type:'string' },
            {name: "cantidad", type:'int' },
            {name: "precio", type:'float' },
            {name: "total", type:'float' }  ,
            {name: "vencimiento",type:'date', format:'d/m/Y'},
            {name: "genserie",type:'boolean'}
    ],
    proxy: { type: 'memory' }
});


Ext.define('megafilmperu.store.DetalleOrdenCompra', {
    extend: 'Ext.data.Store',
    fields: [
            {name: "idprod", type:'int' },
            {name: "producto", type:'string' },
            {name: "cantidad", type:'int' },
            {name: "precio", type:'float' },
            {name: "total", type:'float' }
    ],
    proxy: { type: 'memory' }
});

/*
  @ Store Temporal para el detalle del ingreso al almacen de una o varias guias
 */
Ext.define('megafilmperu.store.TmpOrdenCompraConfirmadas', {
    extend: 'Ext.data.Store',
    fields: [
      {name: 'idordencompra',type: 'int'},
      {name :'item',type:'int'},
      {name :'idprod',type:'int'},
      {name :'producto',type:'string'},
      {name :'cantidad',type:'int'},
      {name :'preciocompra',type:'float'},
      {name :'cantidadrecibida',type:'int'},
      {name :'numeroguia',type:'string'},
      {name: "vencimiento",type:'date', format:'d/m/Y'}

    ],
    proxy: { type: 'memory' }
});


/**
 * Detalle de proveedores en la vista de producto.
 * un producto puede tener varios proveedores con diferentes
 * precios.
 *
 * @type {Store}
 */

Ext.define('megafilmperu.store.DetProductoProveedor', {
    extend: 'Ext.data.Store',
    fields: [
            {name: "razonsocial"},
            {name: "precio", type:'float' }
    ],
    data : [
      ['' ,0 ]
    ],
    proxy: { type: 'memory' }
});


Ext.define('megafilmperu.store.PagosAcuenta', {
    extend: 'Ext.data.Store',
    fields: [
            {name: "fecha",type:'date',format:'d/m/Y'},
            {name: "monto", type:'float' }
    ],
    /*data : [
      ['' ,0 ]
    ],*/
    proxy: { type: 'memory' }
});


Ext.define('megafilmperu.store.CajaDetalleVenta', {
    extend: 'Ext.data.Store',
    fields: [
      {name: "idprod", type:'int' },
      {name: "codigogenerado", type:'string' },
      {name: "producto", type:'string' },
      {name: "cantidad", type:'int' },
      {name: "precio", type:'float' },
      {name: "precioporunidad", type:'float' },
      {name: "precioporfraccion", type:'float' },
      {name: "preciofraccionremate", type:'float' },
      {name: "preciounidadremate", type:'float' },
      {name: "total", type:'float' },
      {name: "metros", type:'float' },
      {name: "precioanterior",type:'float'},
      {name :'series',type:'string'},
      {name :'seriescantidades',type:'string'},
      {name :'estado',type:'string'}
    ],
    /*data : [
      [0,'','', , , , , ],

    ],*/
    proxy: { type: 'memory' }
});

Ext.define('megafilmperu.store.ListaSeriesFraccionVenta', {
    extend: 'Ext.data.Store',
    fields: [
      {name :'id',type:'int'},
      {name :'codigobarras',type:'string'},
      {name: "vencimiento",type:'string'},
      {name: "estado",type:'string'},
      {name: "chk",type:'boolean'},
      {name: "medida_metros",type:'float'},
      {name: "cantidadventa",type:'float'}
    ],
    /*data : [
      [0,'','', , , , , ],

    ],*/
    proxy: { type: 'memory' }
});



Ext.define('megafilmperu.store.GuiaRemisionDetalle', {
    extend: 'Ext.data.Store',
    fields: [
      {name: "cantidad", type:'float' },
      {name: "idprod", type:'integer' },
      {name: "descripcion", type:'string' },
      {name: "unidadmedida", type:'float' },
      {name: "pesototal", type:'float' }
    ],
    proxy: { type: 'memory' }
});
