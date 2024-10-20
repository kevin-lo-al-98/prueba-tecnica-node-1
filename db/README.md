## Esquema de la Base de Datos

La base de datos se compone de las siguientes tablas principales:

- **rol**: Define los roles del sistema (ej. admin, usuario).
- **usuario**: Almacena la información de los usuarios del sistema, incluyendo su rol.
- **empleado**: Almacena información sobre los empleados de la empresa.
- **solicitud**: Almacena las solicitudes o tareas asignadas a los empleados.

### Detalles de las tablas:

#### Tabla `rol`
- **id**: Identificador único del rol.
- **nombre**: Nombre del rol (ej. 'admin').
- **descripcion**: Descripción del rol.

#### Tabla `usuario`
- **id**: Identificador único del usuario.
- **usuario**: Nombre de usuario único en el sistema.
- **email**: Correo electrónico único.
- **password**: Contraseña encriptada.
- **id_rol**: Clave foránea que referencia a la tabla `rol`.

#### Tabla `empleado`
- **id**: Identificador único del empleado.
- **nombre**: Nombre del empleado.
- **salario**: Salario del empleado.
- **fecha_ingreso**: Fecha de ingreso del empleado a la empresa.
- **id_usuario**: Clave foránea que referencia a la tabla `usuario`.

#### Tabla `solicitud`
- **id**: Identificador único de la solicitud.
- **codigo**: Código único de la solicitud.
- **descripcion**: Descripción detallada de la solicitud.
- **resumen**: Resumen breve de la solicitud.
- **id_empleado**: Clave foránea que referencia a la tabla `empleado`.
