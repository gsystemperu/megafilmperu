Ext.define('megafilmperu.view.almacen.ProductoPrecios', {
    extend: 'Ext.panel.Panel',
    xtype: 'wRegProductoPrecios',
    alias: 'widget.wRegProductoPrecios',
    requires: [
      'Ext.layout.container.HBox',
      'megafilmperu.view.almacen.AccionesProductoPrecios',
      'Ext.grid.*',
      'Ext.form.field.Number',
      'Ext.grid.plugin.*'
    ],
    layout: {
      type: 'hbox',
      pack: 'start',
      align: 'stretch'
    },
    bodyPadding: 2,
    defaults: {
      frame: false,
      bodyPadding: 5
    },
    controller: 'acciones-productoprecios',
    initComponent: function () {
      var storeProducto = Ext.create('megafilmperu.store.Productos');
      var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    });

      me = this;
      Ext.apply(this, {
        items: [{
            flex: 3,
            margin: '0 3 0 0',
            layout: 'fit',
            items: [
              {
              xtype: 'grid',
              itemId: 'dgvProductosPrecios',
              reference: 'dgvProductosPrecios',
              store: storeProducto,
              sortableColumns: false,
              plugins: [rowEditing],
              plugins: {
                ptype: 'cellediting',
                clicksToEdit: 1
            },
              selModel: 'cellmodel',
              columns: [
                {
                  text: 'Nombre',
                  dataIndex: 'nombre',
                  flex: 2,
                  align: 'left'
                }, {
                  text: 'Precio Unidad Publico',
                  dataIndex: 'preciounidadpublico',
                  flex: 1,
                  align: 'right',
                  editor :{
                    xtype:'numberfield'
                  }
                },
                {
                  text: 'Precio  Unidad Especial',
                  dataIndex: 'preciounidadespecial',
                  flex: 1,
                  align: 'right',
                  editor :{
                    xtype:'numberfield'
                  }
                },
                {
                  text: 'Precio Unidad Vip',
                  dataIndex: 'preciounidadvip',
                  flex: 1,
                  align: 'right',
                  editor :{
                    xtype:'numberfield'
                  }
                }, {
                  text: 'Precio Fraccion Publico',
                  dataIndex: 'preciofraccionpublico',
                  flex: 1,
                  align: 'right',
                  editor :{
                    xtype:'numberfield'
                  }
                },
                {
                  text: 'Precio Fraccion Especial',
                  dataIndex: 'preciofraccionespecial',
                  flex: 1,
                  align: 'right',
                  editor :{
                    xtype:'numberfield'
                  }
                },
                {
                  text: 'Precio Fraccion Vip',
                  dataIndex: 'preciofraccionvip',
                  flex: 1,
                  align: 'right',
                  editor :{
                    xtype:'numberfield'
                  }
                }
               
              ],
              tbar: [{
                  xtype: 'fieldset',
                  title: '<b>Buscar Por</b>',
                  layout: 'hbox',
                  flex: 1,
                  padding: '0 5 10 5',
                  defaults: {
                    labelWidth: 50,
                    xtype:'label'
                  },
                  items: [
                    {
                      text :'nombre',
                      padding: '5px 0 0 0',
                      border: false,
                      width: 100,height: 25,
                      buscar:'nombre',
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
                      reference: 'txtBuscarNombreProducto',
                      flex: 2,
                        enableKeyEvents: true,
                      listeners:{
                        keyup:'onKeyUpBuscarProducto'
                      },
                      fieldStyle : 'font-size:15px;font-weight:bold;'
                    },{
                      xtype:'button',
                      flex: 1,
                      text : 'GRABAR CAMBIOS',
                    handler : 'onClickGuardarCambiosPrecios'
                    }
                  ]

                },
  
              ]
            }]
          },
  
        ]
      });
      this.callParent();
    },
 
  });
  