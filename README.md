# Proyecto Final | BackEnd | Comisión 32110

# Consideraciones:

- Se seleccionó Passport como la tecnología para gestionar el inicio y cierre de sesión de los usuarios en la plataforma.  
- Mongoose y MongoDB fueron elegidos como la base de datos para la aplicación.
- Las vistas se desarrollaron utilizando EJS.
- La parte del Front-end del proyecto está orientada a facilitar el uso del Servidor. Para ello, se han realizado modificaciones en algunas respuestas del Back-end. 
- Aunque esto no es ideal, con fines prácticos para este desafío, se han incluido una serie de scripts en los archivos EJS para facilitar la lectura y ejecución de formularios dedicados a realizar las peticiones PUT, POST y DELETE.
- Se ha implementado CRUD para cada colección, aunque por razones prácticas, no todas han sido incluidas en el Front-end. Todas estas son totalmente funcionales. Algunas respuestas han sido modificadas para favorecer al Front-end. Por ejemplo, se puede acceder a todos los carritos mediante la ruta "/carrito", pero para fines de la entrega, se ha modificado para que una vez obtenidos, se redirija a la ruta "/carrito/:email" donde el usuario solo puede visualizar los suyos. Se podrá acceder a la respuesta original modificando la linea 11 del archivo "cart.controller.js".
- El número de orden de compra se obtiene de la cantidad de documentos en la colección "orders". Esto significa que si se elimina algún documento, una orden podría tener el mismo número que la orden eliminada. Se ha hecho de esta manera ya que para este caso específico no se requería eliminar las órdenes, sino cambiar su estado. Esto significa que ninguna orden debería ser borrada, sino simplemente actualizada. De igual manera el método y controlador para eliminar órdenes fue implementado y está disponible en el servidor. 
- Para el servicio de correo electrónico (nodemailer), se ha decidido tener un único correo de administrador, almacenado en una variable de entorno. Otra opción podría haber sido buscar en la base de datos todos los usuarios cuya propiedad "isAdmin" devuelva el booleano "true", extraer cada correo electrónico y enviarles a todos el mismo correo con copia oculta.
- Para acceder a todas las funcionalidades del Front-end es necesario contar con dos tipos de usuarios: usuarios regulares y usuarios administradores.

# ¿Cómo se crea un Usuario Regular?

Los usuarios pueden ser creados a través del formulario de la ruta "/signup" o mediante el envío de una petición "POST" en ThunderClient.

# ¿Como se crea un Usuario Administrador?

Para crear un usuario administrador, primero se debe crear un usuario regular. Luego, es necesario modificar manualmente el atributo "isAdmin" del usuario de "false" a "true". Esta acción se puede llevar a cabo mediante una petición en ThunderClient o accediendo directamente a la base de datos.

# ¿Qué variables de entorno necesito para correr el servidor?

- PORT : Número del puerto de escucha del servidor.
- MONGO_URI : URL de la base de datos.
- COOKIE_KEY : Nombre de la cookie utilizada para identificar la sesión. 
- COOKIE_SECRET : Firma de la cookie de sesión 
- SESSION_TIME : Tiempo de duración de la sesión. Expresada en milisegundos.
- ADMIN_EMAIL : Correo del administrador desde donde se envían las notificaciones del servidor. 
- PASS_EMAIL :  Contraseña para la autenticación SMTP. En este caso, para la plataforma de correo electrónico de Google, Gmail.


# A continuación se muestran las distintas rutas disponibles con sus funcionalidades para los distintos tipos de usuarios. 

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

## Funcionalidades para el usuario administrador

El usuario administrador tiene acceso a las siguientes funcionalidades:

- Ver el listado completo de todos los productos.
- Agregar nuevos productos mediante le formulario ubicado al final de la página.

El usuario administrador **no** puede:

- Agregar productos al carrito.

> Aclaración: Es importante mencionar que el usuario administrador no puede crear ni visualizar carritos desde el Front-end, ya que su función para esta aplicación es innecesaria. Sin embargo, cabe destacar que esto es solo una funcionalidad del Front-end.


## Funcionalidades para un usuario regular

El usuario regular tiene acceso a las siguientes funcionalidades:

- Ver el listado completo de todos los productos.
- Agregar productos al carriente (siempre que haya stock).

El usuario regular **no** puede:

- Agregar nuevos productos a la base de datos. 

## Funcionalidades para ambos usuarios

- Desde esta ruta, tanto el usuario administrador como el usuario normal pueden visualizar en la barra de navegación, dentro del menú desplegable, los botones correspondientes para "cerrar sesión" y "eliminar cuenta".

___

## Ruta: "/productos/:id"

En esta sección se detallan las funcionalidades disponibles para los usuarios de la ruta "/productos/:id".

## Funcionalidades para el usuario administrador

El usuario administrador tiene acceso a las siguientes funcionalidades:

