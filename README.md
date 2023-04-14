# FrontendWeb
This repository has the code of the webpage.

## Notas de cambios e información importante sobre el desarrollo web
Agregar las bibliotecas necesarias para hacer usao de las plantillas creadas-->
  1:Clic derecho en el proyecto y clic "Properties" en el menú.
  2:Selecciona "Java Build Path" en el panel izquierdo y clic en la pestaña "Libraries" en la derecho.
  3:Haz clic en el botón "Add Library".
  4:Selecciona "Server Runtime" en la lista y clic en "Next".
  5:Selecciona el servidor de aplicaciones que estás utilizando y haz clic en "Finish".
  6:Marcar la clase HttpServlet.
  
  
## Código que puede ser útil para React

const mostrarToast = (mensaje) => {
  setMensajeToast(mensaje);
  setTimeout(() => {
    setMensajeToast('');
  }, 3000); // el toast se ocultará después de 3 segundos
};

const manejarClickBoton = (mensaje) => {
  mostrarToast(`Me has pulsado: ${mensaje}`);
};

function fav(){
  toast.info("Boton de Inicio")
}


