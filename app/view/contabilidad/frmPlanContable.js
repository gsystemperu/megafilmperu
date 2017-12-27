
Ext.define('megafilmperu.view.contabilidad.frmPlanContable',{
    extend: 'Ext.form.Panel',
    xtype:'frmPlanContable',
    alias :'widget.frmPlanContable',
    requires: [
        'Ext.layout.container.HBox',
        'megafilmperu.view.contabilidad.frmPlanContableController',
        'Ext.grid.*',
        'Ext.form.field.Number'
    ],
    controller: 'contabilidad-frmplancontable',
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
    initComponent: function () {
      var storePlanContable = Ext.create('megafilmperu.store.PlanContable');
      me = this;
      Ext.apply(this, {
        items: [{
            flex: 3,
            margin: '0 3 0 0',
            layout: 'fit',
            items: [
              {
              xtype: 'grid',
              itemId: 'dgvPlanContable',
              reference: 'dgvPlanContable',
              store: storePlanContable,
              sortableColumns: false,
              columns: [
                {
                  text: 'Nombre',
                  dataIndex: 'nombre',
                  flex: 2,
                  align: 'left'
                }, {
                  text: 'Unidad Publico',
                  dataIndex: 'preciounidadpublico',
                  flex: 1,
                  align: 'right'
                },
                {
                  text: 'Unidad Especial',
                  dataIndex: 'preciounidadespecial',
                  flex: 1,
                  align: 'right'
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
                      text :'Código',
                      padding: '5px 0 0 0',
                      border: false,
                      width: 100,height: 25,
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
                     reference: 'txtBuscarCodigoProducto',
                     flex: 1,
                     enableKeyEvents: true,
                     buscar:'codigo',
                     listeners:{
                       keyup:'onKeyUpBuscarProducto'
                     },
                     fieldStyle : 'font-size:15px;font-weight:bold;'
                   },
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
                      reference: 'txtBuscarNombreProducto',
                      flex: 3,
                        enableKeyEvents: true,
                      listeners:{
                        keyup:'onKeyUpBuscarProducto'
                      },
                      fieldStyle : 'font-size:15px;font-weight:bold;'
                    }
                  ]
  
  
                },
  
              ],
              listeners: {
                itemclick: 'onClickItemProductoERP',
                itemdblclick: 'onClickItemProducto'
              }
  
            }]
          },
  
        ]
      });
      this.callParent();
    }
  });
  