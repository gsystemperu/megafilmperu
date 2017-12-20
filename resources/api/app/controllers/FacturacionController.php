<?php
use \Phalcon\Mvc\Controller as Controller;

class FacturacionController extends Controller
{
    public function initialize(){$this->view->disable(); }

    public function actualizarAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $vId       = $request->getPost('idfacturacion');
           $vIdCoti   = $request->getPost('idcoti');
           $vFecha    = $request->getPost('fechacoti');
           $vIdCliente =$request->getPost('idper');
           $vUsuario      = 'desarrollo';   //$request->getPost('vusuario');
           $vJsonDetalle  =  $request->getPost('vjsondetalle');
           $vFormaPago    =  $request->getPost('idfopag');
           $vModoEntrega  =  $request->getPost('idmodo');
           $vDocVenta     =  $request->getPost('documentoventa');
           $vIncluyeIgv   = 0; //  ($request->getPost('incluyeigv')? true:false);
           $vFechaValidoHasta  = ( $request->getPost('validohasta')==''? $request->getPost('fechavalidohasta') : $request->getPost('validohasta'));
           $vSerieDoc     = $request->getPost('seriedoc');
           $vNumeroDoc    = $request->getPost('numerodoc');
           $vidtienda     = $request->getPost('idtienda');

           $data = array($vId,$vIdCoti,$vFecha,$vIdCliente,$vUsuario,$vJsonDetalle, $vFormaPago,$vModoEntrega,$vDocVenta,$vIncluyeIgv,$vFechaValidoHasta,$vSerieDoc,$vNumeroDoc,$vidtienda);
           $jsonData             = Facturacion::actualizar($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;
      }
    }
    public function detallefacturacionAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isGet() ==true)
      {
           $vId           = $request->get('idfacturacion');
           $data          = array($vId);
           $jsonData      = Facturacion::detalleFacturacion($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent($jsonData);
           return $response;
      }
    }
    public function anularAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idpersona   = $request->getPost('idpersona');
              $usuario    = $request->getPost('usuario');
              $data = array($idpersona,$usuario);
              $jsonData  = Persona::eliminar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }

    public function actualizarpagoacuentaAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $vId           = $request->getPost('idfacturacion');
           $vJsonDetalle  =  $request->getPost('vjsondetalle');
           $data          = array($vId,$vJsonDetalle);
           $jsonData      = Facturacion::actualizarPagoAcuenta($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;
      }
    }
    public function buscarpagoacuentaAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $vId           = $request->getPost('idfacturacion');
           $data          = array($vId);
           $jsonData      = Facturacion::buscarPagoAcuenta($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent($jsonData);
           return $response;
      }
    }

    public function actualizarpuntoventapagoAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $vId           = $request->getPost('id');
           $vIdCoti       = $request->getPost('idcoti');
           $vIdCliente    = $request->getPost('idper');
           $vUsuario      = 'desarrollo';   //$request->getPost('vusuario');
           $vJsonDetalle  = $request->getPost('vjsondetalle');
           $vFormaPago    =  $request->getPost('idfopag');
           $vModoEntrega  =  $request->getPost('idmodo');
           $vDocVenta     =  $request->getPost('documentoventa');
           $vIncluyeIgv   = false;
           $vSerieDoc     = $request->getPost('serie');
           $vNumeroDoc    = $request->getPost('numerodoc');
           $vAcuenta      = $request->getPost('acuenta');
           $vPorcentaje   = $request->getPost('porcentaje');
           $vidTienda     = $request->getPost('idtienda');

           $data = array($vId,$vIdCoti,'',$vIdCliente,$vUsuario,$vJsonDetalle, $vFormaPago,$vModoEntrega,$vDocVenta,true,'',$vSerieDoc,$vNumeroDoc,$vAcuenta,$vPorcentaje,$vidTienda);
   
           $jsonData             = Facturacion::guardarPuntoVentaPago($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;
      }
    }


    public function insertarfacturacomprasAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
      
           $vId             = $request->getPost('idfacturacion');
           $vIdPer            = $request->getPost('idprov');
           $vIdOrdenCompra  = $request->getPost('idordencompra');
           $vFechaRegistro  = $request->getPost('fecharegistro');
           $vFechaEmision   = $request->getPost('fechaemision');
           $vFechaVencimiento  = $request->getPost('validohasta');
           $vFormaPago      =  $request->getPost('idfopag');
           $vIdMoneda       =  $request->getPost('idmoneda');
           $vDocVenta       =  $request->getPost('documentoventa');
           if($request->getPost('valigvcont')>0){
            $vIncluyeIgv     = 1;  
           }else{
            $vIncluyeIgv     = 0;  
           }
           $vSerieDoc       =  $request->getPost('seriedoc');
           $vNumeroDoc      =  ($request->getPost('tipofactura')==1?$request->getPost('numerodoc'):'' );
           $vNumeroInvoice  =  ($request->getPost('tipofactura')==2?$request->getPost('numerodoc'):'' );
           $vTipoCambio     =  $request->getPost('tipocambio');
           $vJsonDetalle    =  $request->getPost('jsondetalle');
           $vUsuario        =  'DESARROLLO';
           $vTipoFacturaCompra  =  $request->getPost('tipofactura');
           $vPagoAcuenta  =  $request->getPost('pagoacuenta');
           
           $data = array(
              0,
              $vIdOrdenCompra,
              $vIdPer,
              $vFechaRegistro, 
              $vFechaEmision,
              $vFechaVencimiento,
              $vFormaPago,
              $vIdMoneda ,
              $vDocVenta ,
              $vIncluyeIgv ,
              $vPagoAcuenta,
              $vSerieDoc  ,
              $vNumeroDoc  ,
              $vNumeroInvoice ,
              $vTipoCambio   ,
              $vJsonDetalle  ,
              $vUsuario ,
              $vTipoFacturaCompra  
           );
           //print_r($data);die();
           $jsonData             = Facturacion::comprasInsertar($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;
      }
    }

    public function actualizarguiaremisionAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {

           $vid           =  $request->getPost('id');
           $idfacturacion       =  $request->getPost('idfactura');
           $fechaemision    =  $request->getPost('fechaemision');
           $puntopartida  =  $request->getPost('puntopartida');
           $puntollegada  =  $request->getPost('puntollegada');
           $fechatraslado    =  $request->getPost('fechatraslado');
           $costominimo  =  $request->getPost('costominimo');
           $razonsocialdestinatorio     =  $request->getPost('razonsocialdestinatorio');
           $rucdestinatorio     =  $request->getPost('rucdestinatorio');
           $dnidestinatorio     =  $request->getPost('dnidestinatorio');
           $marcanumeroplaca    =  $request->getPost('marcanumeroplaca');
           $numeroconstanciainscripcion      =  $request->getPost('numeroconstanciainscripcion');
           $numerolicenciaconductor      =  $request->getPost('numerolicenciaconductor');
           $empresatransporterazonsocial      =  $request->getPost('empresatransporterazonsocial');
           $empresatransporteruc      =  $request->getPost('empresatransporteruc');
           $jsondetalle      =  $request->getPost('vjsondetalle');
           $motivotranslado      =  $request->getPost('idmotivotranslado');
           $idtienda            =   $request->getPost('idtienda'); 
           $data = array(
            $vid,
            $idfacturacion,
            $fechaemision,
            $puntopartida,
            $puntollegada,
            $fechatraslado,
            $costominimo,
            $razonsocialdestinatorio,
            $rucdestinatorio,
            $dnidestinatorio,
            $marcanumeroplaca,
            $numeroconstanciainscripcion,
            $numerolicenciaconductor,
            $empresatransporterazonsocial,
            $empresatransporteruc,
            $jsondetalle,
            $motivotranslado,
            $idtienda
           );
          // print_r($data);die();

           $jsonData             = GuiaRemision::actualizar($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;
      }
    }

    public function listarmotivostransladosAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isGet() ==true)
      {
           $data          = array();
           $jsonData      = GuiaRemision::motivosTransladoListado($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent($jsonData);
           return $response;
      }
    }

    public function buscarventaspdvAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isGet() ==true)
      {
           $vDesde        = $request->get('desde');
           $vHasta        = $request->get('hasta');
           if(strlen($vDesde)=='' && strlen($Hasta)=='')
           {
              $data       = array();
           }else{
              $data       = array($vDesde,$vHasta);
           }

           $jsonData      = Facturacion::buscarVentasPdv($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent($jsonData);
           return $response;
      }
    }

}
