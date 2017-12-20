Ext.define('megafilmperu.store.tree.ControlVentas', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
             { text: 'Clientes', leaf: true, itemId: "wContenedorCliente", titulo :'Clientes', glyph : 'xf022'},
             { text: 'Cotizaciones', leaf: true, itemId: "wContenedorCotizaciones", titulo :'Cotizaciones' , glyph : 'xf022'},
             { text: 'Productos', leaf: true, itemId: "wContenedorProducto", titulo :'Productos' , glyph : 'xf022'},
             {
               text: 'Facturacion',
               expanded: true,
                children: [
                 {
                   text: 'Cotización a Facturar',
                   leaf: true,
                   itemId: "wContenedorCotizacionesFacturar",
                   titulo: "Ventas a Facturas",
                    glyph : 'xf022'
                 }
               ]
             },
             {
               text: 'Punto Venta',
               expanded: true,
               //leaf : true,
                titulo : '',
                children: [
                 {
                   text: 'Factura',
                   leaf: true,
                   itemId: "wContenedorPuntoVenta",
                   titulo: "Factura" , glyph : 'xf022'
                 },
                 {
                   text: 'Boleta',
                   leaf: true,
                   itemId: "wContenedorPuntoVentaB",
                   titulo: "Boleta" , glyph : 'xf022'
                 },
                
               ]
             }
        ]
    }
});
