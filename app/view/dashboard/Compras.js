
Ext.define('megafilmperu.view.dashboard.Compras',{
    extend: 'Ext.panel.Panel',

    requires: [
        'megafilmperu.view.dashboard.ComprasController',
        'megafilmperu.view.dashboard.ComprasModel'
    ],

    controller: 'dashboard-compras',
    viewModel: {
        type: 'dashboard-compras'
    },

    html: 'Hello, World!!'
});
