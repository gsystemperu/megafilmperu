<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class OrdenCompra extends \Phalcon\Mvc\Model
{

    public static function listarPorFechas($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('compras','sp_orden_compra_listar',$param);
        return $sql;
    }
    public static function listarPorFechaProveedor($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('compras','sp_orden_compra_listar',$param);
        return $sql;
    }

    public static function actualizar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('compras','sp_orden_compra_actualizar',$param);
        return $sql;
    }

    public static function eliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('compras','sp_orden_compra_eliminar',$param);
        return $sql;
    }

    public static function confirmar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('compras','sp_orden_compra_confirmar',$param);
        return $sql;
    }

    /*
        @ Orden de Compra confirmadas
    */
     public static function listarPorFechasConfirmadas($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('compras','sp_orden_compra_confirmada_listar',$param);
        return $sql;
    }
    public static function listarPorFechaProveedorConfirmadas($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('compras','sp_orden_compra_confirmada_listar',$param);
        return $sql;
    }

    public static function listarDetalleOrdenCompraConfirmada($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('compras','sp_orden_compra_confirmada_detalle',$param);
        return $sql;
    }

    public static function buscarOrdenCompraDetalle($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('compras','sp_orden_compra_detalle',$param);
        return $sql;
    }
    public static function ordenCompraAnular($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('compras','sp_orden_compra_anular',$param);
        return $sql;
    }

    public static function ingresarPagoAcuenta($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('compras','sp_orden_compra_pago_acuenta',$param);
        return $sql;
    }
    public static function buscarPagoAcuenta($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('compras','sp_pagos_acuenta_buscar',$param);
        return $sql;
    }
    public static function anularConfirOrdenCompra($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('compras','sp_orden_compra_anular_confirmacion',$param);
        return $sql;
    }
    public static function anularFacturaOrdenCompra($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('compras','sp_orden_compra_anular_facturacion',$param);
        return $sql;
    }

    


}
