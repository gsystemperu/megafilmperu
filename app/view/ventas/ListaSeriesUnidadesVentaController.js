Ext.define('megafilmperu.view.ventas.ListaSeriesUnidadesVentaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-listaseriesunidadesventa',
    onKeyUpBuscarCodigoBarras:function( obj, e, eOpts){

      if(e.keyCode==13){
          __store  = Ext.ComponentQuery.query('#dgvSeriesProductosUnidadesPdv')[0].getStore();
          __codigo = Ext.ComponentQuery.query('#txtSerieUnico')[0].getValue().trim();
          __record = __store.findRecord('codigobarras', __codigo);
          __arrayseries     = [];
          __arraycantidades = [];
          if(__record)
          {
             __store.beginUpdate();
             __record.set('chk', true);
             __store.endUpdate();

             __contador = 0;
            __store.each(function(record){
                if(record.get('chk') == true)
                {
                  __contador ++ ;
                  //__reg1 = {"serie" : record.get('id')};
                  //__reg2 = {"cantidadventa" : 0};
                  __arrayseries.push(record.get('id'));
                  __arraycantidades.push(0);
                }
            });
            Ext.ComponentQuery.query('#txtTotalSeriesUnidades')[0].setValue(__contador);
            Ext.ComponentQuery.query('#txtSeriesVenta')[0].setValue( __arrayseries  );
            Ext.ComponentQuery.query('#txtCantidadesVenta')[0].setValue( __arraycantidades  );
            //Ext.ComponentQuery.query('#txtJsonSeriesCantidadesVenta')[0].setValue(__jsondata);
          }
      }
    },
    onKeyUpBuscarCodigoBarrasFraccion:function( obj, e, eOpts){

      if(e.keyCode==13){
          __store  = Ext.ComponentQuery.query('#dgvSeriesProductosFraccionPdv')[0].getStore();
          __codigo = Ext.ComponentQuery.query('#txtSerieUnico')[0].getValue().trim();
          __record = __store.findRecord('codigobarras', __codigo);
          if(__record){
            try{
             __store.beginUpdate();
             __record.set('chk', true);
             __store.endUpdate();

             __contador = 0;

            __store.each(function(record){
                if(record.get('chk') == true){
                  __contador ++ ;
                }
            });
            Ext.ComponentQuery.query('#txtTotalItems')[0].setValue(__contador);

            }catch(e){
              __contador = 0;
             __store.each(function(record){
                 if(record.get('chk') == true){
                   __contador ++ ;
                 }
             });

             __grid = Ext.ComponentQuery.query('#dgvSeriesProductosFraccionPdv')[0];
             Ext.ComponentQuery.query('#txtTotalItems')[0].setValue(__contador);

           }
          }

      }
    },
    onEditorSumarMontos:function(editor,e){
      me = this;
      var __store = Ext.ComponentQuery.query('#dgvSeriesProductosFraccionPdv')[0].getStore();
      var __tot = 0;
      //var __jsondata = [];
      var __arrayseries     = [];
      var __arraycantidades = [];
      __store.each(function (record) {
          if( parseFloat(record.get('cantidadventa'))>0 && record.get('chk')==true)
          {
            if(parseFloat(record.get('cantidadventa')) > parseFloat(record.get('medida_metros'))){
               Ext.Msg.alert("Aviso","La cantidad ingresada es mayor al stock !!");return false;
            }
              __tot = parseFloat(__tot) + parseFloat(record.get('cantidadventa'));

              /*__reg1 = {"serie" : record.get('id')};
              __reg2 = {"cantidadventa" : record.get('cantidadventa')};*/
              __arrayseries.push(record.get('id'));
              __arraycantidades.push(record.get('cantidadventa'));

              /*__reg = {
                "serie"         : record.get('id'),
                "cantidadventa" : record.get('cantidadventa')
              };
              __jsondata.push(__reg);*/

          }
      });
      Ext.ComponentQuery.query('#txtTotalCantidadesFraccion')[0].setValue(__tot.toFixed(2));
      Ext.ComponentQuery.query('#txtSeriesVenta')[0].setValue( __arrayseries  );
      Ext.ComponentQuery.query('#txtCantidadesVenta')[0].setValue( __arraycantidades );
      //Ext.ComponentQuery.query('#txtJsonSeriesCantidadesVenta')[0].setValue(JSON.stringify(__jsondata));

    },
    onClickGuardarSeriesFraccion:function(btn){
        __dgv  = btn.up('#dgvSeriesProductosFraccionPdv') ;
        __suma =  Ext.ComponentQuery.query('#txtTotalCantidadesFraccion')[0].getValue();
        if(__dgv.cantidad < __suma ){
            megafilmperu.util.Util.showToast('LA CANTIDAD SOLICITADA ES MENOR A LA SUMA INGRESADA!!');
            return false;

        }
        if(__dgv.cantidad > __suma ){
            megafilmperu.util.Util.showToast('LA SUMA INGRESADA ES MENOR A LA CANTIDAD SOLICITADA!!');
            return false;
        }
        __record = Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getSelectionModel().getSelection()[0];
        __record.set("estado"           ,"COMPLETADO");
        __record.set("series"           ,Ext.ComponentQuery.query('#txtSeriesVenta')[0].getValue().toString());
        __record.set("seriescantidades" ,Ext.ComponentQuery.query('#txtCantidadesVenta')[0].getValue().toString());

        //__record.set("jsonseries", Ext.ComponentQuery.query('#txtJsonSeriesCantidadesVenta')[0].getValue().toString());
        Ext.ComponentQuery.query('#wProductosFraccion')[0].close();
    },
    onClickGuardarSeriesUnidad:function(btn){
      __dgv  = btn.up('#dgvSeriesProductosUnidadesPdv') ;
      __suma =  Ext.ComponentQuery.query('#txtTotalSeriesUnidades')[0].getValue();
      if(__dgv.cantidad < __suma ){
          megafilmperu.util.Util.showToast('LA CANTIDAD SOLICITADA ES MENOR A LO SELECCIONADA !!');
          return false;
      }
      if(__dgv.cantidad > __suma ){
          megafilmperu.util.Util.showToast('LA CANTIDAD SOLICITADA ES SUPERIOR A LO SELECCIONADA!!');
          return false;
      }
      __record = Ext.ComponentQuery.query('#dgvDetalleVentaFacturar')[0].getSelectionModel().getSelection()[0];
      __record.set("estado","COMPLETADO");
      __record.set("series"           ,Ext.ComponentQuery.query('#txtSeriesVenta')[0].getValue().toString());
      __record.set("seriescantidades" ,Ext.ComponentQuery.query('#txtCantidadesVenta')[0].getValue().toString());

      //__record.set("jsonseries", Ext.ComponentQuery.query('#txtJsonSeriesCantidadesVenta')[0].getValue().toString());
      Ext.ComponentQuery.query('#wProductosUnidades')[0].close();
    },
    onClickQuitarSeleccion:function(btn){
      __record = btn.getWidgetRecord();
      __store  = Ext.ComponentQuery.query('#dgvSeriesProductosFraccionPdv')[0].getStore();
      __store.beginUpdate();
      __record.set('chk', false);
      __record.set('cantidadventa', 0);
      __store.endUpdate();

      __contador = 0;
      __store.each(function(rec){
            if(rec.get('chk') == true){__contador ++ ;}
      });
      Ext.ComponentQuery.query('#txtTotalItems')[0].setValue(__contador);
      this.onEditorSumarMontos();
    },
    onClickQuitarSeleccionUnidades:function(btn){
      __record = btn.getWidgetRecord();
      __store  = Ext.ComponentQuery.query('#dgvSeriesProductosUnidadesPdv')[0].getStore();
      __store.beginUpdate();
      __record.set('chk', false);
      __record.set('cantidadventa', 0);
      __store.endUpdate();

      __contador = 0;
      __store.each(function(rec){
            if(rec.get('chk') == true){__contador ++ ;}
      });
      Ext.ComponentQuery.query('#txtTotalSeriesUnidades')[0].setValue(__contador);

    }
});
