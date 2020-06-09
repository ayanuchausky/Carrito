# ExamenDan

 Al descargar el proyecto es necesario correr un NPM install por consola y un maven install en eclipse para instalar modulos del frontend y dependencias del backend respectivamente.
 
 La base de datos se autogenera, por lo tanto hay que realizar algunas modificaciones antes de levantar el proyecto:
 -fechas: 
 esta tabla contiene las fechas fijas que requiere el proyecto; La fecha con id 1 es la fecha que simula el día actual; De ahi en mas,   todas las otras fechas son fechas promocionales.
 -Cliente:
 Esta tabla tiene una relación 1 a 1 con user, la tabla generada por jhipster. Es necesario linkear manualmente los clientes con los user.
 Por ejemplo, en el cliente 10, se le puede asignar el user_id 3, que es el que corresponde a la cuenta admin-admin
 
 Para iniciar el proyecto se utiliza un mvnw, y se accede a través de localhost en el puerto 8080
 
 Para ver el modelo utilizado, se puede acceder a https://start.jhipster.tech/jdl-studio/ e importar el archivo BaseV3.jh localizado en la base del proyecto
 
 El servicio que se dejó expuesto para consultas REST, es el de consultar clientes VIP, y no requiere autenticación. Una manera de consultarlos puede ser a traves de Postman, con la URL: http://localhost:8080/api/clientes/vip
 
Si existe desfasaje entre la fecha cargada en MySQL y la mostrada en el proyecto, se soluciona corriendo "set global time_zone = "-3:00""
en el Workbench.