- Ver el detalle de un producto específico.
- Actualizar el producto detallado mediante el formulario que se encuentra bajo la descripción del mismo.
> Aclaración: La forma de actualizar los productos es de a un campo a la vez. Cada etiqueta de input tiene su propio botón para actualizar.

El usuario administrador **no** puede:
- Agregar el producto al carrito.

## Funcionalidades para el usuario regular

El usuario regular tiene acceso a las siguientes funcionalidades:

- Ver el detalle de un producto específico.
- Agregar el producto al carrito.

El usuario regular **no** puede:

- Actualizar el o los productos. 

---

## Ruta: "/carrito" y "/carrito/:email"

La ruta "/Carrito" está implementada en el servidor del proyecto para listar todos los carritos de compras almacenados en la base de datos. Sin embargo, en esta entrega se ha modificado la petición original para que, en lugar de responder con un archivo JSON, redirija automáticamente a la ruta "/carrito/:email", con el fin de mejorar la navegación y la usabilidad de la aplicación. 

## Funcionalidades para el usuario administrador

- El usuario administrador no tiene acceso a estas rutas.
> Aclaración: Es importante mencionar que el usuario administrador no puede crear ni visualizar carritos desde el Front-end, ya que su función para esta aplicación es innecesaria. Sin embargo, cabe destacar que esto es solo una funcionalidad del Front-end.

## Funcionalidades para el usuario regular

El usuario regular tiene acceso a las siguientes funcionalidades:

- Ver la lista completa de productos en su carrito. 
- Ver el precio total del carrito. 
- Eliminar un producto específico del carrito. 
- Vaciar el carrito por completo. 
- Generar una orden de compra. 
- Actualizar la dirección de entrega. 

---

## Ruta: "/ordenes"

## Funcionalidades para el usuario administrador

El usuario administrador tiene acceso a las siguientes funcionalidades:

- Ver la lista completa de todas las órdenes de compra almacenadas en la base de datos, junto con el email del comprador correspondiente.
- Modificar el estado de cada orden mediante el formulario ubicado en la parte inferior de cada una.

El usuario administrador **no** puede: 

- Eliminar una órden de compra. 
> Si bien esta funcionalidad está implementada en el servidor, se decidió que todas las órdenes de compra permanezcan almacenadas en la base de datos. 

## Funcionalidades para el usuario regular

El usuario regular tiene acceso a las siguientes funcionalidades:

- Ver una lista completa de sus órdenes de compra.
- Ver el estado de cada una de sus órdenes.

El usuario regular **no** puede: 

- Modificar el estado de las órdenes de compra.
- Eliminar una órden de compra.

---

## Ruta: "/mensajes" 

## Funcionalidades para el usuario administrador

El usuario administrador tiene acceso a las siguientes funcionalidades:

- Ver un listado con todos los mensajes enviados a la plataforma. 
- Responder individualmente a cada mensaje.
> Aclaración: En esta entrega, se tomó como referencia la sección de preguntas de la plataforma de MercadoLibre, donde solo se permite una respuesta por mensaje.

El usuario administrador **no** puede: 

- Enviar nuevos mensajes.
- Filtrar mensajes.
- Eliminar mensajes. 
> Aclaración: Se implementó la opción de eliminar mensajes en el servidor, sin embargo, en la interfaz de usuario se optó por no incluir esta funcionalidad. Esto emula la sección de preguntas de la plataforma de MercadoLibre.

## Funcionalidades para el usuario regular

El usuario regular tiene acceso a las siguientes funcionalidades:

- Visualizar un listado completo de todos los mensajes y respuestas almacenados en la plataforma.
- Filtrar los mensajes mediante un enlace en la parte superior de la página.
- Enviar nuevos mensajes mediante el formulario ubicado en la parte superior de la sección.

El usuario regular **no** puede: 

- Responder mensajes. 
- Eliminar mensajes.

---
 
## Ruta: "/logout" 

A esta ruta se accede mediante el menu de la barra de navegación y está disponible para todos los usuarios. Al acceder a ella, se cerrará la sesión y redirigirá a la página de inicio de sesión ("/login")

---

## Ruta: "/config"

Esta ruta muestra la siguiente información del servidor:

- Puerto de escucha del Servidor.
- URL de la base de datos.
- Tiempo de expiración de la sesión.
- Dirección de correo electrónico para las notificaciones del backend.
- ID del proceso en ejecución.
- Ruta del ejecutable de Node.js utilizado para lanzar el proceso actual.
- Número de núcleos de CPU disponibles en el sistema.

> Aclaración: Esta ruta es solo alcanzada por los usuarios administradores.

---

## Ruta: "/error"

Esta ruta está disponible para todos los tipos de usuarios y muestra información detallada sobre el error que ha causado la redirección a esta página. Además, se incluye un botón que permite volver a la ruta principal ("/").
> Para conocer a dónde será redirigido el usuario, consulte la documentación de la ruta "/".

---