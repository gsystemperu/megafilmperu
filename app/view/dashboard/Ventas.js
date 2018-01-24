
Ext.define('megafilmperu.view.dashboard.Ventas',{
    extend: 'Ext.panel.Panel',

    requires: [
        'megafilmperu.view.dashboard.VentasController',
        'megafilmperu.view.dashboard.VentasModel'
    ],

    controller: 'dashboard-ventas',
    viewModel: {
        type: 'dashboard-ventas'
    },

    html: 'Hello, World!!'
});
