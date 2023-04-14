
import logo from './logo.svg';
import './Style.css';
import { useState } from 'react';
import { Button, Toast } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CrearMensaje(){
  const [mensajeToast, setMensajeToast] = useState('');
}

/*
const mostrarToast = (mensaje) => {
  setMensajeToast(mensaje);
  setTimeout(() => {
    setMensajeToast('');
  }, 3000); // el toast se ocultará después de 3 segundos
};

const manejarClickBoton = (mensaje) => {
  mostrarToast(`Me has pulsado: ${mensaje}`);
};
*/

function fav(){
  toast.success("Cancion añadida a favoritos")
}

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    toast.success("¡Menú abierto!"); // Mostrar toast cuando se abra el menú
  }

  return (
    <div className="menu">
      <button onClick={toggleMenu}>Menú</button>
      {isOpen && (
        <ul>
          <li><a href="#" onClick={fav}>Opción 1</a></li>
          <li><a href="#">Opción 2</a></li>
          <li><a href="#">Opción 3</a></li>
        </ul>
      )}
    <ToastContainer/>
    </div>
  );
}

function App() {

  CrearMensaje();

  return (
    <Menu/>
  );
}

export default App;
