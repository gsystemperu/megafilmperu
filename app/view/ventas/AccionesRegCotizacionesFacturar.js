Ext.define('megafilmperu.view.ventas.AccionesRegCotizacionesFacturar', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.acciones-regcotizacionfacturar',
  onClickSalirCotizacionFacturar: function () {
    try {
      var me = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0]; //this;
      var l = me.getLayout();
      l.setActiveItem(0);
      Ext.ComponentQuery.query('#frmRegCotizacionFacturar')[0].reset();
    } catch (e) {
      console.log('Ingresar Cotizacion Facturar');
    }
  },
  onClickMantenimiento: function () {
    var _win = Ext.create('megafilmperu.view.ventas.Mantenimiento');
  },
  onClickNuevoCliente: function () {
    var _win = Ext.create('megafilmperu.view.ventas.RegistrarCliente');
    _win.show(btn, function () {}, this);
  },
  onClickGuardarCotizacionFacturar: function () {
    var _form = Ext.ComponentQuery.query('#frmRegCotizacionFacturar')[0];
    if (_form.isValid()) {

      var _dataDetalle = [];
      var _store = this.lookupReference('dgvDetalleVentaFacturar').getStore();
      me = this;
      _store.each(function (record) {
        if (record.get('cantidad') != 0) {
          _reg = {
            "idprod": record.get('idprod'),
            "cantidad": record.get('cantidad'),
            "precio": record.get("precio"),
            "total": record.get("total"),
            "vencimiento": (record.get("vencimiento") == null ? null : Ext.Date.format(record.get("vencimiento"), 'd/m/Y')),
            "series" : record.get("series"),
            "seriescantidades" : record.get("seriescantidades")
          };
          _dataDetalle.push(_reg);
        }

      });
      Ext.ComponentQuery.query('#txtJsonDetalleFacturacion')[0].setValue( JSON.stringify(_dataDetalle) );
      Ext.ComponentQuery.query('#idtienda')[0].setValue(1); // idtienda

      var _view = this.getView();
      _form.submit({
        waitMsg: 'Guardando informacion...',
        success: function (form, action) {
          var me = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0]; //this;
          var l = me.getLayout();
          l.setActiveItem(0);
          dg = Ext.ComponentQuery.query('#dgvVentasFacturar')[0];
          dg.getStore().load();
         if (action.result.error != 0) {
             var objrpt = window.open( megafilmperu.util.Rutas.facturacionImprimirA4+ 'id='+ action.result.error , "", "width=700,height=900");
              //setTimeout(function(){ objrpt.close(); }, 1000);
          }

        },
        failure: function () {
          Ext.Msg.alert("Aviso", action.result.msg);
          _view.close();
        }
      });
    } else {
      megafilmperu.util.Util.showErrorMsg('Ingresar los datos para la facturacion!');
    }
  },
  onClickEliminarcotizacionFacturar: function (button, event, eOpts) {
    var rec = button.getWidgetRecord();
    me = this;
    if (rec.get('estado') == 3) {
      megafilmperu.util.Util.showErrorMsg('No se puede anular esta factura!');
      return false;
    }
    Ext.MessageBox.confirm('Aviso', 'Desea eliminar el producto ?', function (btn) {
      if (btn == 'yes') {
        if (rec) {

          /*Ext.Ajax.request({
              url :megafilmperu.util.Rutas.productoEliminar,
              params:{
                idproducto : rec.get('idprod')
              },
              success:function(response){
                var data = Ext.JSON.decode(response.responseText);
                Ext.each(data,function(r){
                  if(r.error != 0)
                       me.lookupReference('dgvProductos').getStore().load();
                });
              }
          });*/
        }
      }
    });
  },
  onClickIngresarPagoAcuenta: function (btn) {
    r = btn.getWidgetRecord();
    Ext.create('megafilmperu.view.puntoventa.PagosAcuentaPdv',{
        codigo: r.get("idfacturacion"),
        nombre: r.get("nomcompleto"),
        monto: r.get("totalcoti") 
    });
 },
  onClickBuscarCotizacionesFacturasPorFechas: function (btn) {
    __store = Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getStore();
    __store.load({
      params: {
        vDesde: Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
        vHasta: Ext.ComponentQuery.query('#dfHasta')[0].getRawValue()
      }
    });
  },
  onClickVisualizarCotizacionFactura: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    try {
      if (record) {
        //if(_record.get('estado')== 3 ||_record.get('estado')== 4){ Ext.Msg.alert("Aviso","Ya fue generado no se puede modificar!");return false;}
        var me = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0]; //this;
        var l = me.getLayout();
        l.setActiveItem(2);
        Ext.ComponentQuery.query('#frmVisualizarCotizacionFacturar')[0].reset();
        Ext.ComponentQuery.query('#frmVisualizarCotizacionFacturar')[0].loadRecord(record);
        Ext.ComponentQuery.query('#dgvVisualizarDetalleVentaFacturar')[0].getStore().removeAll();

        Ext.Ajax.request({
          url: megafilmperu.util.Rutas.cotizacionDetalle,
          params: {
            vIdCotizacion: record.get('idcoti')
          },
          success: function (response) {
            var _ds = Ext.JSON.decode(response.responseText);
            me.mask('.. cargando');
            Ext.each(_ds.data, function (record) {
              _tot = 0;
              var _store = Ext.ComponentQuery.query('#dgvVisualizarDetalleVentaFacturar')[0].getStore();
              var _precio = 0;
              _data = {
                idprod: parseInt(record.id),
                descripcion: record.descripcion,
                cantidad: record.cantidad,
                precio: record.precio,
                total: record.total,
                vencimiento: record.to_char
              };
              _store.insert(0, _data);
              _tot = _tot + record.total;
            });
            me.unmask();
            __objIgv      = Ext.ComponentQuery.query('#igvfatvisualizar')[0];
            __objSubTotal = Ext.ComponentQuery.query('#subtotalfatvisualizar')[0];
            __objTotal    = Ext.ComponentQuery.query('#totalgenfatvisualizar')[0];
  
            var _igv = 0;
            __objSubTotal.setValue(_tot.toFixed(2));
         
            _igv = _tot * 0.18;
            __objSubTotal.setValue(
                _tot.toFixed(2)
            );
            __objIgv.setValue(
                _igv.toFixed(2) 
            );
            var _totven = 0;
            _totven     = _tot + _igv;
            __objTotal.setValue(
               _totven.toFixed(2)
            );
          }
        });

      } else {
        Ext.Msg.alert("Aviso", "Tiene que seleccionar una cotizacion a facturar!");
        return false;
      }

    } catch (e) {
      console.log('Ingresar Cotizacion a facturar');
    }

  },
  onEditorCalcularTotalFacturacion: function (editor, e) {
    var _cant = 0;
    var _pre = 0;
    _cant = e.record.get('cantidad');
    _pre = e.record.get('precio');
    _tot = _pre * _cant;
    e.record.set('total', _tot.toFixed(2));
     this.onCalcularTotalFacturacion();
  },
  onClickEliminarDetalleFacturacion: function (button, event, eOpts) {
    var store = Ext.ComponentQuery.query('#dgvDetalleVentaFacturar')[0].getStore();
    var rec = button.getWidgetRecord();
    if (rec) {
      store.remove(rec);
      this.onCalcularTotalFacturacion();
    }
  },
  onCalcularTotalFacturacion: function () {
    me = this;
    //__objChk = Ext.ComponentQuery.query('#incluyeigvfacturacion')[0];
    __objIgv = this.lookupReference('igvventasfacturacion');
    __objSubTotal = this.lookupReference('Subtotalventasfacturacion');
    __objTotal = this.lookupReference('TotalGeneralfacturacion');

    var store = Ext.ComponentQuery.query('#dgvDetalleVentaFacturar')[0].getStore();
    var _tot = 0;
    var _igv = 0;
    store.each(function (record) {
      _tot = _tot + record.get('total');
    });
    __objSubTotal.setValue(_tot.toFixed(2));

      var _igv = _tot * 0.18;
    
    __objSubTotal.setValue(
      Ext.util.Format.number(_tot.toFixed(2), "0,000.00")
    );
    __objIgv.setValue(
      Ext.util.Format.number(_igv.toFixed(2), "0,000.00")
    );
    var _totven = 0;
    _totven = _tot + _igv;
    __objTotal.setValue(
      Ext.util.Format.number(_totven.toFixed(2), "0,000.00")
    );
  },
  onClickListarSeries:function(btn){
    re = btn.getWidgetRecord();
    st = Ext.ComponentQuery.query('#dgvDetalleVentaFacturar')[0].getStore();
    w  = Ext.create('Ext.window.Window',{
       title : 'Listada de Productos',
       itemId : 'wProductosUnidades',
       width : 550 ,
       height :600,
       autoShow:true,
       modal : true,
       layout:{
         type:'fit',
         align:'stretch'
       },
       items:[
         {
           xtype    :'wListaSeriesUnidadesVenta',
           codigo   : re.get('idprod'),
           cantidad : re.get('cantidad'),
           registro : re
         }
       ]
    });
   
  },


});
