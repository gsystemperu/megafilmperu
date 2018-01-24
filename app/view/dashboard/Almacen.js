
Ext.define('megafilmperu.view.dashboard.Almacen',{
    extend: 'Ext.panel.Panel',
    xtype:'dashboardalmacen',
    requires: [
        'megafilmperu.view.dashboard.AlmacenController',
        'megafilmperu.view.dashboard.AlmacenModel',
        'Ext.layout.container.HBox',
    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
      },
      bodyPadding: 2,
      defaults: {
        frame: false,
        bodyPadding: 3,
        layout: {
          type: 'vbox',
          pack: 'start',
          align: 'stretch'
        },
      },

    controller: 'dashboard-almacen',
    viewModel: {
        type: 'dashboard-almacen'
    },
    initComponent: function () {
      me = this;
      store = Ext.create('megafilmperu.store.Almacenes');
      Ext.apply(this, {
        items: [
          me.getPanelAlmacen(store),
          me.getPanelAlmacenSession(store)
        ]
      });
      this.callParent();
    },
    getPanelAlmacen: function (store) {
    
      var obj = {
        xtype: 'panel',
        flex: 1,
        items: 
        [
          {
              xtype:'panel',
              title:'a',
              flex: 1,
              layout: {
                type: 'hbox',
                align: 'middle'
              },
              items: [
               {
                xtype: 'tabpanel',
                title: 'Tab Panel',
                flex: 1,
                height: 500,
                icon: null,
                glyph: 77,
                tabBarHeaderPosition: 2,
                reference: 'tabpanel',
                plain: true,
                defaults: {
                    bodyPadding: 10,
                    scrollable: true,
                    border: false
                },
                items: [{
                    title: 'Tab 1',
                    icon: null,
                    glyph: 42,
                   // html: KitchenSink.DummyText.longText
                }, {
                    title: 'Tab 2',
                    icon: null,
                    glyph: 70,
                   // html: KitchenSink.DummyText.extraLongText
                }, {
                    title: 'Tab 3',
                    icon: null,
                    glyph: 86,
                   // html: KitchenSink.DummyText.longText
                }]
            }]

          },
          {xtype:'panel',title:'b',flex:1},            
        ]

      };
      return obj;
    },
    getPanelAlmacenSession: function (storealmacen) {
      var obj = {
        xtype: 'panel',
        flex: 1,
        items: 
        [
            {xtype:'panel',title:'d',flex: 1},
            {xtype:'panel',title:'f',flex:1 },            
        ]
  
      };
      return obj;
    }
  });