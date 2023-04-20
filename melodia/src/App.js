
import './Style.css';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components"

import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

let idUsuario;

class BarraNavegacion extends React.Component{
  render(){
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-blue_4th" style={{position : 'fixed', width : '100%'}}>
              <div class="container px-5">
                  <a class="navbar-brand" href="#!">Melodia</a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                          <li class="nav-item"><a class="nav-link active" aria-current="page" onClick={principal}>Inicio</a></li>
                          <li class="nav-item"><a class="nav-link" onClick={inicioSesion}>Iniciar Sesión</a></li>
                          <li class="nav-item"><a class="nav-link" onClick={registrarse}>Registrarse</a></li>
                      </ul>
                  </div>
              </div>
      </nav>
    )
  } 
}

class BarraNavegacionApp extends React.Component{
  render(){
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-blue_4th">
              <div class="container px-5">
                  <a class="navbar-brand" href="#!">Melodia</a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                          <li class="nav-item"><a class="nav-link active" aria-current="page">Notificaciones  &#128276;</a></li>
                          <li class="nav-item"><a class="nav-link">Perfil &#128578;	</a></li>
                          <li class="nav-item"><a class="nav-link">Top Diario &#129351; </a></li>
                          <li><p>&emsp;&emsp;&emsp;&emsp;</p></li>
                          <li class="nav-item"><a class="nav-link" onClick={inicioSesion}>Cerrar Sesión &#128682;</a></li>
                      </ul>
                  </div>
              </div>
      </nav>
    )
  } 
}

class Cabecera extends React.Component{
  render(){
    return(
      <header class="bg-blue_7th py-5">
              <div class="container px-5">
                  <div class="row gx-5 justify-content-center">
                      <div class="col-lg-6">
                          <div class="text-center my-5">
                              <h1 class="display-5 fw-bolder text-white mb-2">Melodia, una nueva forma de escuchar</h1>
                              <p class="lead text-white-50 mb-4">Descubre, Comparte y Disfruta de música, podcasts y mucho más</p>
                              <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
                                  <a class="btn btn-primary_blue_4th btn-lg px-4 me-sm-3" href="#!" onClick={toast_comenzar}>Comenzar</a>
                                  <a class="btn btn-outline-light btn-lg px-4" href="#!">Más información</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
        </header>
    )
  }
}

class ImagenInfo extends React.Component{
  render(){
    return(
      <div class="col-lg-6 col-xl-4">
          <div class="card mb-5 mb-xl-0">
              <div class="card-body p-5">
                  <ul class="list-unstyled mb-4">
                      <li class="mb-2">
                          <img src={this.props.src} width="100%" />
                      </li>
                      <li class="mb-2 centered_title">
                          {this.props.message}
                      </li>
                  </ul>
              </div>
          </div>
      </div>
    )
  }
}

