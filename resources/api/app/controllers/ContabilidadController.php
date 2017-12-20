<?php
use \Phalcon\Mvc\Controller as Controller;

class ContabilidadController extends Controller
{
    public function initialize(){$this->view->disable(); }

    public function plancontableAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $jsonData = Contabilidad::PlanContable();
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }

    public function insertartipocambioAction(){
        $request        = new Phalcon\Http\Request();
        $response       = new \Phalcon\Http\Response();
        if($request->isPost() ==true)
        {

             $vIdmoneda  = $request->getPost('idmoneda');
             if($vIdmoneda == 2){
                $vValor = $request->getPost('cambiodolares');
             }else{
                $vValor = $request->getPost('cambioeuros');
             }
             $data       = array($vIdmoneda,$vValor);
             $jsonData = Contabilidad::insertarTipoCambio($data);
             $response->setContentType('application/json', 'UTF-8');
             $response->setContent(json_encode($jsonData, JSON_NUMERIC_CHECK));
             return $response;
        }
   }
    
    

   

}
