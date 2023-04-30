
import './Style.css';
import React, { StrictMode, useState } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components"
import H5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import * as Tone from 'tone'

import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
const ipBackend = "http://192.168.56.1:8081/";
window.password = "example";
window.idUsuario = "example";
window.listasReproduccion = "example";

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

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
class Reproductor extends React.Component{

  constructor(props){
    super(props)
    this.audioRef = React.createRef();

    this.state = {'audioSrc' : '', 'volumeGain' : ''}

    let x = randomIntFromInterval(0, 2);
    switch (x){
      case 0:
        this.state.audioSrc = 'ost/Down_Queens_Boulevard.mp3';
        break
      case 1:
        this.state.audioSrc = 'ost/Fellas_From_the_South.mp3';
        break
      default:
        this.state.audioSrc = 'ost/Gangsters_Delight.mp3';
    }

    this.state.volumeGain = {'bass' : 2, 'treble' : 4};
  }

  componentDidMount() {
    console.log(this.audioRef); // check the value of this.audioRef
    console.log(this.audioRef.audio); // check the value of this.audioRef.audio
    console.log(this.audioRef.audio.current);
    Tone.start();
  }

  applyEq = () => {
    const audioElement = this.audioRef.audio.current;
    audioElement.addEventListener('canplay', () => {
    const audioSource = Tone.context.createMediaElementSource(audioElement);
    const eq = new Tone.EQ3({
      low: -12,
      mid: -12,
      high: -12,
      lowFrequency: 200,
      highFrequency: 2000,
      gain: 0
    });
    audioSource.connect(eq);
    eq.toDestination();
  });
  };

  render(){

    return (
        <div style={{"display" : "flex"}}>
          <H5AudioPlayer
            id='reproductor'
            ref={(element) => { this.audioRef = element; }}
            src={this.state.audioSrc}
            autoPlay={true}
            showFilledVolume={true}
            showSkipControls={true}
            onPlaying={this.applyEq}
          />
        </div>
    );
  }
  
};


class MenuPrincipal extends React.Component{
  render(){
    return(
      <div class="main" style={{"display" : "flex"}}>
        <div style={{"display" : "flex", "flex-direction" : "column", "justify-content" : "center" , "width":"15rem", "margin-left" : "0.5rem"}}>
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
        <div style={{"display" : "flex", "flex-direction" : "column", "flex" : "1"}}>
          <div class="bg-blue_3th main" style={{"width" : "100%", "heigth" : "100%", "flex": 1 }}>
            <div class="form-floating mb-3">
              <input class="form-control" id="busqueda" type="text" placeholder="Cancion X"/>
              <label for="busqueda">Buscar  &#128269;</label>
            </div>
          </div>
          <div style={{"width" : "100%"}}>
            <Reproductor/>
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
      body : JSON.stringify({"idUsr" : window.idUsuario})
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
      <header class="bg-blue_7th py-5" style={{"display":"flex", "flex-direction":"column", "justify-content":"center","flex" : 1}}>
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

function FormularioArtista() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    if (event.target.value.length <= 5000) {
      setText(event.target.value);
    }
  };

  return (
    <div class="col-md-4 mb-4 mb-md-0">
      <div class="text-center">
        <h1 class="tuPerfil text-tuPerfil-50 mb-3">Solicitud para ascender a artista</h1>
        <p class="display-5 fw-bolder text-white mb-4 ">Escribe a continuación tu trayectoria musical</p>
        <p class="display-5 fw-light text-white mb-4">Cuentanos los datos más relevantes de tu historia en la música, mayores éxitos, motivos para obtener tu ascenso</p>
        <div class="d-grid gap-3 d-sm-flex justify-content-sm-center"/>
        <div class="row justify-content-center align-items-center"/>
        <div>
          <textarea
            value={text}
            onChange={handleChange}
            maxLength={5000}
          />
          <p>{text.length}/5000 caracteres</p>
        </div>
        <p class="display-5 fw-bolder text-white mb-4 ">Sube una demo musical, una canción o un fragmento de podcast originales</p>
        <input type="file" accept=".wav,.mp3" />
      </div>
    </div>
  );
}

class ListasReproduccion extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch(ipBackend + "GetListasUsr/", {
      method : "POST",
      body : JSON.stringify({"email" : window.idUsuario, "contrasenya" : window.passwd})
    }).then(function(response){
      if(response.ok){
        response.json().then(function(data){
          window.listasReproduccion = data.listas;
        }).catch(function(error){
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("El usuario o la contraseña son incorrectos")
      }
    }).catch(error => toast(error.message))
  }

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
        <mostrar_listas_reproduccion playlists={window.listasReproduccion} />
      </>
    )
  }
}

