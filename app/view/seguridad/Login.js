
Ext.define('megafilmperu.view.seguridad.Login',{
    extend: 'Ext.window.Window',
    requires: [
        'megafilmperu.view.seguridad.LoginController',
        'megafilmperu.view.seguridad.LoginModel'
    ],
    autoShow:true,
    width:350,
    height:400,
    alias : 'wLogin',
    controller: 'seguridad-login',
    viewModel: {
        type: 'seguridad-login'
    },
    
    html: 'Hello, World!!'
});
