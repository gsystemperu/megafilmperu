
Ext.define('megafilmperu.Application', {
    extend: 'Ext.app.Application',
    name: 'megafilmperu',
    stores: [
      'StoreMantenimientos',
      'StoreProductos',
      'StoreProveedores',
      'StoreAbastecimiento',
      'StoreOrdenCompra',
      'StoreVentas',
      'StoreContabilidad'
    ],
    views:[
        'main.Main',
        'conf.Maestros',
        'conf.Empresa',
        'almacen.Almacenes',
        'almacen.Producto',
        'almacen.ReglasAbastecimiento',
        'almacen.IngresarAbastecimiento',
        'almacen.Proveedor',
        'almacen.ProductoBuscar',
        'almacen.FormProveedor',
        'compras.OrdenCompra',
        'compras.GuiasEntrada',
        'compras.ContenedorGuias',
        'almacen.ProductoExistencias',
        'almacen.ContenedorProducto',
        'almacen.ProductoUbicacion',
        'compras.ContenedorOrdenCompra',
        'almacen.ProductoBuscarOC',
        'compras.PagosAcuenta',
        'almacen.ProductoPrecios',
        'almacen.ContenedorFacturaProveedor',
        'almacen.ListadoFacturarProveedor',
        'almacen.FormCrearFacturaProveedor',
        'almacen.ContenedorFacturaProveedorImportado',
        

        'ventas.ContenedorCotizaciones',
        'ventas.ContenedorCliente',
        'ventas.ListadoDeCotizaciones',
        'ventas.RegistrarCliente',
        'ventas.RegistrarProducto',
        'ventas.BuscarProducto',
        'ventas.ListadoClientes',
        'ventas.ListadoProductos',
        'ventas.Mantenimiento',
        'ventas.VisorClienteCotizacion',
        'ventas.VisorProductoCotizacion',
        'ventas.VisorVendedorCotizacion',
        'ventas.EditarCotizacion',
        'ventas.Imprimir',
        'ventas.ListadoUsuarios',
        'ventas.CotizacionesClienteBuscar',
        'ventas.ListadoDeCotizacionesFacturar',
        'ventas.ContenedorCotizacionesFacturar',
        'ventas.RegistroCotizacionFacturar',
        'ventas.PagosAcuenta',
        'ventas.VisualizarCotizacionFacturar',
        'ventas.GuiaRemision',
        'ventas.ListaSeriesUnidadesVenta',

        'puntoventa.ContenedorMain',
        'puntoventa.ContenedorMainB',
        'puntoventa.ListadoPdv',
        'puntoventa.PagosAcuentaPdv',
        'puntoventa.AccionesPagosAcuentaPdv',
        'puntoventa.ListaSeriesUnidades',
        'puntoventa.ListaSeriesFraccion',

        'contabilidad.frmTipoCambio'

    ],

     models: [
      'megafilmperu.model.DataModels',
      'megafilmperu.model.DataModelVentas'
    ],
    launch: function () {
       Ext.util.Format.decimalSeparator = '.';
       Ext.util.Format.thousandSeparator = ' ';

       Ext.getBody().on('keydown', function(ev){
       if(ev.getKey() === ev.self.F2){
            megafilmperu.util.Util.crearWindowOpenMantenimiento('Tipo de Cambio','wfrmTipoCambio',450,130,null,'wTipoCambio');
         } 
       });

       Ext.create('wMain');
       document.getElementById("splashscreen").style.display = 'none';  
    }
});
