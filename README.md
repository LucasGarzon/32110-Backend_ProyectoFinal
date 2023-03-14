# Proyecto Final | BackEnd | Comisión 32110

## Ruta: "/productos"

En esta sección se detallan las funcionalidades disponibles para los usuarios de la ruta "/productos".

### Funcionalidades para el usuario admin

El usuario administrador tiene acceso a las siguientes funcionalidades:

- Ver el listado completo de todos los productos.
- Agregar nuevos productos mediante le formulario ubicado al final de la página.

El usuario admin **no** puede:

- Agregar productos al carrito.

> Note: Es importante mencionar que el usuario administrador no puede crear ni visualizar carritos desde el frontend, ya que su función para esta aplicación es innecesaria. Sin embargo, cabe destacar que esto es solo una funcionalidad del frontend.


### Funcionalidades para un usuario standard

El usuario normal tiene acceso a las siguientes funcionalidades:

- Ver el listado completo de todos los productos.
- Agregar productos al carriente (siempre que haya stock).

El usuario standard **no** puede:

- Agregar nuevos productos a la base de datos. 

### Funcionalidades para ambos usuarios

- Desde esta ruta, tanto el usuario admin como el usuario normal pueden visualizar en la barra de navegación, dentro del menú desplegable, los botones correspondientes para "cerrar sesión" y "eliminar cuenta".