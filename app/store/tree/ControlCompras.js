Ext.define('megafilmperu.store.tree.ControlCompras', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
            {
                text: 'Orden Compra',
                leaf: true,
                itemId: "wContenedorOrdenCompra",
                titulo: "Orden Compra",
                glyph : 'xf0b1'
              },
              {
                text: 'Factura Nacionales',
                leaf: true,
                itemId: "wContenedorFacturaProveedor",
                titulo: "Factura Nacionales",
                glyph : 'xf0b1'
              },
              {
                text: 'Factura Importacion',
                leaf: true,
                itemId: "wContenedorFacturaProveedorImportado",
                titulo: "Factura Importacion",
                glyph : 'xf0b1'
              },  
        ]

    }
});
