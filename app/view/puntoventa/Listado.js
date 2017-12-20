Ext.define('megafilmperu.view.puntoventa.Listado',{
    extend: 'Ext.panel.Panel',
    xtype :'wListadoProducto',
    alias : 'wListadoProducto',
    requires: [
        'megafilmperu.view.puntoventa.ListadoController',
        'Ext.toolbar.TextItem',
        'Ext.view.View',
        'Ext.ux.DataView.Animated'
    ],
    controller: 'puntoventa-listado',
    bodyPadding:3,
    layout:'fit',
    initComponent:function(){
        me = this;
        /********************************************************************************************
          Listado de productos por cliente, se tiene que seleccionar el cliente o crearlo para
          porder buscar los precios de los items segun su configuracion de precios.
         *******************************************************************************************/
        __storeProducto     = Ext.create('megafilmperu.store.ProductosPorCliente');
        console.log(__storeProducto);
         Ext.apply(this,{
             items:[{
                   xtype: 'dataview',
                   layout:'fit',
                   autoScroll :true,
                   itemId : 'dvListaProductos',
                    tpl: [
                        '<tpl for=".">',
                            '<div class="cuarto">',
                                    //'<table style="width:100%;" border="0" cellpadding="0" cellspacing="0" ><tr>',
                                       /*'<tpl if="imagen &gt;= true">',
                                            '<td><img src="resources/images/productos/{idprod}.jpg" width=80 height=80 /></td>',
                                       '<tpl else >',
                                            '<td><img src="resources/images/no-img.jpg" width=80 height=80 /></td>',
                                       '</tpl>',*/
                                        //'<td><table style="width:100%;" border="0" cellpadding="0" cellspacing="0">',

                                        '<table style="width:100%;" border="0" CELLPADDING="0" CELLSPACING="0">',
                                            '<tpl > ',
                                                 '<tr>',
                                                     '<td  align="left" class="productoprecio">Unidad : S./ {precioporunidad}</td>',
                                                 '</tr>',
                                                 '<tr>',
                                                     '<td  align="left" class="productoprecio">Fraccion : S./ {precioporfraccion}</td>',
                                                 '</tr>',
                                                 '<tr>',
                                                     '<td  align="left" class="productoprecio">Uni.Remate : S./ {preciounidadremate}</td>',
                                                 '</tr>',
                                                 '<tr>',
                                                     '<td  align="left" class="productoprecio">Fra.Remate : S./ {preciofraccionremate}</td>',
                                                 '</tr>',
                                                 /*'<tr>',
                                                     '<td  align="left" class="productoprecio">Stock : {existencias}</td>',
                                                 '</tr>',*/
                                                 '<tr>',
                                                     '<td  align="left" class="productoprecio">Stock (m): {stock_metros}</td>',
                                                 '</tr>',
                                                 '<tr>',
                                                     '<td class="productonombre">{nombre}</td>',
                                                 '</tr>',
                                            '</tpl>',


                                        '</table>',
                                    //'</td>',
                                    //'</tr></table>',
                            '</div>',
                        '</tpl>'
                    ],
                    plugins: {
                        xclass: 'Ext.ux.DataView.Animated'
                    },
                    multiSelect:true,
                    store:__storeProducto,
                    trackOver: true,
                    overItemCls: 'x-item-over',
                    itemSelector: 'div.cuarto',
                    listeners:{ itemclick :'accionClickItem'}
                }
             ],
             tbar:[
               {
                   xtype:'label',
                   text :'CÓDIGO',
                   padding: '5px 0 0 0',
                   border: true,
                   width: 90,
                   height: 25,
                   style: {
                       background: '#775c80',
                       color: 'white',
                       textAlign: 'center',
                       fontWeight: 'bold',
                       fontSize: '13px'
                   }
               },
               {
                 xtype: 'textfield',
                 flex: 0.5,
                 buscar: 'codigo',
                 enableKeyEvents: true,
                 listeners:{
                   keyup:'onKeyUpBuscarProducto'
                 }
               },
               {
                   xtype:'label',
                   text :'PRODUCTO',
                   padding: '5px 0 0 0',
                   border: true,
                   width: 90,
                   height: 25,
                   style: {
                       background: '#775c80',
                       color: 'white',
                       textAlign: 'center',
                       fontWeight: 'bold',
                       fontSize: '13px'
                   }
               },
               {
                 xtype: 'textfield',
                 flex: 1,
                 enableKeyEvents: true,
                 buscar: 'nombre',
                 listeners:{
                   keyup:'onKeyUpBuscarProducto'
                 }
               }
             ]
         });
        this.callParent(arguments);

    },

});
