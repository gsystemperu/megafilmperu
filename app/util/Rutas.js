Ext.define('megafilmperu.util.Rutas', {
    statics: {
        required: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
        //@ Acciones => Formularios
        estadoGuardar: 'resources/api/estado_actualizar',
        bancoGuardar: 'resources/api/banco_actualizar',
        bancoEliminar: 'resources/api/banco_eliminar',
        categoriaGuardar: 'resources/api/categoria_actualizar',
        categoriaEliminar: 'resources/api/categoria_eliminar',
        colorGuardar: 'resources/api/color_actualizar',
        colorEliminar: 'resources/api/color_eliminar',
        medidaGuardar: 'resources/api/medidas_actualizar',
        medidaEliminar: 'resources/api/medidas_eliminar',
        unidadMedidaGuardar: 'resources/api/unidad_medida_actualizar',
        unidadMedidaEliminar: 'resources/api/unidad_medida_eliminar',
        tipoProductoGuardar: 'resources/api/tipo_producto_actualizar',
        tipoProductoEliminar: 'resources/api/tipo_producto_eliminar',
        almacenGuardar: 'resources/api/almacen_actualizar',
        almacenEliminar: 'resources/api/almacen_eliminar',
        seccionAlmacenGuardar: 'resources/api/almacen_seccion_actualizar',
        seccionAlmacenEliminar: 'resources/api/almacen_seccion_eliminar',

        //@Acciones => Producto
        productoGuardar: 'resources/api/producto_actualizar',
        productoEliminar: 'resources/api/producto_eliminar',
        productoGuardarUbicacion  : 'resources/api/producto_ubicacion_guardar',
        productoBuscarCodigoBarras: 'resources/api/producto_buscar_codigobarras',
        productoBuscarProveedores: 'resources/api/producto_buscar_proveedores',
        productoActualizarPrecios: 'resources/api/producto_actualizar_precios',

        
        //@Acciones => Abastecimiento
        abastecimientoGuardar: 'resources/api/abastecimiento_guardar',

        //@Acciones => Orden de Compra
        ordenCompraGuardar: 'resources/api/ordencompra_guardar',
        ordenCompraEditar: 'resources/api/ordencompra_modificar',
        ordenCompraConfirmar: 'resources/api/ordencompra_confirmar',
        OrdenCompraConfirmadaDetalle: 'resources/api/ordencompra_detalleconfirmadas',
        guiaProveedorGuardar: 'resources/api/guiaproveedor_guardar',
        ordenCompraBuscarDetalle: 'resources/api/ordencompra_buscar_detalle',
        ordenCompraAnular: 'resources/api/ordencompra_anular',
        ordenCompraIngresarPagoAcuenta: 'resources/api/ordencompra_ingresar_pago_acuenta',
        ordenCompraBuscarPagoAcuenta: 'resources/api/ordencompra_buscar_pago_acuenta',
        ordenCompraAnularConfir: 'resources/api/ordencompra_anular_confirmacion',
        ordenCompraAnularFacturacion: 'resources/api/ordencompra_anular_facturacion',
        
        
        //@Acciones => Proveedor
        proveedorGuardar: 'resources/api/proveedor_actualizar',
        proveedorEliminar: 'resources/api/proveedor_eliminar',

        //@ Acciones => cotizaciones  *****************************************

        cotizacionGuardar:'resources/api/agregar_cotizacion',
        cotizacionEliminar:'resources/api/eliminar_cotizacion',
        clienteGuardar:'resources/api/agregar_cliente',
        clienteGuardarViaListado:'resources/api/agregar_cliente_via_listado',
        cotizacionDetalle :'resources/api/cotizacion_detalle_vista',

        //@ Acciones => Facturacion  *****************************************
        facturacionGuardar:'resources/api/agregar_facturacion',
        facturacionAgregarPagosAcuenta:'resources/api/agregar_pago_acuenta',
        facturacionBuscarPagosAcuenta:'resources/api/buscar_pago_acuenta',
        facturacionGuardarPagoPuntoVenta:'resources/api/agregar_punto_venta_pago',
        facturacionGuardarCompra:'resources/api/insertar_compra_factura',
        
        //facturacionAnular:'resources/api/anular_facturacion',
        facturacionDetalle:'resources/api/detalle_facturacion',
        //apeturaCajaInsertar:'resources/api/ingresar_apetura_caja',

        facturacionImprimirA4:'resources/api/impfacturaa4?',
        facturacionImprimir:'resources/api/impfactura?',


        
        //  productoGuardar:'resources/api/guardar_producto',
        productoEliminar:'resources/api/eliminar_producto',
        clienteBuscarCodigo:'resources/api/buscar_cliente_codigo',
        clienteEliminar:'resources/api/eliminar_cliente',
        //@ Rutas Mantenimiento
        unidadMedidaGuardar:'resources/api/agregar_unidad_medida',
        formaPagoGuardar:'resources/api/agregar_forma_pago',
        modoEntregaGuardar:'resources/api/agregar_modo_entrega',
        vendedorGuardar:'resources/api/agregar_vendedor',
        vendedorEliminar:'resources/api/eliminar_vendedor',
        modoEntregaEliminar:'resources/api/eliminar_modo_entrega',
        formaPagoEliminar:'resources/api/eliminar_forma_pago',
        presentacionGuardar:'resources/api/agregar_presentacion',
        categoriaGuardar:'resources/api/agregar_categoria',
        presentacionEliminar:'resources/api/eliminar_presentacion',
        categoriaEliminar:'resources/api/eliminar_categoria',
        cotizacionesDelClienteBuscar:'resources/api/buscar_cotizaciones_cliente',
        confirmarVentaCotizacion : 'resources/api/confirmar_venta_cotizacion',
        //*****************************

        //@ Rutas para impresion
        rptImprimirCotizacion:'resources/api/impresion?',


        //@ Rutas para contabilidad
        insertarTipoCambio:'resources/api/insertar_tipo_cambio',

        //@ guias de remision
         guiaRemisionActualizar:'resources/api/actualizar_guia_remision',
         ImprimirguiaRemision:'resources/api/impguiaremision?',
         //@ Empresa
         listarEmpresa:'resources/api/listar_empresas',
         actualizarEmpresa:'resources/api/actualizar_empresa',
         

         
              
              
        
    }   

});
