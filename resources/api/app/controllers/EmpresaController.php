<?php
use \Phalcon\Mvc\Controller as Controller;

class EmpresaController extends Controller
{
    public function initialize(){$this->view->disable(); }
    public function listartiendasAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $empresa = $request->get('idempresa');
              $data = array(1);
              $jsonData = Empresa::listarTiendas($data);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    public function listarempresasAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isGet() ==true)
        {
             $data = array();
             $jsonData = Empresa::listar($data);
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
        }
   }
    public function comboseriesdocumentosAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isGet() ==true)
        {
          
             $jsonData = Empresa::comboSeriesDocumentos();
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent($jsonData);
             return $response;
        }
   }
   public function actualizarempresaAction(){
    $request        = new Phalcon\Http\Request();
    $response       = new \Phalcon\Http\Response();
    if($request->isPost() ==true)
    {

        $data= array(
            $request->getPost('id'),
            $request->getPost('razonsocial'),
            $request->getPost('ruc'),
            $request->getPost('direccion'),
            $request->getPost('lema'),
            $request->getPost('correo'),
            $request->getPost('telefono'),
            $request->getPost('jsondetalle')

        );

       $jsonData             = Empresa::actualizar($data);
       $response->setContentType('application/json', 'UTF-8');
       $response->setContent(json_encode($jsonData[0], JSON_NUMERIC_CHECK));
       return $response;
        
    }
   }
    


}