class FormularioInicio extends React.Component{
  render(){
    return(
        <header class="bg-blue_7th py-5">
            <div class="container px-5" style={{"margin-top" : "8%"}}>
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-6">
                        <div class="text-center my-5">
                            <h1 class="display-5 fw-bolder text-white mb-2" style={{"padding-bottom" : "1 rem"}}>Iniciar Sesión</h1>
                                <form id="contactForm" style={{"margin" : "auto", "max-width" : "20rem", "width" : "100%", "align-self": "center"}} onSubmit={enviar_peticion_inicio}>
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="email" type="text" placeholder="Introduce tu correo electronico"/>
                                        <label for="name">Email</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="passwd" type="password" placeholder="Introduce tu Contraseña"/>
                                        <label for="passwd">Contraseña</label>
                                    </div>
                                    <button class="btn btn-primary_blue_4th btn-lg px-4 me-sm-3" id="submitButton" type="submit" >Iniciar Sesión</button>
                                </form>
                                <p class="fw-normal fst-italic text-warning fs-5" id="error_input"></p>
                            <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
  }
}

class FormularioRegistro extends React.Component {
  render(){
    return(
      <>
        <script src="./check.js"></script>
        <header class="bg-blue_7th py-5">
              <div class="container px-5">
                  <div class="row gx-5 justify-content-center">
                      <div class="col-lg-6">
                          <div class="text-center my-5">
                              <h1 class="display-5 fw-bolder text-white mb-2" style={{"padding-bottom" : "1rem"}}>Registrarse</h1>
                                  <form id="contactForm" style={{"margin": "auto", "max-width": "20rem", "width" : "100%", "align-self" : "center"}} onSubmit={comprobar_entrada_registro}action="Prueba">
                                      <div class="form-floating mb-3">
                                          <input class="form-control" id="email" type="text" placeholder="ejemplo@gmail.com"/>
                                          <label for="email">Correo electrónico</label>
                                      </div>
                                      <div class="form-floating mb-3">
                                          <input class="form-control" id="name" type="text" placeholder="nickname"/>
                                          <label for="name">Usuario</label>
                                      </div>
                                      <div class="form-floating mb-3">
                                          <input class="form-control" id="passwd" type="password" placeholder="Introduzca contraseña"/>
                                          <label for="passwd">Contraseña</label>
                                      </div>
                                      <div class="form-floating mb-3">
                                          <input class="form-control" id="repasswd" type="password" placeholder="Repita la contraseña"/>
                                          <label for="repasswd">Repita Contraseña</label>
                                      </div>
                                      <button class="btn btn-primary_blue_4th btn-lg px-4 me-sm-3" id="submitButton" type="submit">Registrarse</button>
                                      <p class="fw-normal fst-italic text-warning fs-5" id="error_input"></p>
                                  </form>
                              <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </header>
        </>
    )
  }
}

class Button extends React.Component{
  render(){
    return (<button class="btn btn-primary_blue_4th btn-lg px-4 me-sm-3" id={this.props.id} style={this.props.style}>{this.props.text}</button>)
  }
}

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
`
// Usage

const AudioPlayer = () => {
  return (
    <div className="audio-player">
      <div className="inner">Audio player content</div>
    </div>
  );
};

class MenuPrincipal extends React.Component{
  render(){
    return(
      <>
        <div class="form-floating mb-3">
          <input class="form-control" id="busqueda" type="text" placeholder="Cancion X"/>
          <label for="busqueda">Buscar  &#128269;</label>
        </div>
        {ultimo_punto_de_escucha()}
        <p></p>
        <ButtonGroup>
          <Button id="" text="Mis Carpetas"/>
          <Button id="" text="Mis Listas"/>
        </ButtonGroup>
        <p></p>
        <ButtonGroup>
          <Button id="" text="Favoritos"/>
          <Button id="" text="Random"/>
          <Button id="" text="Social"/>
        </ButtonGroup>
        <p></p>
      </>
    )
  }
}

class Footer extends React.Component{
  render(){
    return (
        <>
          <footer style={{position: 'fixed', width : '100%', bottom: 0}} class="py-5 bg-blue_4th">
              <div class="container px-5"><p class="m-0 text-center text-white">Copyright &copy; Mussa Enterprise&#xae; 2023</p></div>
          </footer>
        </>
    )
  }
}

function toast_comenzar(){
  toast("Tonto el que lo lea jijiji")
}

function Inicio() {
  return (
    <div className="menu">
      <BarraNavegacion/>
      <Cabecera/>
      <section class="bg-light py-5 border-bottom">
        <div class="container px-5 my-5">
            <div class="text-center mb-5">
                <h2 class="fw-bolder">Melodia</h2>
                <p class="lead mb-0">Escucha musica y mucho más...</p>
            </div>
            <div class="row gx-5 justify-content-center">
              <ImagenInfo src="assets/boy_listening_music.jpg" message="Disfuta de tus temas favoritos"/>
              <ImagenInfo src="assets/girls_listening_music.jpg" message="Descubre nueva música"/>
              <ImagenInfo src="assets/girl_composer.jpg" message="Lleva tu música a todo el mundo"/>
          </div>
        </div>
      </section>
      <Footer/>
      <ToastContainer/>
    </div>
  );
}

function comprobar_entrada_registro(e){
  /* Sean los campos del formulario rellenado */
  let email = (document.getElementById("email")).value
  let usuario = (document.getElementById("name")).value
  let contra = (document.getElementById("passwd")).value
  let recontra = (document.getElementById("repasswd")).value

  /* Sea la caja donde pondremos el texto de error */
  let textBox = document.getElementById("error_input")

  if (email === "" || usuario === "" || contra === "" || recontra === ""){
      textBox.innerHTML = 'Para registrarse debe rellenar todos los campos'
      e.preventDefault();
      return false;
  }
  else if(contra !== recontra){
      textBox.innerHTML = 'Las contraseñas introducidas no coinciden'
      e.preventDefault();  
      return false;
  }

  enviar_peticion_registro(email, usuario, contra);
  e.preventDefault();
  return true
}

function enviar_peticion_registro(email, usuario, passwd){
  fetch("http://192.168.56.1:8081/SetUser/", {
    method : "POST",
    body : JSON.stringify({"idUsr" : 0, "email" : email, "contrasenya" : passwd, "tipoUsuario" : "normalUser", "alias" : usuario})
  }).then(function(response){
    console.log(response)
    if(response.ok){
      response.json().then(function(data){
        idUsuario = data.idUsr;
        return menuPrincipal();
      }).catch(function(error){
        console.error('Error al analizar la respuesta JSON:', error);
      })
    }
  })
  .catch(error => toast(error.message))
}

function enviar_peticion_inicio(e){

  e.preventDefault();

  let email = (document.getElementById("email")).value
  let contra = (document.getElementById("passwd")).value
  
  let textBox = document.getElementById("error_input")

  if (email === "" || contra === ""){
      textBox.innerHTML = 'Complete todos los campos<br> para iniciar sesión'
      return false;
  }

  fetch("http://192.168.56.1:8081/ValidateUserEmail/", {
    method : "POST",
    body : JSON.stringify({"email" : email, "contrasenya" : contra})
  }).then(function(response){
    if(response.ok){
      response.json().then(function(data){
        idUsuario = data.idUsr;
        return menuPrincipal();
      }).catch(function(error){
        console.error('Error al analizar la respuesta JSON:', error);
      })
    }else{
      textBox.innerHTML = 'El usuario o la contraseña<br> son incorrectos'
    }
  }).catch(error => toast(error.message))
}

function ultimo_punto_de_escucha(){

  //TODO: Comprobar que haya un ultimo punto de escucha
  return(
    <ButtonGroup>
          <Button id="" text="Continuar ultima escucha"/>
    </ButtonGroup>
  )
}

/*function listarListaReproduccion(idUsuario, ){
  fetch("http://192.168.56.1:8081/GetListasUsr/", {
    method : "POST",
    body : JSON.stringify({"idUsr" : 0, "email" : email, "contrasenya" : passwd, "tipoUsuario" : "normalUser", "alias" : usuario})
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
}*/

function Login(){
  return (
    <div className="menu">
      <BarraNavegacion/>
      <FormularioInicio/>
      <Footer/>
      <ToastContainer/>
    </div>
  );
}

function Signin(){
  return(
    <div className="menu">
      <BarraNavegacion/>
      <FormularioRegistro/>
      <Footer/>
      <ToastContainer/>
    </div>
  );
}

function Menu(){
  return(
    <div className="menu">
      <BarraNavegacionApp/>
      <MenuPrincipal/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function App() {

  return (
    <Inicio/>
  );

}

function principal(){
  root.render(<Inicio/>, document.getElementById('root'))
}

function inicioSesion(){
  root.render(<Login/>, document.getElementById('root'))
}

function registrarse(){
  root.render(<Signin/>, document.getElementById('root'))
}

function menuPrincipal(){
  root.render(<Menu/>, document.getElementById('root'))
}

export default App;
