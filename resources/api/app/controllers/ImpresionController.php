<?php
use \Phalcon\Mvc\Controller as Controller;

/*include __DIR__ .'/../library/funciones.php';
include __DIR__ .'/../library/phpmailer/class.phpmailer.php';
include __DIR__ .'/../library/phpmailer/class.pop3.php';
include __DIR__ .'/../library/phpmailer/class.smtp.php';
*/

include __DIR__ .'/../library/fpdf/code39.php';


class ImpresionController extends Controller
{
  //  public function initialize(){$this->view->disable(); }
    public function indexAction(){

      $request    = new Phalcon\Http\Request();
      $idcoti = $request->get("id");
      $data     = array($idcoti);
      $cliente  =  json_decode(Cotizacion::buscarCotizacionPorId($data));
      $detalle  =  json_decode(Cotizacion::detalleCotizacionVista($data));
      $this->view->cliente = $cliente;
      $this->view->detalle = $detalle;
    }

    public function facturaa4Action()
    {
      
            $request  = new Phalcon\Http\Request();
            $idcoti   = $request->get("id");
            $data     = array($idcoti);
            $cliente  =  json_decode(facturacion::buscarfacturaid($data));
            $detalle  =  json_decode(facturacion::buscarfacturadetalleid($data));
            $this->view->cliente = $cliente;
            $this->view->detalle = $detalle;
    }
    public function facturaAction(){
            $request  = new Phalcon\Http\Request();
            $idcoti   = $request->get("id");
          $data     = array($idcoti);
          $cliente  =  json_decode(facturacion::buscarfacturaid($data));
          $detalle  =  json_decode(facturacion::buscarfacturadetalleid($data));
          $this->view->cliente = $cliente;
          $this->view->detalle = $detalle;
    }
    public function guiaremisiont1Action()
    {
            $request  = new Phalcon\Http\Request();
            $idcoti   = $request->get("id");
            $data     = array($idcoti);
            $cliente  =  json_decode(GuiaRemision::buscarGuiaPorId($data));
            $detalle  =  json_decode(GuiaRemision::buscarGuiaDetallePorId($data));
            $this->view->cliente = $cliente;
            $this->view->detalle = $detalle;
    }
    public function guiaremisiont2Action()
    {
      
            $request  = new Phalcon\Http\Request();
            $idcoti   = 59;  //$request->get("id");
            $data     = array($idcoti);
            $cliente  =  json_decode(facturacion::buscarfacturaid($data));
            $detalle  =  json_decode(facturacion::buscarfacturadetalleid($data));
            $this->view->cliente = $cliente;
            $this->view->detalle = $detalle;
    }
    public function enviarCotizacionAction(){
      //echo "hola". __DIR__ .'/../library/phpmailer/class.phpmailer.php';die();

      $request    = new Phalcon\Http\Request();
      $idCot = $request->getPost("id");

      $dataEmpresa =  json_decode(Empresa::listar())->data[0];
      //print_r($dataEmpresa);die();
      $dataCotizacion =  json_decode(Cotizacion::buscarCotizacionPorId(array($idCot)))->data[0];
      //print_r($dataCotizacion);die();
      $dataDetalle =  json_decode(Cotizacion::detalleCotizacionVista(array($idCot)))->data;
      //print_r($dataDetalle);die();
      $dataPersona = json_decode(Persona::Buscar($dataCotizacion->idper))->data[0];;
      //print_r($dataPersona);die();


      // ========== FPDF ==========  //
      $pdf = new fpdf('P','mm','A4');
      $wg = 188 ;//Ancho total
      $in = 6; //Interlineado
      $font = 'Arial';
      $tam = 9;

      $pdf->AddPage();
      $pdf->SetFont($font,'',$tam);
      $pdf->MultiCell($wg,6,pinta($dataEmpresa->razonsocial),0,'L');
      $pdf->MultiCell($wg,$in, pinta($dataEmpresa->razonsocial),'T','L');
      $pdf->MultiCell($wg,$in, pinta($dataEmpresa->direccion),0,'L');
      $pdf->MultiCell($wg,$in,"RUC: ".$dataEmpresa->ruc,0,'L');
      $pdf->MultiCell($wg,$in,"Correo: ".pinta($dataEmpresa->correo),0,'L');
      $pdf->MultiCell($wg,$in,pinta("Teléfono: ".$dataEmpresa->telefono),'B','L');
      $pdf->MultiCell($wg,$in,pinta("Contacto: ".$dataEmpresa->contacto),0,'L');

      $pdf->Ln(4);

      $pdf->SetFont($font,'B',20);
      $pdf->MultiCell($wg,$in,pinta("Cotización # 00".$dataCotizacion->idcoti),0,'L');

      $pdf->Ln(5);

      $fila = $pdf->GetY();
      $pdf->SetFont($font,'B',$tam);
      $pdf->MultiCell(50,$in,"Fecha de presupuesto: ",0,'L');
      $pdf->SetXY(60,$fila);
      $pdf->MultiCell(80,$in,"Comercial: ",0,'L');
      $pdf->SetXY(140,$fila);
      $pdf->MultiCell(40,$in,"Forma de Pago: ",0,'L');

      $pdf->SetXY(10,$fila+6);
      $fila = $pdf->GetY();
      $pdf->SetFont($font,'',$tam);
      $pdf->MultiCell(50,$in,pinta($dataCotizacion->fechacoti),0,'L');
      $pdf->SetXY(60,$fila);
      $pdf->MultiCell(80,$in,pinta($dataCotizacion->nomcompleto)."asdfaa sa fa da a dsfa sdf asdf asd fas dfas dfas fas",0,'L');
      $pdf->SetXY(140,$fila);
      $pdf->MultiCell(40,$in,pinta($dataCotizacion->idmodo),0,'C');

      $pdf->Ln(10);

      $fila = $pdf->GetY();
      $anchos = array(30,30,40,40); //Tamaño
      $posx = 10  ;
      $pdf->SetFont($font,'B',$tam);
      $pdf->MultiCell($anchos[0],$in,pinta("Descripción"),'B','L');
      $pdf->SetXY($posx+=$anchos[0],$fila);
      $pdf->MultiCell($anchos[1],$in,pinta("Cantidad"),1,'L');
      $pdf->SetXY($posx+=$anchos[1],$fila);
      $pdf->MultiCell($anchos[2],$in,pinta("Precio Unitario"),1,'L');
      $pdf->SetXY($posx+=$anchos[2],$fila);
      $pdf->MultiCell($anchos[3],$in,pinta("Impuestos"),1,'L');
      $pdf->SetXY($posx+=$anchos[3],$fila);
      $pdf->MultiCell($anchos[3],$in,pinta("Precio"),1,'L');
      $pdf->SetXY($posx+=$anchos[3],$fila);

      //$pdf->Output();
      $pdf->Output('temp/cotizacion'.$dataCotizacion->idcoti.'.pdf','F');
      // ========== FPDF ==========  //



      $email_user = "mailswebmsb@gmail.com";
      $email_password = "MSB2017*webmail";
      $the_subject = "Cotizacion";
      $address_to = "eerazozamudio@gmail.com";
      $from_name = "Molino Avila";
      $phpmailer = new PHPMailer();

      // ---------- datos de la cuenta de Gmail -------------------------------
      $phpmailer->Username = $email_user;
      $phpmailer->Password = $email_password;
      //-----------------------------------------------------------------------

      try {
          //$phpmailer->SMTPDebug = 1;
          $phpmailer->SMTPSecure = 'ssl';
          $phpmailer->Host = "smtp.gmail.com"; // GMail
          $phpmailer->Port = 465;
          $phpmailer->IsSMTP(); // use SMTP
          $phpmailer->SMTPAuth = true;

          $phpmailer->setFrom($phpmailer->Username,$from_name);
          $phpmailer->AddAddress($address_to); // recipients email

          $phpmailer->Subject = $the_subject;
          $phpmailer->addAttachment('temp/cotizacion'.$dataCotizacion->idcoti.'.pdf');
          $phpmailer->Body .="<h1 >Repuesta de Cotizacion</h1>";
          $phpmailer->Body .= "<p>Buenos dias adjunto la cotizacion solicitada.</p>";
          $phpmailer->Body .= "<p>Fecha y Hora: ".date("d-m-Y h:i:s")."</p>";
          $phpmailer->IsHTML(true);

          $phpmailer->Send();
          unlink('temp/cotizacion'.$dataCotizacion->idcoti.'.pdf');
          echo 'Mensaje enviado';
      } catch (Exception $e) {
          echo 'Ocurrio un Error';
          echo 'Mensaje: ' . $phpmailer->ErrorInfo;
      }


    }
    public function generarcodigos39Action(){  
        $this->view->disable();      
        $pdf=new PDF_Code39();
        $request    = new Phalcon\Http\Request();
        $data  = array($request->get("id"));
        $prod  =  json_decode(Producto::existenciasPorProducto($data));
        $pdf->AddPage(); 
        $pdf->SetFont('Arial','B',16);
        $fila = 0;
        //print_r( $prod->data[0]);die();
        $pdf->Cell(0,10,'Codigos del producto :' . $prod->data[0]->nombre ,0,1,'C');    
        $pdf->Ln(1);
        foreach ($prod->data as $row){
          $fila = $fila + 20;
          $pdf->setY($fila);
          $pdf->Code39(10,$pdf->getY(), $row->codigobarras ,0.5,10);
        }

        $pdf->Output();
    }  

