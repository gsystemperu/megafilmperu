<?php
use \Phalcon\Mvc\Controller as Controller;

class ProductoController extends Controller
{
    public function initialize(){$this->view->disable(); }

    public function documentoidentidadlistaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData = TipoDocumentoIdentidad::Listado();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    public function listarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {

                if(strlen($request->get('nombre'))==0 || strlen($request->get('codigo'))==0 )
                {
                    $jsonData = Producto::listar();
                }
                if(strlen($request->get('codigo'))>0)
                {
                    $data  = array($request->get('codigo'),'');
                    $jsonData = Producto::buscarNombre($data);  
                }
                if(strlen($request->get('nombre'))>0)
                {
                    $data = array($request->get('nombre'));
                    $jsonData = Producto::buscarNombre($data);
                }
          }

          $response->setContentType('application/json', 'UTF-8');
          $response->setContent($jsonData);
          return $response;
         
    }
    public function listarordencompraAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
                if(strlen($request->get('nombre'))==0)
                {
                  $data =array($request->get('idprov'));
                  $jsonData = Producto::buscarOrdenCompra($data);
                }else{
                  $data = array($request->get('idprov'),$request->get('nombre'));
                  $jsonData = Producto::buscarProductoOrdenCompra($data);
                }

              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function listarventaAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
                $nombre  =  $request->get('nombre');
                $codigo  =  $request->get('codigo');
                $cliente =  $request->get('cliente');
                $jsonData = array();

              if(strlen($nombre)>0 || strlen($codigo)>0) // @Buscar por nombre
              {
                    $data     = array($codigo,$nombre,$cliente);
                    $jsonData = Producto::buscarProductoPorCliente($data);
              }
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    public function listarproveedoresproductoAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $data = array($request->getPost('idprod'));
              $jsonData = Producto::proveedoresDelProducto($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }



     public function actualizarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();

         if($request->isPost() ==true)
         {
              $idproducto       = $request->getPost('id');
              $codigobarras     = $request->getPost('codigobarras');
              $codigoserie      = $request->getPost('codigoproducto');
              $nombre           = $request->getPost('nombre');
              $idtipoprod       = $request->getPost('idtipoproducto');
              $talla            = $request->getPost('talla');
              $idcolor          = $request->getPost('idcolor');
              $idmedida         = $request->getPost('idmedida');
              $preciocompra     = $request->getPost('preciocompra');
              $idunidadmedida   = $request->getPost('idunidadmedida');
              $idunidadmedidafrac= $request->getPost('idunidadmedidafraccion');
              $composicion      = $request->getPost('composicion');
              $precioventa      = $request->getPost('precioventa');
              $precioventafrac  = $request->getPost('precioventafraccion');
              $preciodolares    = $request->getPost('preciodolares');
              $stockmin         = $request->getPost('stockminimo');
              $fechacaducidad   = $request->getPost('fechacaducidad');
              $usuario          = $request->getPost('usuario');
              $manejastock      = $request->getPost('manejastock');
              $jsondetalle      = $request->getPost('jsondetalle');

              $ccinventario     = $request->getPost('ccinventario');
              $ccingreso        = $request->getPost('cccompra');
              $ccsalida         = $request->getPost('ccventa');
              $generaserie      =  $request->getPost('generaserie');

              if(strlen($manejastock))
                  $manejastock = 1;
              else
                  $manejastock = 0;

              if(strlen($generaserie))
                  $generaserie = 1;
              else
                  $generaserie = 0;

                  

              $usuario = "desarrollo";
              $formato  = new FuncionesHelpers();
              $data = array(
                   $formato->esNumeroCero($idproducto),
                    $codigobarras,
                    $codigoserie ,
                    $nombre,
                    $formato->esNumeroCero($idtipoprod),
                    $talla,
                    $formato->esNumeroCero($idcolor),
                    $formato->esNumeroCero($idmedida),
                    $formato->esNumeroCero($preciocompra),
                    $formato->esNumeroCero($idunidadmedida),
                    $formato->esNumeroCero($idunidadmedidafrac),
                    0,
                    $formato->esNumeroCero($precioventa) ,
                    $formato->esNumeroCero($precioventafrac),
                    $formato->esNumeroCero($preciodolares),
                    $formato->esNumeroCero($stockmin),
                    $fechacaducidad,
                    $usuario,
                    $manejastock,
                    $jsondetalle,
                    $formato->esNumeroCero($request->getPost('preciounidadpublico')) ,
                    $formato->esNumeroCero($request->getPost('preciounidadespecial')) ,
                    $formato->esNumeroCero($request->getPost('preciounidadvip')) ,
                    $formato->esNumeroCero($request->getPost('preciofraccionpublico')) ,
                    $formato->esNumeroCero($request->getPost('preciofraccionespecial')) ,
                    $formato->esNumeroCero($request->getPost('preciofraccionvip')) ,
                    $formato->esNumeroCero($request->getPost('preciounidadremate')) ,
                    $formato->esNumeroCero($request->getPost('preciofraccionremate')),
                    $formato->esNumeroCero($request->getPost('idpresentacion')),
                    $formato->esNumeroCero($ccinventario),   
                    $formato->esNumeroCero($ccingreso),
                    $formato->esNumeroCero($ccsalida),
                    $generaserie
              );


              $jsonData  = Producto::actualizar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }

    public function eliminarAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $idproducto       = $request->getPost('id');
              $usuario          = $request->getPost('usuario');

              $data = array(
                    $idproducto,
                    $usuario
              );
              $jsonData  = Producto::eliminar($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }

    public function bucarcodigobarrasAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $codigobarras  = $request->get('codigobarras');
              $jsonData = Producto::buscarCodigoBarras($codigobarras);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function bucarserieAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $codigoserie  = $request->get('codigoserie');
              $jsonData = Producto::buscarCodigoSerie($codigoserie);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function buscarnombreAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $nombre   = $request->get('nombre');
              $jsonData = Producto::buscarNombre($nombre);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    /**
     * [existenciasporproductoAction ]
     * @return  Json
     */
    public function existenciasporproductoAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $data = array($request->get('idprod'));
              $jsonData = Producto::existenciasPorProducto($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
         if($request->isPost() ==true)
         {
              $data = array($request->getPost('idprod'));
              $jsonData = Producto::existenciasPorProducto($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    /**
     * [guardarubicacionproductoAction ]
     * @return  Array
     */
    public function guardarubicacionproductoAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $data = array(
                $request->getPost('idserie'),
                $request->getPost('idseccion'),
                $request->getPost('ubicacion'),
                $request->getPost('observaciones')
              );
              $jsonData = Producto::ingresarUbicacionProducto($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
              return $response;
         }
    }
    /**
     * [buscarproductoporcodigobarraAction ]
     * @return  Json
     */
    public function buscarproductoporcodigobarraAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isPost() ==true)
         {
              $data = array($request->getPost('codigobarra'));
              $jsonData = Producto::buscarProductoPorCodigoBarras($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    public function actualizarpreciosAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      if($request->isPost() ==true)
      {
           $jsondata       = $request->getPost('jsondata');
           $usuario        = $request->getPost('usuario');

           $data = array(
                 $jsondata,
                 $usuario
           );
           //print_r($data);die();
           $jsonData  = Producto::actualizarPrecios($data);
           $response->setContentType('application/json', 'UTF-8');
           $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
           return $response;
      }
    }
    public function listadoinventarioAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isGet() ==true)
        {
             $data = array($request->get('nombre'));
             $jsonData = Producto::listarInventario($data);
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
        }
      
   }
   public function inventarioregistrosAction(){
    $request        = new Phalcon\Http\Request();
    $response       = new \Phalcon\Http\Response();
    if($request->isGet() ==true)
    {
         $data = array($request->get('mes'));
         $jsonData = Producto::inventarioRegistros($data);
         $response->setContentType('application/json', 'UTF-8');
         $response->setContent($jsonData);
         return $response;
    }
   }

    public function inventarioagregarAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {
             $data = array(
                 $request->getPost('id'),
                 $request->getPost('referencia'),
                 $request->getPost('jsondetalle'),
                 $request->getPost('usuario')
             );
             $jsonData = Producto::inventarioAgregar($data);
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
             return $response;
        }

    }

}
