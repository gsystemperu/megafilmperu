Ext.define('megafilmperu.store.tree.ControlAlmacen', {
  extend: 'Ext.data.TreeStore',
  root: {
    expanded: true,
    children: [{
        text: 'Almacenes',
        leaf: true,
        itemId: "wRegAlmacen",
        titulo: "Registro Almacenes",
        glyph : 'xf16b'
      }, {
        text: 'Productos',
        leaf: true,
        itemId: "wContenedorProducto",
        titulo: "Registro Productos",
        glyph : 'xf16b'
      },
      {
        text: 'Proveedores',
        leaf: true,
        itemId: "wRegProveedores",
        titulo: "Proveedores",
        glyph : 'xf16b'
      },
      {
        text: 'Ingreso Mercaderia Interna',
        expanded: true,
         children: []
      },
      {
        text: 'Ingreso Mercaderia',
        expanded: true,
         children: [
          {
            text: 'Guias Entrada',
            leaf: true,
            itemId: "wContenedorGuias",
            titulo: "Guia Entrada",
            glyph : 'xf16b'
          }
        ]
      },
      {
        text: 'Devolución Mercaderia',
        expanded: true,
         children: [
          {
            text: 'Crear Guia',
            leaf: true,
            //itemId: "wContenedorOrdenCompra",
            titulo: "Devoluciones",
            glyph : 'xf16b'
          }
        ]
      },
      {
        text: 'Inventario Mercaderia',
        expanded: true,
         children: [
          {
            text: 'Registro de Inventario',
            leaf: true,
            itemId: "wContenedorInventario",
            titulo: "Inventario",
            glyph : 'xf16b'
          },
          {
            text: 'Cierre de Inventario',
            leaf: true,
            itemId: "wRegInventarioInicial",
            titulo: "Inventario",
            glyph : 'xf16b'
          }
        ]
      }


    ]


  }
});
