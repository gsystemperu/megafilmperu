<?php

 	class FuncionesHelpers
 	{

 		public function esCadenaNulo($objeto)
 		{
		    if (!empty($objeto)) {
		        $retorna = $objeto;
		        $retorna = "'" . str_replace("'", "''", $retorna) . "'";
		        $retorna = stripslashes($retorna);
		        return $retorna;
		    }
		    return "NULL";
		}

		public function esNumeroNulo($objeto) {
		    if (!empty($objeto) && trim($objeto) != "" && is_numeric($objeto)) {
		        return $objeto;
		    }
		    return "NULL";
		}

		public function esNumeroCero($objeto) {
		    if (!empty($objeto) && trim($objeto) != "" && is_numeric($objeto)) {
		        return $objeto;
		    }
		    return "0";
		}


 	}
