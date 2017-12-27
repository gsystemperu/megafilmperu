Ext.define('megafilmperu.view.almacen.ListaSeriesInventarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.almacen-listaseriesinventario',
    //@Acciones
   
     onChangeBuscarCodigoBarrasUnidad( obj, newValue, oldValue, eOpts ) {
        if(newValue){
             st  = this.lookupReference('dgvSeriesProductosInventario').getStore();
             c = Ext.ComponentQuery.query('#txtSerieUnico')[0].getValue().trim();
             r = st.findRecord('codigobarras', c);
             se     = [];
             ca = [];
             if(r)
             {
               st.beginUpdate();
               r.set('chk', true);
               st.endUpdate();
               co = 0;
               st.each(function(record){
                   if(record.get('chk') == true)
                   {
                     co ++ ;
                     se.push(record.get('id'));
                     ca.push(0);
                   }
               });
               Ext.ComponentQuery.query('#txtTotalSeriesUnidades')[0].setValue(co);
               Ext.ComponentQuery.query('#txtSeriesVenta')[0].setValue( se  );
               Ext.ComponentQuery.query('#txtCantidadesVenta')[0].setValue( ca  );
               obj.setValue('');
            }else{
              Ext.Msg.alert("Aviso","El producto escaneado es diferente al solicitado");return false;
              obj.setValue('');
            }
        }
     },
     onClickGuardarSeriesUnidad:function(btn){
        suma =  Ext.ComponentQuery.query('#txtTotalSeriesUnidades')[0].getValue();
        st   =  Ext.ComponentQuery.query('#dgvInvNuevo')[0].getStore();
        record = Ext.ComponentQuery.query('#dgvInvNuevo')[0].getSelectionModel().getSelection()[0];

        st.beginUpdate()
        record.set("inventario",suma);
        record.set("diferencia", record.get('stockfisico') - suma  );
        record.set("inventarioseries",Ext.ComponentQuery.query('#txtSeriesVenta')[0].getValue().toString())
        st.endUpdate();
        Ext.ComponentQuery.query('#wProductosUnidadesInventario')[0].close();
      },
      onClickQuitarSeleccionUnidades:function(btn){
        record = btn.getWidgetRecord();
        store  = this.lookupReference('dgvSeriesProductosInventario').getStore();
        store.beginUpdate();
        record.set('chk', false);
        record.set('cantidadventa', 0);
        store.endUpdate();
  
        contador = 0;
        store.each(function(rec){
              if(rec.get('chk') == true){contador ++ ;}
        });
        Ext.ComponentQuery.query('#txtTotalSeriesUnidades')[0].setValue(contador);
  
      }
});
