SELECT n.lugar, n.tiposol, n.tipomot, n.finicial, n.ffinal, n.hsalida, n.hingreso, n.totald, n.mot, n.hcita, n.fsolicita, CONCAT(p.nombre, ' ', p.apellido) AS name,
  CASE 
    WHEN estatus IS NULL THEN 'Por aprobar'
    WHEN supervisor = 'SO' OR supervisor = 'SMA' THEN 'Aprobado'
    WHEN estatus = 'R' AND supervisor = 'R' THEN 'Rechazado'
  END AS status
FROM noper n
JOIN pers p ON p.codigo = n.codigo
WHERE numero = '00001853';
