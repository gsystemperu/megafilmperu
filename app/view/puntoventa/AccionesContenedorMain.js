Ext.define('megafilmperu.view.puntoventa.AccionesContenedorMain', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-contenedormain',
    requires:['megafilmperu.util.Rutas'],
    init:function(){},
    onSelectSeleccionarCliente:function( combo, record, eOpts ){
        Ext.ComponentQuery.query('#txtPorcentajeGerencia')[0].setValue( record.get('porcentajegerencial') );
    },
    onClickIngresarPago:function(btn){
        st =Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore(); 
        if(st.getCount()==0){
           megafilmperu.util.Util.showToast("TIENE QUE INGRESAR EL DETALLE DE LA VENTA"); return false;
        }
        if(st.find('estado','INCOMPLETO')==0){
          megafilmperu.util.Util.showToast("TIENE QUE INGRESAR LAS SERIES DE LOS PRODUCTOS"); return false;
        }
        try{
          me =  Ext.ComponentQuery.query('#wContenedorPuntoVenta')[0];    //this;
          var l = me.getLayout();
          l.setActiveItem(1);
        } catch (e) {
          me =  Ext.ComponentQuery.query('#wContenedorPuntoVentaB')[0];    //this;
          var l = me.getLayout();
          l.setActiveItem(1);
        }
        __porcentajeGerencial = Ext.ComponentQuery.query('#txtPorcentajeGerencia')[0].getValue();
        __tipoDocumento = Ext.ComponentQuery.query("#tabPrincipal")[0].getActiveTab().title;
        __radios = Ext.ComponentQuery.query("#rgtipodocumento")[0];
        switch (__tipoDocumento) {
          case 'Factura':
              __radios.items.items[2].setValue(true);
          break;
          case 'Boleta':
              __radios.items.items[1].setValue(true);
          break;
          case 'Nota':
              __radios.items.items[0].setValue(true);
          break;
        }
        if(__porcentajeGerencial!=0)
        {

              __valorVenta = Ext.ComponentQuery.query('#txtTotalVentaCaja')[0].getValue();
              Ext.ComponentQuery.query('#txtTotalVentaPago')[0].setValue(  Ext.util.Format.currency(__valorVenta,' ',2,false)     );
              __valorVenta = __valorVenta - (__valorVenta * (__porcentajeGerencial/100));
              Ext.ComponentQuery.query('#txtTotalVentaCajaValidar')[0].setValue( Ext.util.Format.currency(__valorVenta,' ',2,false)   );
              __valorVenta = __valorVenta * (__porcentajeGerencial/100)
              Ext.ComponentQuery.query('#txtPorcentajeDescuento')[0].setValue(Ext.util.Format.currency(__valorVenta,' ',2,false));

        }else{
              __valorVenta = Ext.ComponentQuery.query('#txtTotalVentaCaja')[0].getValue()
              Ext.ComponentQuery.query('#txtTotalVentaPago')[0].setValue(  Ext.util.Format.currency(__valorVenta,' ',2,false)     );
              Ext.ComponentQuery.query('#txtTotalVentaCajaValidar')[0].setValue(Ext.util.Format.currency(__valorVenta,' ',2,false)   );
              Ext.ComponentQuery.query('#txtPorcentajeDescuento')[0].setValue(Ext.util.Format.currency(0,' ',2,false));
        }
        __valorVenta = Ext.ComponentQuery.query('#txtTotalVentaCajaValidar')[0].getValue();
        __valorIgv   = parseFloat(__valorVenta) * 0.18;
        Ext.ComponentQuery.query('#txtTotalVentaCajaValidar')[0].setValue(
          Ext.util.Format.currency(__valorVenta,' ',2,false)
        );
        Ext.ComponentQuery.query('#txtTotalVentaCajaIgv')[0].setValue(
          Ext.util.Format.currency(__valorIgv,' ',2,false)
        );
        __valorTotalGeneral =  parseFloat( __valorVenta) + __valorIgv;
        Ext.ComponentQuery.query('#txtTotalVentaCajaGeneral')[0].setValue(
            Ext.util.Format.currency(__valorTotalGeneral,' ',2,false)
        );

        Ext.ComponentQuery.query('#txtSaldoVentaCajaValidar')[0].setValue(
          Ext.util.Format.currency(__valorVenta,' ',2,false)
        );
        Ext.ComponentQuery.query('#cboCliente')[0].setHidden(false);
        Ext.ComponentQuery.query('#cboCliente')[0].setReadOnly(true);
        Ext.ComponentQuery.query('#btnNuevoClientePdv')[0].setHidden(false);
        Ext.ComponentQuery.query('#btnVentasPdv')[0].setDisabled(false);

        Ext.ComponentQuery.query('#txtIdTienda')[0].setValue(1); // idtienda

    },
    onClickRegresarPago:function(btn){
      try {
        var me =  Ext.ComponentQuery.query('#wContenedorPuntoVenta')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(0);
      } catch (e) {
        var me =  Ext.ComponentQuery.query('#wContenedorPuntoVentaB')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(0);
      }
        Ext.ComponentQuery.query('#txtTotalVentaCajaValidar')[0].setValue(0);
        Ext.ComponentQuery.query('#cboCliente')[0].setHidden(false);
        Ext.ComponentQuery.query('#cboCliente')[0].setReadOnly(false);
        Ext.ComponentQuery.query('#btnNuevoClientePdv')[0].setHidden(false);
        Ext.ComponentQuery.query('#btnVentasPdv')[0].setDisabled(false);


    },
    onClickListadoVentaPdv:function(btn){
      try {
        var me =  Ext.ComponentQuery.query('#wContenedorPuntoVenta')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(2);
      } catch (e) {
        var me =  Ext.ComponentQuery.query('#wContenedorPuntoVentaB')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(2);
      }
        Ext.ComponentQuery.query('#cboCliente')[0].setHidden(true);
        Ext.ComponentQuery.query('#btnNuevoClientePdv')[0].setHidden(true);
        Ext.ComponentQuery.query('#btnVentasPdv')[0].setDisabled(true);
        Ext.ComponentQuery.query('#dgvVentasFacturarPdv')[0].getStore().load();


    },
    onClickNuevoClientePDV:function(btn){
      megafilmperu.util.Util.crearWindowOpenMantenimiento('Agregar Cliente','frmclientenuevo',650,600,'cboCliente','wFormClienteListado');
    }
});
