<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Contabilidad extends \Phalcon\Mvc\Model
{
    public static function PlanContable()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('contabilidad','plan_contable_lista',$parametros);
        return $sql;
    }

    public static function insertarTipoCambio($data)
    {   
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('contabilidad','sp_tipo_cambio_actualizar',$param);
        return $sql;
    }

    /*public static function eliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_color_eliminar',$param);
        return $sql;
    }*/

}
