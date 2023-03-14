# Proyecto Final | BackEnd | Comisión 32110

# A continuación, encontrarás las distintas rutas disponibles con las funcionalidades para los diferentes tipos de usuarios. 

## Ruta: "/"

Esta ruta actuará de manera diferente dependiendo de si el usuario ha iniciado sesión en el sitio o no.

- Si el usuario ha iniciado sesión, será redirigido automáticamente a la ruta "/productos". 
- Si el usuario **no** ha iniciado sesión, será redirigido a la ruta "/login".

---

## Ruta: "/login"

En esta ruta se encuentra el formulario de inicio de sesión. Se recomienda a los usuarios que inicien sesión antes de acceder a ciertas funcionalidades del sitio. El formulario solicita el correo electrónico del usuario y su contraseña. 

> Aclaración: Si el usuario no tiene una cuenta, puede registrarse haciendo clic en el botón debajo del formulario, que lo llevará al formulario de registro.

---

## Ruta: "/singup"

El formulario "signup" permite a los nuevos usuarios registrarse en la base de datos proporcionando su correo electrónico, nombre, apellido, dirección para las entregas, teléfono y contraseña. Una vez completado el registro, el sitio redirige automáticamente al usuario a la ruta "/login" para iniciar sesión.  

> Aclaración: Se cuenta con un botón disponible para redirigir fácilmente al formulario de inicio de sesión.

---

## Ruta: "/productos"

En esta sección se detallan las funcionalidades disponibles para los usuarios de la ruta "/productos".

## Funcionalidades para el usuario admin

El usuario administrador tiene acceso a las siguientes funcionalidades:

- Ver el listado completo de todos los productos.
- Agregar nuevos productos mediante le formulario ubicado al final de la página.

El usuario admin **no** puede:

- Agregar productos al carrito.

> Aclaración: Es importante mencionar que el usuario administrador no puede crear ni visualizar carritos desde el frontend, ya que su función para esta aplicación es innecesaria. Sin embargo, cabe destacar que esto es solo una funcionalidad del frontend.


## Funcionalidades para un usuario standard

El usuario standard tiene acceso a las siguientes funcionalidades:

- Ver el listado completo de todos los productos.
- Agregar productos al carriente (siempre que haya stock).

El usuario standard **no** puede:

- Agregar nuevos productos a la base de datos. 

## Funcionalidades para ambos usuarios

- Desde esta ruta, tanto el usuario admin como el usuario normal pueden visualizar en la barra de navegación, dentro del menú desplegable, los botones correspondientes para "cerrar sesión" y "eliminar cuenta".

___

## Ruta: "/productos/:id"

En esta sección se detallan las funcionalidades disponibles para los usuarios de la ruta "/productos/:id".

## Funcionalidades para el usuario admin

El usuario administrador tiene acceso a las siguientes funcionalidades:

- Ver el detalle de un producto específico.
- Actualizar el producto detallado mediante el formulario que se encuentra bajo la descripción del mismo.
> Aclaración: La forma de actualizar los productos es de a un campo a la vez. Cada etiqueta de input tiene su propio botón para actualizar.

El usuario admin **no** puede:
- Agregar el producto al carrito.

## Funcionalidades para el usuario standard

El usuario standard tiene acceso a las siguientes funcionalidades:

- Ver el detalle de un producto específico.
- Agregar el producto al carrito.

El usuario standard **no** puede:
- Actualizar el o los productos. 

---

## Ruta: "/Carrito" y "/carrito/:email"

La ruta "/Carrito" está implementada en el servidor del proyecto para listar todos los carritos de compras almacenados en la base de datos. Sin embargo, en esta entrega se ha modificado la petición original para que, en lugar de responder con un archivo JSON, redirija automáticamente a la ruta "/carrito/:email", con el fin de mejorar la navegación y la usabilidad de la aplicación. 

## Funcionalidades para el usuario admin
- El usuario admin no tiene acceso a estas rutas.
> Aclaración: Es importante mencionar que el usuario administrador no puede crear ni visualizar carritos desde el frontend, ya que su función para esta aplicación es innecesaria. Sin embargo, cabe destacar que esto es solo una funcionalidad del frontend.

## Funcionalidades para el usuario standard

- Ver la lista completa de productos en su carrito. 
- Ver el precio total del carrito. 
- Eliminar un producto específico del carrito. 
- Vaciar el carrito por completo. 
- Generar una orden de compra. 
- Actualizar la dirección de entrega. 

---