
import './Style.css';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components"

import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
const ipBackend = "http://192.168.56.1:8081/";
const passwd = "";

let idUsuario;

function active(elem, num){
  if(elem === num){
    return 'nav-link active'
  }
  return 'nav-link'
}
class BarraNavegacion extends React.Component{
  render(){
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-blue_4th">
              <div class="container px-5">
                  <img class="navbar-brand" id="nav" src="assets/favicon.ico" style={{"width" : "3rem", "height" : "auto"}} onClick={principal}></img>
                  <a class="navbar-brand" id="nav" href="#!"onClick={principal}>Melodia</a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                          <li class="nav-item"><a id="nav" class={active('1', this.props.active)} aria-current="page" onClick={principal}>Inicio</a></li>
                          <li class="nav-item"><a id="nav" class={active('2', this.props.active)} onClick={inicioSesion}>Iniciar Sesión</a></li>
                          <li class="nav-item"><a id="nav" class={active('3', this.props.active)} onClick={registrarse}>Registrarse</a></li>
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
                  <img class="navbar-brand" id="nav" src="assets/favicon.ico" style={{"width" : "3rem", "height" : "auto"}} onClick={menuPrincipal}></img>
                  <a class="navbar-brand" href="#!" onClick={menuPrincipal}>Melodia</a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                          <li class="nav-item"><a id='nav' class="nav-link active" aria-current="page">Notificaciones  &#128276;</a></li>
                          <li class="nav-item"><a id='nav' class="nav-link"  onClick={perfil}>Perfil &#128578;	</a></li>
                          <li class="nav-item"><a id='nav' class="nav-link">Top Diario &#129351; </a></li>
                          <li><p>&emsp;&emsp;&emsp;&emsp;</p></li>
                          <li class="nav-item"><a id='nav' class="nav-link" onClick={inicioSesion}>Cerrar Sesión &#128682;</a></li>
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
                                  <a class="btn btn-primary_blue_4th btn-lg px-4 me-sm-3" href="#!" onClick={registrarse}>Comenzar</a>
                                  <a class="btn btn-outline-light btn-lg px-4" href="#!" onClick={menuPrincipal}>Más información</a>
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
        <header class="bg-blue_7th py-5 main" style={{"align-self" : "center"}}>
            <div class="container">
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
        <header class="bg-blue_7th main" style={{"align-self" : "center"}}>
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
    return (<a class="btn btn-primary_blue_4th btn-lg px-4 me-sm-3" href="#!" id={this.props.id} style={this.props.style}>{this.props.text}</a>)
  }
}

class ButtonOnClick extends React.Component{
  render(){
    return (<a class="btn btn-primary_blue_4th btn-lg px-4 me-sm-3" href="#!" onClick={this.props.onClick} id={this.props.id} style={this.props.style}>{this.props.text}</a>)
  }
}

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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