class NuevaListaReproduccionContenido extends React.Component{

  constructor(props) {
    super(props);
    this.state = {listas: "", nombreLista: ""};
  }

  componentDidMount() {
    fetch(ipBackend + "SetLista/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd})
    }).then(function(response){
      if(response.ok){
        response.json().then(function(data){
          
        }).catch(function(error){
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("El usuario o la contraseña son incorrectos")
      }
    }).catch(error => toast(error.message))
  }

  // Cristina: importante el botón de añadir canciones tiene que llamar a la api para meter otra canción y volver a recargar esta página
  render(){
    return (
      <>
        <header class="bg-blue_7th py-5" >
          <div class="container px-5" style={{"margin-top" : "3rem"}}>
            <div class="row gx-5 justify-content-center">
              <div class="col-lg-6">
                <div class="text-center my-5">
                  <h1 class="display-5 fw-bolder text-white mb-2" style={{"padding-bottom" : "1rem"}}>Nueva lista de reproducción</h1>
                  <ButtonOnClick onClick={anyadirCancionListaRep} id="" text="Añadir canciones"/>
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

class AnyadirCancionListaReproduccion extends React.Component{

  constructor(props) {
    super(props);
    this.state = {listas: "", nombreLista: ""};
  }

  // HAY QUE CAMBIAR LA FUNCION PORQUE AHORA MISMO NO HAY NADA QUE DEVUELVA LO QUE NECESITO: METER UNA BÚSQUEDA
  componentDidMount() {
    fetch(ipBackend + "GetSongs/", {
      method : "GET",
      //body : JSON.stringify({"listaIDs" : idUsuario, "calidadAlta" : passwd})
    }).then(function(response){
      if(response.ok){
        response.json().then(function(data){
          this.state.listas = data.listas;
        }).catch(function(error){
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("El usuario o la contraseña son incorrectos")
      }
    }).catch(error => toast(error.message))
  }


  render(){
    return (
      <>
        <header class="bg-blue_7th py-5" >
          <div class="container px-5" style={{"margin-top" : "3rem"}}>
            <div class="row gx-5 justify-content-center">
              <div class="col-lg-6">
                <div class="text-center my-5">
                  <h1 class="display-5 fw-bolder text-white mb-2" style={{"padding-bottom" : "1rem"}}>Añadir canciones a la lista de reproducción</h1>
                  <ButtonOnClick onClick={meterCancionesEnListaRep} id="" text="Añadir canciones"/>
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

function enviar_peticion_registro(email, usuario, contra){
  fetch(ipBackend + "SetUser/", {
    method : "POST",
    body : JSON.stringify({"idUsr" : 0, "email" : email, "contrasenya" : contra, "tipoUsuario" : "normalUser", "alias" : usuario})
  }).then(function(response){
    console.log(response)
    if(response.ok){
      response.json().then(function(data){
        window.idUsuario = email;
        window.passwd = contra
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
        window.idUsuario = email;
        window.passwd = contra
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

function meterCancionesEnListaRep(){
  // meter las canciones que me pasen en la lista de reproduccion con un SetMultipleSongsLista
  // volver a renderizar el contenido de la lista de reproduccion
  return nuevaListaDeReproduccion;
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

function becomeArtist(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <FormularioArtista/>
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
      <NuevaListaReproduccionContenido/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function AnyadirCancionLista(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <AnyadirCancionListaReproduccion/>
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

function serArtista(){
  root.render(<becomeArtist/>)
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

function anyadirCancionListaRep(){
  root.render(<PlayListContenido/>)
}

export default App;
