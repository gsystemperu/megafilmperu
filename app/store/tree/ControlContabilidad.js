Ext.define('megafilmperu.store.tree.ControlContabilidad', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
          {
            text: 'Ventas',
            expanded: true,
            // titulo : '',
             children: [
              {
                text: 'Clientes',
                leaf: true,
                //itemId: "wContenedorOrdenCompra",
                titulo: "Clientes"
              },
              {
                text: 'Facturas de Cliente',
                leaf: true,
                //itemId: "wContenedorFacturaProveedor",
                titulo: "Factura de Cliente"
              },
              {
                text: 'Pagos',
                leaf: true,
                //itemId: "wContenedorFacturaProveedorImportado",
                titulo: "Pagos"
              },
              
            ]
          },

        ]


    }
});