// <a class="btn btn-primary_blue_4th btn-lg px-4 me-sm-3" href="#!" onClick={misListasDeReproduccion}>Mis Listas</a>
class MenuPrincipal extends React.Component{
  render(){
    return(
      <div class="main">
        <div style={{"display" : "flex"}}>
          <div style={{"width":"15rem", "margin-left" : "1rem"}}>
            {ultimo_punto_de_escucha()}
            <p><br/></p>
            <ButtonGroup>
              <Button id="" text="Mis Carpetas"/>
              <p></p>
              <ButtonOnClick onClick={misListasDeReproduccion} id="" text="Mis Listas"/>
            </ButtonGroup>
            <p><br/></p>
            <ButtonGroup>
              <Button id="" text="Favoritos"/>
              <p></p>
              <Button id="" text="Random"/>
              <p></p>
              <Button id="" text="Social"/>
            </ButtonGroup>
            <p><br/></p>
          </div>
          <div class="bg-blue_3th" style={{"width" : "100%", "heigth" : "100%"}}>
            <div class="form-floating mb-3">
              <input class="form-control" id="busqueda" type="text" placeholder="Cancion X"/>
              <label for="busqueda">Buscar  &#128269;</label>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}

class PerfilUsuario extends React.Component{
  constructor(props) {
    super(props);
    this.state = {name: ""};
  }

  componentDidMount() {
   fetch(ipBackend + "getNameUsr/",{
      method : "POST",
      body : JSON.stringify({"idUsr" : idUsuario})
    }).then(res => res.json())
     .then(
       (result) => {
         this.setState({
           name: result.name
           });
         },
         (error) => {
           console.log(error);
         }
       )
   }
  
  /*{this.state.name} poner donde dice juanito cuando la funcion de recuperar nombre este en el backend*/
  render(){
    return (
      <header class="bg-blue_7th py-5">
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-4">
              <div class="card-body p-5">
                <div class="list-unstyled mb-4">
                  <li class="mb-2">
                    <img src="assets/boy_listening_music.jpg" width="100%" style={{"border-radius" : "50%"}}/>
                  </li>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4 mb-md-0">
              <div class="text-center">
                <h1 class="tuPerfil text-tuPerfil-50 mb-3">Tu perfil</h1>
                <p class="display-5 fw-bolder text-white mb-4 ">Juanito</p>
                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center"/>
                <div class="row justify-content-center align-items-center"/>
                <div class="row justify-content-center align-items-center">
                  <a class="btn btn-primary_blue_4th btn-lg px-4 me-sm-3" href="#!">Ser artista</a>
                  <a class="btn btn-primary_blue_4th btn-lg px-4 me-sm-3" href="#!">Subir canción</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

class ListasReproduccion extends React.Component{

  constructor(props) {
    super(props);
    this.state = {listas: ""};
  }

  // componentDidMount() {
  //   fetch(ipBackend + "GetListasUsr/", {
  //     method : "POST",
  //     body : JSON.stringify({"idUsr" : idUsuario, "contrasenya" : passwd})
  //   }).then(function(response){
  //     if(response.ok){
  //       response.json().then(function(data){
  //         this.state.listas = data.listas;
  //       }).catch(function(error){
  //         console.error('Error al analizar la respuesta JSON:', error);
  //       })
  //     }else{
  //       toast.error("El usuario o la contraseña son incorrectos")
  //     }
  //   }).catch(error => toast(error.message))
  // }

  // Cristina: importante el botón de crear nueva tiene que llamar a la api para crear otra lista de reproducción y sacar a la pantalla
  // específica de esa nueva lista de reproducción para que añada canciones
  render(){
    return (
      <>
        <header class="bg-blue_7th py-5" >
          <div class="container px-5" style={{"margin-top" : "3rem"}}>
            <div class="row gx-5 justify-content-center">
              <div class="col-lg-6">
                <div class="text-center my-5">
                  <h1 class="display-5 fw-bolder text-white mb-2" style={{"padding-bottom" : "1rem"}}>Mis listas de reproducción</h1>
                  <ButtonOnClick onClick={nuevaListaDeReproduccion} id="" text="Crear nueva lista"/>
                </div>
              </div>
            </div>
          </div>
        </header>
        <mostrar_listas_reproduccion playlists={this.state.listas} />
      </>
    )
  }
}

class ListaReproduccionContenido extends React.Component{

  constructor(props) {
    super(props);
    this.state = {listas: "", nombreLista: ""};
  }

  // hay que comprobar cómo furula esto
  // componentDidMount() {
  //   fetch(ipBackend + "SetLista/", {
  //     method : "POST",
  //     body : JSON.stringify({"idUsr" : idUsuario, "contrasenya" : passwd})
  //   }).then(function(response){
  //     if(response.ok){
  //       response.json().then(function(data){
  //         this.state.listas = data.listas;
  //       }).catch(function(error){
  //         console.error('Error al analizar la respuesta JSON:', error);
  //       })
  //     }else{
  //       toast.error("El usuario o la contraseña son incorrectos")
  //     }
  //   }).catch(error => toast(error.message))
  // }

  // Cristina: importante el botón de añadir canciones tiene que llamar a la api para meter otra canción y volver a recargar esta página
  render(){
    return (
      <>
        <header class="bg-blue_7th py-5" >
          <div class="container px-5" style={{"margin-top" : "3rem"}}>
            <div class="row gx-5 justify-content-center">
              <div class="col-lg-6">
                <div class="text-center my-5">
                  <h1 class="display-5 fw-bolder text-white mb-2" style={{"padding-bottom" : "1rem"}}>{this.state.nombreLista}</h1>
                  <ButtonOnClick onClick={nuevaListaDeReproduccion} id="" text="Añadir canciones"/>
                </div>
              </div>
            </div>
          </div>
        </header>
        <mostrar_listas_reproduccion playlists={this.state.listas} />
      </>
    )
  }
}


/** 
 * Clase que genera el footer básico de Mussa Enterprise
*/
class Footer extends React.Component{
  render(){
    return (
        <>
          <footer style={{display : 'flex', "flex-direction" : "column", "justify-content" : "center" , width : '100%', height : '2rem' }} class="py-5 bg-blue_4th">
              <div class="container px-5"><p class="m-0 text-center text-white">Copyright &copy; Mussa Enterprise&#xae; 2023</p></div>
          </footer>
        </>
    )
  }
}

/*
* Función que muestra la página inicial de la web de Melodia
*/
function Inicio() {
  return (
    <div className="menu">
      <BarraNavegacion active='1'/>
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
      toast.warning("Para registrarse debe rellenar todos los campos")
      e.preventDefault();
      return false;
  }
  else if(contra !== recontra){
    toast.error("Las contraseñas introducidas no coinciden") 
      e.preventDefault();  
      return false;
  }

  enviar_peticion_registro(email, usuario, contra);
  e.preventDefault();
  return true
}

function enviar_peticion_registro(email, usuario, passwd){
  fetch(ipBackend + "SetUser/", {
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
  .catch(error => toast.error(error.message))
}

function enviar_peticion_inicio(e){

  e.preventDefault();

  let email = (document.getElementById("email")).value
  let contra = (document.getElementById("passwd")).value
  
  let textBox = document.getElementById("error_input")

  if (email === "" || contra === ""){
      toast.warning("Complete todos los campos para iniciar sesión");
      
      return false;
  }

  fetch(ipBackend + "ValidateUserEmail/", {
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
      toast.error("El usuario o la contraseña son incorrectos")
    }
  }).catch(error => toast.error(error.message))
}

function ultimo_punto_de_escucha(){

  //TODO: Comprobar que haya un ultimo punto de escucha
  return(
    <ButtonGroup>
          <Button id="" text="Continuar ultima escucha"/>
    </ButtonGroup>
  )
}

function mostrar_listas_reproduccion(props) {
  const playlists = props.playlists;

  const playlistItems = playlists.map((playlist) => (
    <div key={playlist.link}>
      <h3>{playlist.name}</h3>
      <p>{playlist.description}</p>
      <a href={playlist.link}>Ver playlist</a>
    </div>
  ));

  return (
    <div>
      <h2>Listas de reproducción:</h2>
      {playlistItems}
    </div>
  );
}

function Login(){
  return (
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacion active='2'/>
      <div style={{ "display" : "flex", "flex": 1 }}>
        <FormularioInicio/>
      </div>
      <Footer/>
      <ToastContainer/>
    </div>
  );
}

function Signin(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacion active='3'/>
      <div style={{ "display" : "flex", "flex": 1 }}>
        <FormularioRegistro/>
      </div>
      <Footer/>
      <ToastContainer/>
    </div>
  );
}

function Profile(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <PerfilUsuario/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function PlayLists(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <ListasReproduccion/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function PlayListContenido(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <ListaReproduccionContenido/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function Menu(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
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

// Funciones iniciales para cargar el código de la nueva vista de la web

function principal(){
  root.render(<Inicio/>)
}

function inicioSesion(){
  root.render(<Login/>)
}

function registrarse(){
  root.render(<Signin/>)
}

function perfil(){
  root.render(<Profile/>)
}

function menuPrincipal(){
  root.render(<Menu/>)
}

function misListasDeReproduccion(){
  root.render(<PlayLists/>)
}

function nuevaListaDeReproduccion(){
  root.render(<PlayListContenido/>)
}

export default App;
