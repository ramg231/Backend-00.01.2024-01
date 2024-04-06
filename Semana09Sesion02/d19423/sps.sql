CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_crud_sexo`( 
	in opcion int,
	in descrip varchar(500),
    in act bool,
    in id int,
    in usuario int
)
BEGIN
	if opcion = 1 then
		select * from Sexo where activo = true;
	elseif opcion = 2 then
		insert into Sexo(descripcion, usuarioCreacion)
        values(descripcion,usuario);
	elseif opcion = 3 then
		update Sexo 
			set descripcion = ifnull(descrip,descripcion),
			activo = ifnull(act, activo),
			usuarioModificacion = usuario,
			fechaModificacion = current_timestamp
        where Sexo.id = id;
	elseif opcion = 4 then
		update Sexo 
			set activo = false,
			usuarioModificacion = usuario,
			fechaModificacion = current_timestamp
        where Sexo.id = id;
	elseif opcion = 5 then
		select * from Sexo;
	end if;
END
