##**Descripción**

La aplicación esá diseñada para que un usuario pueda registrarse, iniciar sesión y subir una imagen de su preferencia. De igual forma cada usuario registrado puede acceder a una lista de imágenes subidas por cualquier otro usuario y agregarla a su lista de favoritos. Ésta lista puede editarse y borrarse a gusto del usuario en sesión activa.

##**Para iniciar:**

Clonar el repositorio Factoria-F5-Server y luego instalar las dependencias a través de los comandos "npm install". Una vez descargadas iniciar mediante los comandos *"node server.js"*

Clonar el repositorio Factoria-F5-Client y luego instalar las dependencias a través de *"npm install"*. Una vez realizado este procedimiento en la terminal ingresar los comandos *"npm start"*.

##**Arquitectura del proyecto:**

*La aplicación está desarrollada a partir de dos repositorios. El primero contiene toda la información del servidor y se ejecuta gracias al desarrollo realizado utilizando JavaScript, Node y Express. Toda la información, incluyendo la información de tipo string perteneciente a las imágenes, se almacena en una base de datos NoSQL como lo es Mongo. A su vez se ha optado por utilizar el sistema de protección de contraseñas de "bcrypt" para cumplir con los parámetros actuales de protección y ciberseguridad. Para poder convertir la información pertinente a archivos de imágenes JPG y PNG en string se ha utilizado Cloudinary para el servicio de gestión de imágenes en la nube. 
*La autenticación del usuario en línea se realizado utilizando el sistema de JSON WEB TOKEN para almacenar la información. Éste sistema es uno de los mas utilizados actualmente y ofrece resultados mucho mas amigables para los usuarios. 

---

*Por parte del cliente la tecnología principal está basada en React, siendo éste uno de los Frameworks mas utilizados en la actualidad. La información correspondiente a la autenticación se transmite a través de Context y para una mayor legibilidad del código se ha optado por extraer la información que viene desde el servidor a través de archivos JS ubicados en la carpeta Services. 
*Para lograr un producto mínimo viable se ha optado por utilizar Bootstrap junto con CSS para corrección de estilos y colores. 