    public function imprimirstockinventarioAction(){  
      $this->view->disable();      
      $pdf = new fpdf('P','mm','A4');
      $request    = new Phalcon\Http\Request();
      $data = array($request->get('mes'));
      $jsonData = json_decode( Producto::listarInventario($data) );
      $pdf->AddPage(); 
      $pdf->SetFont('Arial','B',16);
      $fila = 0;
      $pdf->Cell(0,10,'Registro de Inventario',1,1,'C');
      $pdf->SetFont('Arial','',9);
      //print_r( $jsonData->data[0]);die();
      $pdf->Cell(30,5,'Codigo' ,1,0,'C');
      $pdf->Cell(100,5,'Producto' ,1,0,'C');
      $pdf->Cell(20,5,'Stock Fisico' ,1,0,'C');
      $pdf->Cell(20,5,'Inventario' ,1,0,'C');   
      $pdf->Cell(20,5,'Diferencia' ,1,1,'C');   
      $pdf->SetFont('Arial','',8);
     foreach ($jsonData->data as $row){
          //  $pdf->Code39(10,$pdf->getY(), $row->codigobarras ,0.5,10);
        $pdf->Cell(30,5,$row->codigoproducto  ,1,0,'C');
        $pdf->Cell(100,5,$row->nombre ,1,0,'L');
        $pdf->Cell(20,5,$row->stockfisico ,1,0,'C');
        $pdf->Cell(20,5,'' ,1,0,'C');   
        $pdf->Cell(20,5,'' ,1,1,'C');   
        
      }

      $pdf->Output();
  }  


}
