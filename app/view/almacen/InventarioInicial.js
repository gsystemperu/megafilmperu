Ext.define('megafilmperu.view.almacen.InventarioInicial', {
        extend: 'Ext.form.Panel',
        xtype: 'wRegInventarioInicial',
        alias: 'widget.wRegInventarioInicial',
        itemId :'wRegInventarioInicial',
      
        requires: [
          'Ext.layout.container.HBox',
          'megafilmperu.view.almacen.InventarioInicialController',
          'Ext.grid.*',
          'Ext.form.field.*',
          'Ext.grid.plugin.*'
        ],
        layout: {
          type: 'vbox',
          pack: 'start',
          align: 'stretch'
        },
        bodyPadding: 2,
        defaults: {
          frame: false,
          bodyPadding: 5
        },
        url :  megafilmperu.util.Rutas.inventarioAgregar,
        controller: 'almacen-inventarioinicial',
        initComponent: function () {
          var st = Ext.create('megafilmperu.store.ProductoInventarioLista');
          var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
    
          me = this;
          Ext.apply(this, {
            items: [
               me.getTituloFormulario(),
               me.getGrillaDetalle(st,rowEditing),
            ],
            bbar :[
              '->',
              {xtype:'button',text : 'CANCELAR',handler:'onClickCancelarInventario'},
              {xtype:'button',text : 'GUARDAR',handler:'onClickGuardarInventario'}
            ]
          });
          this.callParent();
        },
        getTituloFormulario:function(){
            return {
              xtype:'panel',
              layout:{
                type:'vbox',
                align:'stretch'
              },
              bodyPadding:20,
              flex : 1,
              items:[
                {
                  xtype:'hiddenfield',
                  name : 'id',
                  reference:'id',
                  value : 0
                },
                {
                  xtype:'hiddenfield',
                  name : 'jsondetalle',
                  reference:'jsondetalle',
                  
                },
                {
                  xtype: 'label',
                  text :'Inventario / Nuevo',
                  itemId: 'lblTituloProducto',
                  padding : '5 0 5 0',
                  style: {
                    color: '#775c80',
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: '20px'
                  }
                  
                },
                {
                  xtype: 'label',
                  text :'Referencia',
                  style: {
                    color: '#775c80',
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: '20px'
                  },
                  padding : '5 0 5 0',
                  
                },
                 {
                   xtype:'textfield',
                   name : 'referencia',
                   fieldStyle : 'font-size:20px;font-weight:bold;',
                   padding : '5 0 5 0'
                 },
                 {
                  xtype: 'label',
                  text :'Fecha',
                  style: {
                    color: '#775c80',
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: '20px'
                  },
                },
                 {
                   xtype:'datefield',
                   name : 'fechainventario',
                   value : new Date()
                   
                 }
              ]

            };
        },
        getGrillaDetalle:function(st,rowEditing){
          return  {
            flex: 3,
            margin: '0 3 0 0',
            layout: 'fit',
            items: [
              {
              xtype: 'grid',
              reference: 'dgvInvNuevo',
              itemId  : 'dgvInvNuevo',
              store: st,
              sortableColumns: false,
              plugins: [rowEditing],
              plugins: {
                ptype: 'cellediting',
                clicksToEdit: 1
            },
              selModel: 'cellmodel',
              columns: [
                {
                  text: 'Producto',
                  dataIndex: 'nombre',
                  flex: 2,
                  align: 'left'
                }, {
                  text: 'Stock',
                  dataIndex: 'stockfisico',
                  flex: 1,
                  align: 'right',
                  editor :{
                    xtype:'numberfield'
                  },
                  renderer: function (value, metaData, record) {
                    if(value <= 0)
                        metaData.style = "color:red;font-Size:15px";
                    else
                        metaData.style = "font-Size:15px";

                    return value;
                  }
                },
                {
                  text: 'Inventario',
                  dataIndex: 'inventario',
                  flex: 1,
                  align: 'right',
                  editor :{
                    xtype:'numberfield'
                  },
                  renderer: function (value, metaData, record) {
                    if(value <= 0)
                        metaData.style = "color:red;font-Size:15px";
                    else
                        metaData.style = "font-Size:15px";

                    return value;
                  }
                },
                {
                  xtype: 'widgetcolumn',
                  width: 50,
                  align:'center',
                  widget: {
                    xtype: 'button',
                    width: 30,
                    glyph: 0xf00e,
                    tooltip : 'Buscar Productos',
                    handler: 'onClickBuscarProductoSeries'
                  }
                  
        
                },
                {
                  text: 'Diferencia',
                  dataIndex: 'diferencia',
                  flex: 1,
                  align: 'right',
                  editor :{
                    xtype:'numberfield'
                  },
                  renderer: function (value, metaData, record) {
                    if(value <= 0)
                        metaData.style = "color:red;font-Size:15px";
                    else
                        metaData.style = "font-Size:15px";

                    return value;
                  }
                }
               
              ],
              listeners: {
                edit: 'onEditorCalcularDiferencia'
              },
              tbar: [
                
                  {
                  xtype: 'fieldset',
                  layout: 'hbox',
                  flex: 1,
                  padding: '5 5 5 5',
                  defaults: {
                    labelWidth: 50,
                    xtype:'label'
                  },
                  items: [
                    {
                      text :'Nombre',
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
                      reference: 'txtBuscarNombreProductoInventario',
                      flex: 3,
                      enableKeyEvents: true,
                      listeners:{
                        keyup:'onKeyUpBuscarProducto'
                      },
                      fieldStyle : 'font-size:15px;font-weight:bold;'
                    }
                  ]

                },
  
              ]
            }]
          };
        }
     
      });
      