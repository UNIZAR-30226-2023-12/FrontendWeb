
import './Style.css';
import React, { StrictMode, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components"
import H5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { BsSliders2Vertical, BsBarChartLineFill } from 'react-icons/bs';
import { MdShuffleOn, MdOutlineShuffle, MdRepeatOn, MdRepeat, MdArrowUpward, MdArrowDownward, MdArrowForward, MdWatchLater, MdPlayArrow, MdAdd} from 'react-icons/md'
import { GiDrum, GiMusicalKeyboard, GiUltrasound } from 'react-icons/gi'
import {AiOutlineGlobal} from 'react-icons/ai'
import {FiShare2} from 'react-icons/fi'
import * as DjangoAPI from './Django_API';
import * as Tone from 'tone';
import moment from 'moment';
import 'moment/locale/es';

import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
//const ipBackend = "http://127.0.0.1:8081/"; // cristina
const ipBackend = "http://10.1.58.82:8081/"; // cristina
//const ipBackend = "http://192.168.56.1:8081/"; // ismael
const tipoListaReproduccion = "listaReproduccion";
const tipoListaFavoritos = "listaFavoritos";
const constListaNueva = "nueva";
const constListaExistente = "existente";
const constCarpetaNueva = "nueva";
const constCarpetaExistente = "existente";
const nombreNuevaListaReproduccion = "Nueva lista de reproducción";
const nombreNuevacarpeta = "Nueva carpeta";

window.password = "example";
window.idUsuario = "example";
window.email = "example";
window.nombreNuevaListaReproduccion = "Nueva lista de reproducción";
window.nombreNuevaCarpeta = "Nueva carpeta";
window.nombreNuevaListaGlobal = "Nueva lista global";
window.idsLista = [];
window.idLista = 0;
window.hayListasReproduccion = 0;
window.calidad = "baja";
window.cancionesLista = [];
window.origenPasoListaRepACanciones = "";
window.origenPasoCarpetaALista = "";
window.idCarpeta = 0;

//Funciones de prueba

// Inicializa Tone.js
Tone.start();

//const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const eq = new Tone.EQ3({
  low: -200, // ganancia para frecuencias bajas
  mid: -200, // ganancia para frecuencias medias
  high: -200 // ganancia para frecuencias altas
});

//const reverb = new Tone.Reverb(3).toDestination();

//-----------



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
                          {/*TODO: cuando se pueda acceder al envio de correo eliminar de aqui, se verá desde el botón de mandar correo*/}
                          <li class="nav-item"><a id='nav' class="nav-link" onClick={topDiario}>Top Diario &#129351; </a></li>
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
                              <p></p>
                              <h1 class="cuerpo-formArtista fw-bolder text-white mb-2" style={{"padding-bottom" : "1 rem"}}>¿Has olvidado la contraseña?</h1>
                              <ButtonOnClick
                                onClick={correoRecuperacion}
                                id=""
                                text="Recuperar contraseña"
                              />
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

class EnviarCorreoRecuperacion extends React.Component {
  enviar_codigo_recuperacion = (event) => {
    event.preventDefault(); // evita que la página se recargue
    const mailRecuperacion = document.getElementById("mailRecuperacion").value;
    window.email = document.getElementById("mailRecuperacion").value;
    // TODO: debe invocar al backend para mandar el correo, función fuera de frontAPI, nombre inventado :)
    // TODO: ver como pasar los parámetros a la función
    fetch(ipBackend + "EnviarCodigoEmail/", {
      method: "POST",
      body: JSON.stringify({ email: mailRecuperacion }),
    })
      .then(function (response) {
        console.log(response);
        if (response.ok) {
          response
            .json()
            .then(function (data) {
              return cambiarContrasena();
            })
            .catch(function (error) {
              console.error("Error al analizar la respuesta JSON:", error);
            });
        }
      })
      .catch((error) => toast.error(error.message));
  };

  render() {
    return (
      <header
        className="bg-blue_7th py-5 main"
        style={{ alignSelf: "center" }}
      >
        <div className="container">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
              <div className="text-center my-5">
                <h1
                  className="display-5 fw-bolder text-white mb-2"
                  style={{ paddingBottom: "1rem" }}
                >
                  <span
                    style={{
                      display: "block",
                      textAlign: "center",
                    }}
                  >
                    Recuperación de Contraseña
                  </span>
                </h1>
                <form
                  id="contactForm"
                  style={{
                    margin: "auto",
                    maxWidth: "20rem",
                    width: "100%",
                    alignSelf: "center",
                  }}
                  onSubmit={this.enviar_codigo_recuperacion} // llama al método definido dentro del componente
                >
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      id="mailRecuperacion"
                      type="text"
                      placeholder="Introduce tu correo electronico"
                    />
                    <label htmlFor="name">
                      Email asociado a la cuenta
                    </label>
                  </div>
                  <button
                    className="btn btn-primary_blue_4th btn-lg px-4 me-sm-3"
                    id="submitButton"
                    type="submit"
                  >
                    Mandar código validación
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}


class FormularioCambiarContrasena extends React.Component{
  // TODO: falta implementar el formulario: introducir código verificación, contraseña nueva y confirmar contraseña nueva
  //       se debe comprobar que el código de verificación es correcto y que las contraseñas coinciden
  //       si todos se cumple se envía la nueva contraseña al backend
  render(){
    return(
      <header class="bg-blue_7th py-5 main" style={{"align-self" : "center"}}>
          <div class="container">
              <div class="row gx-5 justify-content-center">
                  <div class="text-center my-5">
                      <h1 class="display-5 fw-bolder text-white mb-2" style={{"padding-bottom" : "1 rem"}}>Recuperar contraseña</h1>
                          <form id="contactForm" style={{"margin" : "auto", "max-width" : "20rem", "width" : "100%", "align-self": "center"}} onSubmit={enviar_cambio_contra}>
                              <div class="form-floating mb-3">
                                  <input class="form-control" id="email" type="text" placeholder="Introduce el código de verificación enviado a tu correo"/>
                                  <label for="name">Codigo</label>
                              </div>
                              <div class="form-floating mb-3">
                                  <input class="form-control" id="passwd" type="password" placeholder="Introduce la nueva contraseña"/>
                                  <label for="passwd">Nueva contraseña</label>
                              </div>
                              <div class="form-floating mb-3">
                                  <input class="form-control" id="passwd" type="password2" placeholder="Repite la nueva contraseña"/>
                                  <label for="passwd2">Repetir nueva contraseña</label>
                              </div>
                              <button class="btn btn-primary_blue_4th btn-lg px-4 me-sm-3" id="submitButton" type="submit" >Recuperar contraseña</button>
                          </form>
                          <p></p>
                          <p class="fw-normal fst-italic text-warning fs-5" id="error_input"></p>
                      <div class="d-grid gap-3 d-sm-flex justify-content-sm-center">
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

class ButtonCommit extends React.Component{
  render(){
    return (<a class="btn btn-primary_blue_4th" href="#!" onClick={this.props.onClick} id={this.props.id} style={{fontSize: '16px'}}>{this.props.text}</a>)
  }
}

class ButtonSmall extends React.Component {
  render() {
    return (
      <a
        class="btn btn-primary_blue_4th btn-sm px-4 me-sm-3"
        href="#!"
        onClick={this.props.onClick}
        id={this.props.id}
        style={{ fontSize: '12px' }}
      >
        {this.props.text}
      </a>
    );
  }
}

class ButtonType extends React.Component{
  render(){
    return (<button class="btn btn-primary_blue_4th btn-lg px-4 me-sm-3" href="#!" type={this.props.type} id={this.props.id} style={this.props.style}>{this.props.text}</button>)
  }
}

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
`

class Repeat_Button extends React.Component{
  constructor(props){
    super(props)

    this.state = {"loop" : false};
  }

  switch_state = () => {
    this.setState(
      prevState => ({
        loop: !prevState.loop
      }),
      () => {
        // Llamada a la funcion pasada por el padre
        this.props.onLoopChange(this.state.loop);
      }
    );
  }

  render(){
    if(this.state.loop){
      return(<MdRepeatOn class="rhap_repeat-button rhap_button-clear" onClick={this.switch_state} onChange={this.props.onChange}/>)
    }

    return(<MdRepeat class="rhap_repeat-button rhap_button-clear" onClick={this.switch_state} onChange={this.props.onChange}/>)
  }
}

class ShuffleButtonNoTransition extends React.Component{

  render(){
    return(<MdOutlineShuffle class="rhap_repeat-button rhap_button-clear" onClick={this.onClick}/>)
  }
}

class UpArrowNoTransition extends React.Component{

  render(){
    return(<MdArrowUpward class="rhap_repeat-button rhap_button-clear" onClick={this.onClick}/>)
  }
}

class DownArrowNoTransition extends React.Component{

  render(){
    return(<MdArrowDownward class="rhap_repeat-button rhap_button-clear" onClick={this.onClick}/>)
  }
}

class PlayNoTransition extends React.Component{

  render(){
    return(<MdPlayArrow class="rhap_repeat-button rhap_button-clear" onClick={this.onClick}/>)
  }
}

class AddNoTransitionCarpeta extends React.Component{

  CambiarPantalla = () => {
    console.log("Cris idCarpeta: ", window.idCarpeta);
    fetch(ipBackend + "AddListToFolder/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idLista" :this.idLista, "idCarpeta" : window.idCarpeta})
    }).then((response) => {
        if(response.ok){
          // todo bien y correcto
        } else{
          toast.warning("No se ha podido recuperar la información de tus listas de reproduccion")
        }
      }).catch(error => toast.error(error.message))
  } 

  render(){
    return(<MdAdd class="rhap_repeat-button rhap_button-clear" onClick={this.CambiarPantalla}/>)
  }
}

class AddNoTransition extends React.Component{

  render(){
    return(<MdAdd class="rhap_repeat-button rhap_button-clear" onClick={this.onClick}/>)
  }
}

class RightArrowNoTransition extends React.Component{

  CambiarPantalla = () => {
    window.origenPasoListaRepACanciones = constListaExistente;
    window.nombreNuevaListaReproduccion = this.props.text;
    contenidoListaDeReproduccion(this.props.var);
  }  

  render(){
    return(<MdArrowForward class="rhap_repeat-button rhap_button-clear" onClick={this.CambiarPantalla}/>)
  }
}

class RightArrowNoTransitionCarpeta extends React.Component{

  CambiarPantalla = () => {
    window.origenPasoCarpetaALista = constListaExistente;
    window.nombreNuevaCarpeta = this.props.text;
    contenidoCarpeta(this.props.var);
  }  

  render(){
    return(<MdArrowForward class="rhap_repeat-button rhap_button-clear" onClick={this.CambiarPantalla}/>)
  }
}

class Shuffle_Button extends React.Component{
  constructor(props){
    super(props)

    this.state = {"shuffle" : false};
  }

  switch_state = () => {
    this.setState(
      prevState => ({
        shuffle: !prevState.shuffle
      }),
      () => {
        // Llamada a la funcion pasada por el padre
        this.props.onShuffleChange(this.state.shuffle);
      }
    );
  }

  render(){
    if(this.state.shuffle){
      return(<MdShuffleOn class="rhap_repeat-button rhap_button-clear" onClick={this.switch_state}/>)
    }

    return(<MdOutlineShuffle class="rhap_repeat-button rhap_button-clear" onClick={this.switch_state}/>)
  }
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
class Reproductor extends React.Component{

  constructor(props){
    super(props)

    this.reproductor = React.createRef()
    this.repeatButton = React.createRef()
    this.shuffleButton = React.createRef()
    
    this.state = {'audioSrc' : '', 
                  'audioCtx' : new AudioContext(),
                  'bajos' : 0,
                  'medios' : 0,
                  'altos' : 0,
                  'showEqualizer' : false,
                  'repeatButton' : {}
                }
    
    //Configuracion de ecualizacion de los bajos
    this.bajos = this.state.audioCtx.createBiquadFilter();
    this.bajos.type = 'lowshelf';
    this.bajos.frequency.value = 250;
    this.bajos.gain.value = this.state.bajos;

    //Configuracion de ecualizacion de los medios
    this.medios = this.state.audioCtx.createBiquadFilter();
    this.medios.type = 'peaking';
    this.medios.frequency.value = 2000;
    this.medios.Q.value = 1;
    this.medios.gain.value = this.state.medios;

    //Configuracion de ecualizacion de los altos
    this.altos = this.state.audioCtx.createBiquadFilter();
    this.altos.type = 'highshelf';
    this.altos.frequency.value = 4000;
    this.altos.gain.value = this.state.altos;
    
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
  }

  componentDidMount(){
    const audioElement = document.querySelector('[src="' + this.state.audioSrc + '"]');
    const sourceNode = this.state.audioCtx.createMediaElementSource(audioElement);
    
    // Conectar los nodos en serie
    sourceNode.connect(this.bajos);
    this.bajos.connect(this.medios);
    this.medios.connect(this.altos);
    this.altos.connect(this.state.audioCtx.destination);

    this.reproductor.current.audio.current.currentTime = 10;
  }

  setBajosGain(value) {
    this.bajos.gain.value = value
    this.setState({bajos : value})
  }

  setMediosGain(value) {
    this.medios.gain.value = value;
    this.setState({medios : value}) 
  }

  setAltosGain(value) {
    this.altos.gain.value = value;
    this.setState({altos : value})
  }

  toggleSlider = () => {
    this.setState({ showEqualizer: !this.state.showEqualizer });
  }

  enable_loop = (loop) => {
    this.reproductor.current.audio.current.loop = loop;
    this.shuffleButton.current.setState({shuffle : false});
  }

  enable_shuffle = (shuffle) => {
    this.reproductor.current.audio.current.loop = false;
    this.repeatButton.current.setState({loop : false});
  }

  store_time = () => {
    //TO DO: Almacenar en la BBDD el tiempo
    this.reproductor.current.audio.current.pause();
    let segundo = this.reproductor.current.audio.current.currentTime;
    toast.info("Guardado el tiempo: " + segundo);
    DjangoAPI.setLastSecondHeared(window.idUsr, window.contrasenya, window.idCancion, segundo)
  }

  share_song = () => {
    fetch(ipBackend + "GetLinkCancion/", {
      method: "POST",
      body: JSON.stringify({ //TODO: cambiar idCancion por la canción escuchada en el momento concreto
        "idUsr": window.idUsuario, "contrasenya": window.passwd, "idSong": window.idCancion

      })
    }).then(response => {
      if (response.ok) {
        response.text().then(data => {
          // Copiar enlace al portapapeles
          navigator.clipboard.writeText(data);
          // Mostrar mensaje de éxito
          toast.info("Enlace a la canción copiado en el portapapeles");
        }).catch(error => {
          console.error('Error al analizar la respuesta de texto:', error);
        })
      } else {
        toast.error("Ha habido un error");
      }
    }).catch(error => toast.error(error.message))
  }
  
  render(){

    return (
        <div style={{"display" : "flex"}}>
          {this.state.showEqualizer && (
            <div style={{"display" : "flex", "flex-direction" : "column", "justify-content" : "space-evenly", "background-color" : "#ffffff", "padding" : "0.3rem"}}>
              <div style={{"display" : "flex"}}>
                <GiDrum/>
                <input type="range" min="-20" max="20" value={this.state.bajos} onChange={(e) => this.setBajosGain(e.target.value)} />
              </div>
              <div style={{"display" : "flex"}}>
                <GiMusicalKeyboard/>
                <input type="range" min="-20" max="20" value={this.state.medios} onChange={(e) => this.setMediosGain(e.target.value)} />
              </div>
              <div style={{"display" : "flex"}}>
                <GiUltrasound/>
                <input type="range" min="-20" max="20" value={this.state.altos} onChange={(e) => this.setAltosGain(e.target.value)} />
              </div>
            </div>
          )}
          <H5AudioPlayer
            ref={this.reproductor}
            id='reproductor'
            src={this.state.audioSrc}
            autoPlay={false}
            volume={1}
            showFilledVolume={true}
            showSkipControls={true}
            customAdditionalControls={[
              <BsSliders2Vertical class="rhap_repeat-button rhap_button-clear" onClick={this.toggleSlider.bind(this)}/>,
              <FiShare2 class="rhap_repeat-button rhap_button-clear" onClick={this.share_song}/>
            ]}
            customControlsSection={[
              RHAP_UI["ADDITIONAL_CONTROLS"],
              <Repeat_Button ref={this.repeatButton} onLoopChange={this.enable_loop}/>,
              RHAP_UI["MAIN_CONTROLS"],
              <Shuffle_Button ref={this.shuffleButton} onShuffleChange={this.enable_shuffle}/>,
              <MdWatchLater class="rhap_repeat-button rhap_button-clear" onClick={this.store_time}/>,
              RHAP_UI["VOLUME_CONTROLS"]
            ]}
          />
        </div>
    );
  }
};


class MenuPrincipal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      esArtista: false,
      esAdmin: true,
    };
  }

  mostrarCancionesPropias() {
    fetch(ipBackend + "GetUser/", {
      method: "POST",
      body: JSON.stringify({ idUsr: window.idUsuario, passwd: window.password }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            esArtista: false/*result.esArtista*/,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  mostrarListasGlobales(){
    fetch(ipBackend + "GetUser/", {
      method: "POST",
      body:JSON.stringify({idUsr: window.idUsuario, passwd:window.password}),
    })
    .then((res) => res.json())
    .then(
      (result) => {
        this.setState({
          esAdmin : true /*result.esAdmin*/,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  render(){
    const esArtista = this.state.esArtista;
    const esAdmin = this.state.esAdmin;
    return(
      <div class="main" style={{"display" : "flex"}}>
        <div style={{"display" : "flex", "flex-direction" : "column", "justify-content" : "center" , "width":"15rem", "margin-left" : "0.5rem"}}>
        <p style={{ marginBottom: '10px' }}><br/></p>
          {ultimo_punto_de_escucha()}
          <p style={{ marginBottom: '10px' }}><br/></p>
          <ButtonGroup>
            <ButtonOnClick onClick={misCarpetas} id="" text="Mis Carpetas"/>
            <p></p>
            <ButtonOnClick onClick={misListasDeReproduccion} id="" text="Mis Listas"/>
          </ButtonGroup>
          <p style={{ marginBottom: '10px' }}><br/></p>
          <ButtonGroup>
            <ButtonOnClick onClick={misFavoritos} id="" text="Favoritos"/>
            <p></p>
            <ButtonOnClick id="" text="Random"/>
            <p></p>
            <ButtonOnClick onClick={perfilOtroUsuario} id="" text="Social"/>
          </ButtonGroup>
          <p style={{ marginBottom: '10px' }}><br/></p>
          {esArtista ? <ButtonOnClick onClick={misCanciones} id="" text="Mis Canciones"/> : null}
          {esAdmin ? <ButtonOnClick onClick={listaGlobal} id="" text="Listas Globales"/> : null}
          <p style={{ marginBottom: '10px' }}><br/></p>
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

function CalidadAudio() {
  const [calidad, setCalidad] = useState(window.calidad || "baja");
  const [cambios, setCambios] = useState(false);

  const handleChange = (event) => {
    setCalidad(event.target.value);
    setCambios(true);
    if (event.target.value === "alta") {
      toast.warning("La reproducción en alta calidad puede conllevar mayor gasto de datos móviles.");
      toast.warning("No todas las canciones están disponibles en alta calidad.");
    }
  };

  const handleGuardar = () => {
    // TODO: falta guardar la calidad que tiene el usuario en la base de datos
    // Cambiar la variable calidad para que no sea constante
    // Al darle a guardar se deberán subir los cambios a la base de datos
    setCambios(false);
    toast.info(`La calidad del audio se ha guardado como ${calidad}.`);
    if (window.calidad === "alta") { // Anteriormente estaba en alta y queremos cambiar a baja
      window.calidad = "baja";
    }
    else {
      window.calidad = "alta"; // Anteriormente estaba en baja y queremos cambiar a alta
    }
  };

  return (
    <div>
      <p class="text-white marginRight:10px">Selecciona la calidad del audio:</p>
      <div>
        <label class="text-white marginRight:10px">
          <input
            type="radio"
            name="calidad"
            value="baja"
            checked={calidad === "baja"}
            onChange={handleChange}
          />
          Baja calidad
        </label>
      </div>
      <div>
        <label class="text-white marginRight:10px">
          <input
            type="radio"
            name="calidad"
            value="alta"
            checked={calidad === "alta"}
            onChange={handleChange}
          />
          Alta calidad
        </label>
      </div>
      {cambios && <ButtonCommit
                    onClick={handleGuardar}
                    id=""
                    text="Guardar"
      />}
    </div>
  );
}

class ListaTopDiario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top1: "Despacito", // Primera canción del top diario
      top2: "Los pollitos",
      top3: "Hola amigo",
      top4: "Canción 4",
      top5: "Canción 5",
      top6: "Canción 6",
      top7: "Canción 7",
      top8: "Canción 8",
      top9: " Cacnión 9",
      top10: "Canción 10", // Última canción del top diario
    }
  }

  componentDidMount(){
    fetch(ipBackend + "GetTopReproducciones/", {
      method: "POST",
      body: JSON.stringify({ "n": "10", "esPodcast": "FALSE"}) // TODO: ver como se llama en backend y la finalidad del parámetro
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error al obtener el minutaje semanal");
    })
    .then(data => {
      const top1 = new Set(data.topAudios); // TODO: comprobar como se lla backend
      this.setState({top1: top1});
    })
    .catch(error => toast.error(error.message))
  }

  render(){
    const { top1, top2, top3, top4, top5, top6, top7, top8, top9, top10 } = this.state;
    return(
      <div className="bg-blue_7th" >
        <div className="text-center my-5 justify-content-center row gx-5">
          <h1 className="display-5 fw-bolder text-white mb-2">Estadísticas de reproducciones globales</h1>
        </div>
        <div className="text-center my-5 justify-content-center row gx-5">
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 1 { top1}</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 2  {top2}</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 3  {top3}</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 4  {top4}</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 5  {top5}</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 6  {top6}</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 7  {top7}</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 8  {top8}</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 9  {top9}</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 10 {top10}</p>
        </div>
      </div>
    )
  }
}

class PerfilUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      esArtista: false,
      esAdmin: true,
    };
  }

  componentDidMount() {
    this.mostrarBotones();
    this.obtenerNombre();
  }

  obtenerNombre() {
    fetch(ipBackend + "GetUser/", {
      method: "POST",
      body: JSON.stringify({ idUsr: window.idUsuario }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            name: result.name,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  mostrarBotones() {
    fetch(ipBackend + "GetUser/", {
      method: "POST",
      body: JSON.stringify({ idUsr: window.idUsuario, passwd: window.password }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            esArtista: true/*result.esArtista*/,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <header
        class="bg-blue_7th py-5"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-4">
              <div class="card-body p-5">
                <div class="list-unstyled mb-4">
                  <li class="mb-2">
                    {/*TODO cambiar la imagen de perfil por la del usuario real, hacer llamada al backend*/}
                    <img
                      src="assets/boy_listening_music.jpg"
                      width="100%"
                      style={{ borderRadius: "50%" }}
                    />
                  </li>
                </div>
                <div class="row justify-content-center align-items-center">
                  <ButtonCommit
                    onClick={editar_foto_perfil}
                    id=""
                    text="Editar foto de perfil"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4 mb-md-0">
              <div class="d-flex align-items-right justify-content-end mb-3">
                {this.state.esArtista === true && (
                  <ButtonSmall
                    onClick={misCanciones}
                    id=""
                    text = {<BsBarChartLineFill />}
                  />
                )}
                {this.state.esAdmin === true && (
                  <ButtonSmall
                    onClick={estadisticas}
                    id=""
                    text = 
                    {
                      <span>
                        <BsBarChartLineFill/> <AiOutlineGlobal/>
                      </span>
                    }
                  />
                )}
              </div>
              <div class="text-center">
                <h1 class="tuPerfil text-tuPerfil-50 mb-3">Tu perfil</h1>
                <p class="display-5 fw-bolder text-white mb-4 ">
                  {/*{this.state.name}*/}
                  Juan
                </p>
                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center" />
                <CalidadAudio/>
                <div class="row justify-content-center align-items-center mb-4"></div>
                <div class="row justify-content-center align-items-center mb-4">
                  {this.state.esArtista === false && this.state.esAdmin == false && (
                    <ButtonOnClick
                      onClick={serArtista}
                      id=""
                      text="Conviértete en artista"
                    />
                  )}
                  {this.state.esArtista === true && (
                    <ButtonOnClick
                    onClick={subirCancion}
                    id=""
                    text="Publica nuevo contenido"
                  />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
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
    <div className="container-fluid --bs-body-bg h-100 d-flex align-items-center main">
      <div className="col-md-3 --bs-blue-bg"></div>
      <div className="col-md-6 --bs-blue-bg d-flex justify-content-center">
        <div className="text-center">
          <p className="titulo-formArtista titulo-formArtista-lg mb-3 text-white">Solicitud para ascender a artista</p>
          <p className="subtitulo-formArtista fw-bolder subtitulo-formArtista subtitulo-formArtista-md mb-4 text-white">Escribe a continuación tu trayectoria musical</p>
          <p className="cuerpo-formArtist fw-light cuerpo-formArtist cuerpo-formArtist-md mb-4 text-white">Cuentanos los datos más relevantes de tu historia en la música</p>
          <div>
            <textarea
              value={text}
              onChange={handleChange}
              maxLength={5000}
              cols={85}
              rows={7}
              style={{ height: '100px' }}
            />
            <p><span style={{color: 'white', width: ''}}>{text.length}/5000 caracteres</span></p>
          </div>
          <div className="text-center">
            <p className="subtitulo-formArtista fw-bolder subtitulo-formArtista subtitulo-formArtista-md mb-4 text-white">
              Sube una demo musical, una canción o un fragmento de podcast originales
            </p>
            <div className="d-flex justify-content-center mb-4">
              <input id="fichero_audio" class="subcuerpo-formArtista fw-normal text-white" type="file" accept=".wav,.mp3"/>
            </div>
            <ButtonCommit onClick={enviar_peticion_artista} id="" text="Enviar solicitud"/>
          </div>
      </div>
      </div>
    </div>
  );
}

function enviarAscenso(){
  //para que no se queje el react
  // TODO
  toast.error("No implementado");
}

function SelectorMusicaPodcast(props) {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");

  const handleOptionChange = (event) => {
    const newValue = event.target.value;
    setOpcionSeleccionada(newValue);
    props.onOptionChange(newValue);
  }

  return (
    <div>
      <p class="cuerpo-formArtista fw-bolder subtitulo-formArtista subtitulo-formArtista-md mb-4 text-white">Selecciona el tipo de contenido</p>
      <label className="text-white marginRight:10px">
        <input
          type="radio"
          name="selectorMusicaPodcast"
          value="musica"
          checked={opcionSeleccionada === "musica"}
          onChange={handleOptionChange}
        />
        Música
      </label>
      <label className="text-white marginRight:10px">
        <input
          type="radio"
          name="selectorMusicaPodcast"
          value="podcast"
          checked={opcionSeleccionada === "podcast"}
          onChange={handleOptionChange}
        />
        Podcast
      </label>
    </div>
  );
}

function CampoDescripcion(props) {
  const [descripcion, setDescripcion] = useState("");
  const [contador, setContador] = useState(0);

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
    setContador(event.target.value.length);
  };
  // TODO: conseguir que donde pone jijijijijiji se escriba en la página escribe tu descripcion, ahora no pone nada
  if (props.opcionSeleccionada === "podcast") {
    return (
      <div className="form-floating mb-3 text-white">
        <textarea
          className="form-control"
          id="descripcion"
          placeholder="Escribe una descripción de tu podcast"
          value={descripcion}
          onChange={handleDescripcionChange}
          maxLength={500}
          cols={85}
          rows={7}
          style={{ height: '100px' , color: 'black'}}
        />
        <div className="text-muted">{contador}/500 carácteres</div>
        <label htmlFor="descripcion">jijijijij</label>
      </div>
    );
  } else {
    return null;
  }
}

function SelectorGenero(props) {
  const [generoSeleccionado, setGeneroSeleccionado] = useState("");

  const handleGeneroChange = (event) => {
    setGeneroSeleccionado(event.target.value);
  };

  if (props.opcionSeleccionada === "musica") {
    return (
      <div className="form-floating mb-3">
        <select
          className="cuerpo-formArtist cuerpo-formArtist cuerpo-formArtist-md mb-4 text-black"
          id=""
          value={generoSeleccionado}
          onChange={handleGeneroChange}
        >
          <option value="">Selecciona el género de tu canción</option>
          <option value="0">Pop</option>
          <option value="1">Rock</option>
          <option value="2">Metal</option>
          <option value="3">Rap</option>
          <option value="4">Reggae</option>
          <option value="5">Jazz</option>
          <option value="6">Blues</option>
          <option value="7">Clásica</option>
          <option value="8">Electrónica</option>
          <option value="9">Folk</option>
          <option value="10">Latina</option>
          <option value="11">Indie</option>
          <option value="12">Country</option>
          <option value="13">Ambient</option>
          <option value="14">Trap</option>
          <option value="15">Dance</option>
          <option value="16">Hip hop</option>
          <option value="17">R&B</option>
          <option value="18">Soul</option>
          <option value="19">Punk</option>
          <option value="20">Funk</option>
        </select>
      </div>
    );
  } else {
    return null;
  }
}

class NuevaCancion extends React.Component{
  constructor(props) {
    super(props);
    this.state = { opcionSeleccionada: '' };
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(newValue) {
    this.setState({ opcionSeleccionada: newValue });
  }
  
  render(){
    return (
      <div className="container-fluid --bs-body-bg h-100 d-flex align-items-center main">
        <div className="col-md-3 --bs-blue-bg"></div>
        <div className="col-md-6 --bs-blue-bg d-flex justify-content-center">
          <div className="text-center">
            <p className="titulo-formArtista titulo-formArtista-lg mb-3 text-white">Publica tu nuevo contenido</p>
            <div class="form-floating mb-3">
                <input class="form-control" id="nombreAudio" type="text" placeholder="nuevaCancion"/>
                <label for="audio">Nombre del audio</label>
            </div>
            <div class="form-floating mb-3">
                <input class="form-control" id="nombreAudio" type="text" placeholder="nuevaCancion"/>
                <label for="audio">Duración del audio</label>
            </div>
            <SelectorMusicaPodcast onOptionChange={this.handleOptionChange}/>
            <CampoDescripcion opcionSeleccionada={this.state.opcionSeleccionada} />
            <SelectorGenero opcionSeleccionada={this.state.opcionSeleccionada} />
            <div className="text-center">
              <p className="cuerpo-formArtista fw-bolder subtitulo-formArtista subtitulo-formArtista-md mb-4 text-white">
                Sube la imagen asociada a tu audio
              </p>
              <div className="justify-content-center mb-4">
                <input class="input-formArtista text-white" type="file"  name="image" accept="image/*" />
              </div>
              <p className="cuerpo-formArtista fw-bolder subtitulo-formArtista subtitulo-formArtista-md mb-4 text-white">
                Sube el archivo de audio a añadir en tu perfil de artista
              </p>
              <div className="d-flex justify-content-center mb-4">
                <input class="input-formArtista text-white" type="file" accept=".wav,.mp3" />
              </div>
              <ButtonCommit onClick={enviar_contenido_artista} id="" text="Subir contenido"/>
            </div>
        </div>
        </div>
      </div>
    );
  }
}

class ListasReproduccion extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      listasReproduccion: []
    };
    window.idsLista = [];
  }

  componentDidMount() {
    fetch(ipBackend + "GetListasUsr/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "idUsrGet" : window.idUsuario, "contrasenya" : window.passwd})
    }).then(response => {
      if(response.ok){
        response.json().then((data) =>{
          console.log("Cris respuesta: ", data)
          if (data.listas.length > 0){
            data.listas.forEach((lista) => {
              fetch(ipBackend + "GetLista/", {
                method : "POST",
                body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idLista" : lista})
              }).then((response) => {
                  if(response.ok){
                    response.json().then((datos) => {
                      if (datos.lista.tipoLista === tipoListaReproduccion){
                        const listaCustom = {
                          id: lista,
                          nombre: datos.lista.nombreLista
                        };
                        this.setState({ listasReproduccion: [...this.state.listasReproduccion, listaCustom] });
                      }
                    })
                  } else{
                    toast.warning("No se ha podido recuperar la información de tus listas de reproduccion")
                  }
                }).catch(error => toast.error(error.message))
            })
          }
        }).catch((error) => {
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("El usuario o la contraseña son incorrectos")
      }
    }).catch(error => toast.error(error.message))
  }
  
  render(){
    return (
      <>
        <div className="bg-blue_7th" >
          <div className="text-center my-5 justify-content-center row gx-5">
            <h1 className="display-5 fw-bolder text-white mb-2">Mis listas de reproducción</h1>
          </div>
          <div className="text-center my-5 justify-content-center row gx-5">
            <div className="d-flex justify-content-center">
              <ButtonOnClick onClick={menuPrincipal} id="" text="Volver al menú"/>
              <ButtonOnClick onClick={nuevaListaDeReproduccion} id="" text="Crear nueva lista"/>
            </div>
          </div>
          <div className="text-center my-5 justify-content-center row gx-5" style={{display: 'flex', alignItems: 'center' }}>
            {(this.state.listasReproduccion.length === 0) ? (
              <p className="display-6 fw-bolder text-white mb-2">No tienes listas de reproducción</p>
            ) : (
                this.state.listasReproduccion.map((lista) => <CardNamePlaylist var={lista.id} text={lista.nombre}/>)
            )}
          </div>
        </div>
      </>
    )
  }
}

class CardNamePlaylist extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="justify-content-center" style={{display: 'flex', alignItems: 'center' }}>
        <p className="display-6 fw-bolder text-white mb-2">{this.props.text}</p>
        <RightArrowNoTransition var={this.props.var} text={this.props.text}/>
      </div>
    )
  }
}

class NuevaListaReproduccionContenido extends React.Component{

  constructor(props) {
    super(props);
    window.cancionesLista = [];
    this.state = {
      sortKey: 'tematica',
      numCanciones: 0
    };
  }

  componentDidMount() {
    if (window.origenPasoListaRepACanciones === constListaNueva) {
      // hay que crear la nueva lista
      fetch(ipBackend + "SetLista/", {
        method : "POST",
        body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "tipoLista": tipoListaReproduccion, "nombreLista": window.nombreNuevaListaReproduccion, "privada": "privada"})
      }).then(response => {
        if(response.ok){
          response.json().then(data => {
            // Lista creada
            console.log("Cris valores devueltos nueva lista = ", data);
            window.idLista = data.idLista;
            
          }).catch(error => {
            console.error('Error al analizar la respuesta JSON:', error);
          })
        }else{
          toast.error("Ha habido un error")
        }
      }).catch(error => toast.error(error.message))
    } else if (window.origenPasoListaRepACanciones === constListaExistente) {
      // la lista ya existe, solo hay que coger sus canciones
      fetch(ipBackend + "GetAudiosLista/", {
        method : "POST",
        body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idLista": window.idLista})
      }).then(response =>{
        if(response.ok){
          response.json().then(datos => {
            // obtener los datos de la lista
            this.setState({numCanciones: datos.audio.length});
            console.log("Cris valores devueltos lista antigua = ", this.state.numCanciones);
            window.cancionesLista.push(datos.audio); // no va a funcionar, es solamente para que compile
            // hay que sacar el numero de canciones de la lista
          }).catch(error => {
            console.error('Error al analizar la respuesta JSON:', error);
          })
        }else{
          toast.error("Ha habido un error")
        }
      }).catch(error => toast.error(error.message))
      window.origenPasoListaRepACanciones = "";
    }
  }

  handleSortChange = (value) => {
    this.setState({ sortKey: value });
  };

  sortSongs = () => {

    if (this.state.sortKey === "tematica"){
      window.cancionesLista = [...window.cancionesLista.sort((a, b) => a.tematica.localeCompare(b.tematica))];
    } else if (this.state.sortKey === "titulo") {
      window.cancionesLista = [...window.cancionesLista.sort((a, b) => a.titulo.localeCompare(b.titulo))];
    } else if (this.state.sortKey === "artista") {
      window.cancionesLista = [...window.cancionesLista.sort((a, b) => a.artista.localeCompare(b.artista))];
    } else if (this.state.sortKey === "idioma") {
      window.cancionesLista = [...window.cancionesLista.sort((a, b) => a.idioma.localeCompare(b.idioma))];
    }
  };

  render(){
    return (
      <>
        <header class="bg-blue_7th py-5" >
          <div class="container px-5" style={{"margin-top" : "3rem"}}>
            <div class="row gx-5 justify-content-center">
              <div class="col-lg-6">
                <div class="text-center my-5">
                  <FormularioRenombre
                    nombre={window.nombreNuevaListaReproduccion}
                  />
                </div>
                <div class="text-center my-5" style={{"margin-bottom": "20px"}}>
                  <ButtonOnClick onClick={misListasDeReproduccion} id="" text="Volver atrás"/>
                  <ButtonOnClick onClick={anyadirCancionListaRep} id="" text="Añadir canciones"/>
                  {(this.state.numCanciones !== 0 &&
                    <ShuffleButtonNoTransition class="rhap_repeat-button rhap_button-clear" onClick={reproduccionAleatoria}/>
                  )}
                  
                </div>
                <div class="text-center my-5" style={{"margin-bottom": "20px"}}>
                {this.state.numCanciones === 0 ? (
                  <p className="display-6 fw-bolder text-white mb-2">Esta lista no contiene ninguna canción</p>
                ) : (
                  <>
                    <PlaylistSortSelector onChange={this.handleSortChange}/>
                    {window.cancionesLista.map((lista) => (<CardNameListaSong var={lista.id} text={lista.nombre}/>))}
                  </>
                )}
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }
}

class CardNameListaSong extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="justify-content-center" style={{display: 'flex', alignItems: 'center' }}>
        <p className="display-6 fw-bolder text-white mb-2">{this.props.text}</p>
        <UpArrowNoTransition/>
        <DownArrowNoTransition/>
        <PlayNoTransition/>
      </div>
    )
  }
}

const PlaylistSortSelector = ({ onChange }) => {
  return (
    <select onChange={onChange}>
      <option value="tematica">Temática</option>
      <option value="titulo">Título</option>
      <option value="artista">Artista</option>
      <option value="idioma">Idioma</option>
    </select>
  );
};

function FormularioRenombre({ nombre }) {
  const [nombreEditando, setNombreEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(nombre);

  function handleNombreCambiado(e) {
    e.preventDefault();
    window.nombreNuevaListaReproduccion = nuevoNombre;
    setNombreEditando(false);
    fetch(ipBackend + "SetNombreListaRep/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idLista": window.idLista, "nombreLista": window.nombreNuevaListaReproduccion, "privada": "privada"})
    }).then(function(response){
      if(response.ok){
        response.json().then(function(data){
          
        }).catch(function(error){
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("Ha habido un error")
      }
    }).catch(error => toast.error(error.message))
    return (
      root.render(<PlayListContenido/>)
    )
  }

  return (
    <div>
      {nombreEditando ? (
        <form onSubmit={handleNombreCambiado}>
          <input
            class="display-6 fw-normal text-black mb-2 justify-content-center"
            style={{"padding-bottom" : "1rem"}}
            type="text"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
          <ButtonType style={{"padding-bottom" : "1rem"}} type="submit" id="" text="Cambiar el nombre"/>
        </form>
      ) : (
        <div>
          <h1 class="display-5 fw-bolder text-white mb-2" style={{"padding-bottom" : "1rem"}} onClick={() => setNombreEditando(true)}>{nombre}</h1>
        </div>
      )}
    </div>
  );
}


class AnyadirCancionListaReproduccion extends React.Component{

  constructor(props) {
    super(props);
    this.state = {listas: "", nombreLista: ""};
  }

  componentDidMount() {
    fetch(ipBackend + "GlobalSearch/", {
      method : "GET",
      body : JSON.stringify({"query" : "", "n" : 10})
    }).then(function(response){
      if(response.ok){
        response.json().then(function(data){
          this.state.listas = data.listas;
          console.log("Cris: resultado busqueda: ", data);
        }).catch(function(error){
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("El usuario o la contraseña son incorrectos")
      }
    }).catch(error => toast.error(error.message))
  }

  // cuando la busqueda este hecha, usar esto CardNameAddSong para mostrar el nombre y un icono de añadir.
  // ejemplo exitoso de uso con CardNamePlaylist
  render(){
    return (
      <>
        <header class="bg-blue_7th py-5" >
          <div class="container px-5" style={{"margin-top" : "3rem"}}>
            <div class="row gx-5 justify-content-center">
              <div class="col-lg-6">
                <div class="text-center my-5">
                  <h1 class="display-5 fw-bolder text-white mb-2" style={{"padding-bottom" : "1rem"}}>Añadir canciones</h1>
                </div>
                <div class="form-floating mb-3">
                <input class="form-control" id="busqueda-anyadir" type="text" placeholder="Cancion X"/>
                <label for="busqueda">Buscar  &#128269;</label>
              </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }
}


// hay que pasarle un text que es el nombre de la canción
// y también el id de la canción con "idAudio"
class CardNameAddSong extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="justify-content-center" style={{display: 'flex', alignItems: 'center' }}>
        <p className="display-6 fw-bolder text-white mb-2">{this.props.text}</p>
        <AddNoTransition onClick={meterCancionEnListaRep(this.props.idAudio)}/>
      </div>
    )
  }
}

function FormularioRenombreGlobal({ nombre }) {
  const [nombreEditando, setNombreEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(nombre);

  function handleNombreCambiado(e) {
    e.preventDefault();
    window.nombreNuevaListaReproduccion = nuevoNombre;
    setNombreEditando(false);
    fetch(ipBackend + "SetNombreListaRep/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idLista": window.idLista, "nombreLista": window.nombreNuevaListaReproduccion, "privada": "privada"})
    }).then(function(response){
      if(response.ok){
        response.json().then(function(data){
          
        }).catch(function(error){
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("Ha habido un error")
      }
    }).catch(error => toast.error(error.message))
    return (
      root.render(<PlayListContenido/>)
    )
  }

  return (
    <div>
      {nombreEditando ? (
        <form onSubmit={handleNombreCambiado}>
          <input
            class="display-6 fw-normal text-black mb-2 justify-content-center"
            style={{"padding-bottom" : "1rem"}}
            type="text"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
          <ButtonType style={{"padding-bottom" : "1rem"}} type="submit" id="" text="Cambiar el nombre"/>
        </form>
      ) : (
        <div>
          <h1 class="display-5 fw-bolder text-white mb-2" style={{"padding-bottom" : "1rem"}} onClick={() => setNombreEditando(true)}>{nombre}</h1>
        </div>
      )}
    </div>
  );
}

class ListasGlobales extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      listasReproduccion: []
    };
  }

  componentDidMount() {
    fetch(ipBackend + "GetListasUsr/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd})
    }).then(response => {
      if(response.ok){
        response.json().then((data) =>{
          if (data.listas.length > 0){
            data.listas.forEach((lista) => {
              fetch(ipBackend + "GetLista/", {
                method : "POST",
                body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idLista" : lista})
              }).then((response) => {
                  if(response.ok){
                    response.json().then((datos) => {
                      if (datos.lista.tipoLista === tipoListaReproduccion){
                        this.setState({ listasReproduccion: [...this.state.listasReproduccion, datos.lista.nombreLista] });
                        this.setState({ idLista: [...this.state.idLista, lista] });
                      }
                    })
                  } else{
                    toast.warning("No se ha podido recuperar la información de tus listas de reproduccion")
                  }
                }).catch(error => toast.error(error.message))
            })
          }
        }).catch((error) => {
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("El usuario o la contraseña son incorrectos")
      }
    }).catch(error => toast.error(error.message))
  }
  
  render(){
    return (
      <>
        <div className="bg-blue_7th" >
          <div className="text-center my-5 justify-content-center row gx-5">
            <h1 className="display-5 fw-bolder text-white mb-2">Listas de reproducción globales</h1>
          </div>
          <div className="text-center my-5 justify-content-center row gx-5">
            <div className="d-flex justify-content-center">
              <ButtonOnClick onClick={menuPrincipal} id="" text="Volver al menú"/>
              <ButtonOnClick onClick={nuevaListaGlobal} id="" text="Crear lista global"/>
            </div>
          </div>
          <div className="text-center my-5 justify-content-center row gx-5" style={{display: 'flex', alignItems: 'center' }}>
            {(this.state.listasReproduccion.length === 0) ? (
              <p className="display-6 fw-bolder text-white mb-2">No se han creado listas de reproduccion globales</p>
            ) : (
                this.state.listasReproduccion.map((nombre, index) => <CardNamePlaylist key={index} text={nombre}/>)
            )}
          </div>
        </div>
      </>
    )
  }
}

// TODO:comprobar que al mandar la nueva lista global es pública
class CrearListaGlobal extends React.Component{

  constructor(props) {
    super(props);
    window.cancionesLista = [];
    this.state = {
      sortKey: 'tematica'
    };
  }

  componentDidMount() {
    fetch(ipBackend + "SetLista/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "tipoLista": tipoListaReproduccion, "nombreLista": window.nombreNuevaListaReproduccion, "publica": "TRUE"})
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          // Lista creada
          // modificar la llamada con los parametros adecuados, esto es solo para que compile
          fetch(ipBackend + "GetLista/", {
            method : "POST",
            body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "tipoLista": tipoListaReproduccion, "nombreLista": window.nombreNuevaListaReproduccion, "publica": "TRUE"})
          }).then(response =>{
            if(response.ok){
              response.json().then(datos => {
                // obtener los datos de la lista
                window.cancionesLista.push(datos.canciones); // no va a funcionar, es solamente para que compile
              }).catch(error => {
                console.error('Error al analizar la respuesta JSON:', error);
              })
            }else{
              toast.error("Ha habido un error, la respuesta de GetLista no es ok")
            }
          }).catch(error => toast.error(error.message))
        }).catch(function(error){
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("Ha habido un error, la respuesta de SetLista no es ok")
      }
    }).catch(error => toast.error(error.message))
  }

  handleSortChange = (value) => {
    this.setState({ sortKey: value });
  };

  sortSongs = () => {

    if (this.state.sortKey === "tematica"){
      window.cancionesLista = [...window.cancionesLista.sort((a, b) => a.tematica.localeCompare(b.tematica))];
    } else if (this.state.sortKey === "titulo") {
      window.cancionesLista = [...window.cancionesLista.sort((a, b) => a.titulo.localeCompare(b.titulo))];
    } else if (this.state.sortKey === "artista") {
      window.cancionesLista = [...window.cancionesLista.sort((a, b) => a.artista.localeCompare(b.artista))];
    } else if (this.state.sortKey === "idioma") {
      window.cancionesLista = [...window.cancionesLista.sort((a, b) => a.idioma.localeCompare(b.idioma))];
    }
  };

  render(){
    return (
      <>
        <header class="bg-blue_7th py-5" >
          <div class="container px-5" style={{"margin-top" : "3rem"}}>
            <div class="row gx-5 justify-content-center">
              <div class="col-lg-6">
                <div class="text-center my-5">
                  <FormularioRenombreGlobal
                    nombre={window.nombreNuevaListaGlobal}
                  />
                </div>
                <div class="text-center my-5" style={{"margin-bottom": "20px"}}>
                  <ButtonOnClick onClick={listaGlobal} id="" text="Volver atrás"/>
                  <ButtonOnClick onClick={anyadirCancionListaRep} id="" text="Añadir canciones"/>
                </div>
                <div class="text-center my-5" style={{"margin-bottom": "20px"}}>
                  <PlaylistSortSelector onChange={this.handleSortChange} />
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }
}

function meterCancionEnListaRep(idAudio){

  fetch(ipBackend + "SetSongLista/", {
            method : "POST",
            body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idLista": window.idLista, "idAudio": idAudio})
          }).then(response =>{
            if(response.ok){
              response.json().then(datos => {
                // obtener los datos de la lista
                window.cancionesLista.push(datos.canciones); // no va a funcionar, es solamente para que compile
              }).catch(error => {
                console.error('Error al analizar la respuesta JSON:', error);
              })
            }else{
              toast.error("Ha habido un error, la respuesta de GetLista no es ok")
            }
          }).catch(error => toast.error(error.message))
  
  contenidoListaDeReproduccion();
}

class Carpetas extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      carpetas: []
    };
    window.idsLista = [];
  }

  componentDidMount() {
    fetch(ipBackend + "GetFoldersUsr/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "idUsrGet" : window.idUsuario, "contrasenya" : window.passwd})
    }).then(response => {
      if(response.ok){
        response.json().then((data) =>{
          if (data.idCarpeta.length > 0){
            data.idCarpeta.forEach((carpeta) => {
              fetch(ipBackend + "GetFolder/", {
                method : "POST",
                body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idCarpeta" : carpeta})
              }).then((response) => {
                  if(response.ok){
                    response.json().then((datos) => {
                      const carpetaCustom = {
                        id: carpeta,
                        nombre: datos.nombreCarpeta
                      };
                      this.setState({ carpetas: [...this.state.carpetas, carpetaCustom] });
                    })
                  } else{
                    toast.warning("No se ha podido recuperar la información de tus carpetas")
                  }
                }).catch(error => toast.error(error.message))
            })
          }
        }).catch((error) => {
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("El usuario o la contraseña son incorrectos")
      }
    }).catch(error => toast.error(error.message))
  }
  
  render(){
    return (
      <>
        <div className="bg-blue_7th" >
          <div className="text-center my-5 justify-content-center row gx-5">
            <h1 className="display-5 fw-bolder text-white mb-2">Mis carpetas</h1>
          </div>
          <div className="text-center my-5 justify-content-center row gx-5">
            <div className="d-flex justify-content-center">
              <ButtonOnClick onClick={menuPrincipal} id="" text="Volver al menú"/>
              <ButtonOnClick onClick={nuevaCarpeta} id="" text="Crear nueva carpeta"/>
            </div>
          </div>
          <div className="text-center my-5 justify-content-center row gx-5" style={{display: 'flex', alignItems: 'center' }}>
            {(this.state.carpetas.length === 0) ? (
              <p className="display-6 fw-bolder text-white mb-2">No tienes carpetas</p>
            ) : (
                this.state.carpetas.map((lista) => <CardNameFolder var={lista.id} text={lista.nombre}/>)
            )}
          </div>
        </div>
      </>
    )
  }
}

class CardNameFolder extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="justify-content-center" style={{display: 'flex', alignItems: 'center' }}>
        <p className="display-6 fw-bolder text-white mb-2">{this.props.text}</p>
        <RightArrowNoTransitionCarpeta var={this.props.var} text={this.props.text}/>
      </div>
    )
  }
}

// Cris TODO: CUANDO LA LISTA SE CREA NUEVA, FALTA COMO CONSEGUIR EL ID (BACK)
class NuevaCarpetaContenido extends React.Component{

  constructor(props) {
    super(props);
    window.listasCarpeta = [];
    this.state = {
      sortKey: 'tematica',
      numListas: 0
    };
  }

  componentDidMount() {
    if (window.origenPasoCarpetaALista === constCarpetaNueva) {
      // hay que crear la nueva lista
      fetch(ipBackend + "SetFolder/", {
        method : "POST",
        body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "nombreCarpeta": window.nombreNuevaCarpeta, "privacidadCarpeta": "privada"})
      }).then(response => {
        if(response.ok){
          response.json().then(data => {
            // Carpeta creada
            console.log("Cris valores devueltos nueva carpeta = ", data);
            //window.idCarpeta = data.idLista;
            
          }).catch(error => {
            console.error('Error al analizar la respuesta JSON:', error);
          })
        }else{
          toast.error("Ha habido un error")
        }
      }).catch(error => toast.error(error.message))
    } else if (window.origenPasoCarpetaALista === constCarpetaExistente) {
      fetch(ipBackend + "GetListasFolder/", {
        method : "POST",
        body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idCarpeta" : window.idCarpeta})
      }).then(response =>{
        if(response.ok){
          console.log("Cris respuesta GetListasFolder: ", response.json());
          response.json().then(datos => {
            // obtener los datos de la lista
            this.setState({numListas: datos.audio.length});
            console.log("Cris valores devueltos lista antigua = ", this.state.numListas);
            window.listasCarpeta.push(datos.audio); // no va a funcionar, es solamente para que compile
            // hay que sacar el numero de canciones de la lista
          }).catch(error => {
            console.error('Error al analizar la respuesta JSON:', error);
          })
        }else{
          toast.error("Ha habido un error")
        }
      }).catch(error => toast.error(error.message))
      window.origenPasoCarpetaALista = "";
    }
  }

  handleSortChange = (value) => {
    this.setState({ sortKey: value });
  };

  sortSongs = () => {

    if (this.state.sortKey === "tematica"){
      window.listasCarpeta = [...window.listasCarpeta.sort((a, b) => a.tematica.localeCompare(b.tematica))];
    } else if (this.state.sortKey === "titulo") {
      window.listasCarpeta = [...window.listasCarpeta.sort((a, b) => a.titulo.localeCompare(b.titulo))];
    } else if (this.state.sortKey === "artista") {
      window.listasCarpeta = [...window.listasCarpeta.sort((a, b) => a.artista.localeCompare(b.artista))];
    } else if (this.state.sortKey === "idioma") {
      window.listasCarpeta = [...window.listasCarpeta.sort((a, b) => a.idioma.localeCompare(b.idioma))];
    }
  };

  render(){
    return (
      <>
        <header class="bg-blue_7th py-5" >
          <div class="container px-5" style={{"margin-top" : "3rem"}}>
            <div class="row gx-5 justify-content-center">
              <div class="col-lg-6">
                <div class="text-center my-5">
                  <FormularioRenombreCarpeta
                    nombre={window.nombreNuevaCarpeta}
                  />
                </div>
                <div class="text-center my-5" style={{"margin-bottom": "20px"}}>
                  <ButtonOnClick onClick={misCarpetas} id="" text="Volver atrás"/>
                  <ButtonOnClick onClick={anyadirListaCarpeta} id="" text="Añadir listas de reproducción"/>
                  
                </div>
                <div class="text-center my-5" style={{"margin-bottom": "20px"}}>
                {this.state.numListas === 0 ? (
                  <p className="display-6 fw-bolder text-white mb-2">Esta carpeta no contiene ninguna lista</p>
                ) : (
                  <>
                    <FolderSortSelector onChange={this.handleSortChange}/>
                    {window.listasCarpeta.map((lista) => (<CardNameCarpetaLista var={lista.id} text={lista.nombre}/>))}
                  </>
                )}
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }
}

class CardNameCarpetaLista extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="justify-content-center" style={{display: 'flex', alignItems: 'center' }}>
        <p className="display-6 fw-bolder text-white mb-2">{this.props.text}</p>
        <UpArrowNoTransition/>
        <DownArrowNoTransition/>
        <PlayNoTransition/>
      </div>
    )
  }
}

const FolderSortSelector = ({ onChange }) => {
  return (
    <select onChange={onChange}>
      <option value="tematica">Temática</option>
      <option value="titulo">Título</option>
      <option value="artista">Artista</option>
      <option value="idioma">Idioma</option>
    </select>
  );
};

function FormularioRenombreCarpeta({ nombre }) {
  const [nombreEditando, setNombreEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(nombre);

  function handleNombreCambiado(e) {
    e.preventDefault();
    window.nombreNuevaCarpeta = nuevoNombre;
    setNombreEditando(false);
    // Cris TODO adaptar esta llamada
    fetch(ipBackend + "SetNombreListaRep/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idLista": window.idLista, "nombreLista": window.nombreNuevaListaReproduccion, "privada": "privada"})
    }).then(function(response){
      if(response.ok){
        response.json().then(function(data){
          
        }).catch(function(error){
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("Ha habido un error")
      }
    }).catch(error => toast.error(error.message))
    return (
      root.render(<PlayListContenido/>)
    )
  }

  return (
    <div>
      {nombreEditando ? (
        <form onSubmit={handleNombreCambiado}>
          <input
            class="display-6 fw-normal text-black mb-2 justify-content-center"
            style={{"padding-bottom" : "1rem"}}
            type="text"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
          <ButtonType style={{"padding-bottom" : "1rem"}} type="submit" id="" text="Cambiar el nombre"/>
        </form>
      ) : (
        <div>
          <h1 class="display-5 fw-bolder text-white mb-2" style={{"padding-bottom" : "1rem"}} onClick={() => setNombreEditando(true)}>{nombre}</h1>
        </div>
      )}
    </div>
  );
}

class AnyadirListaReproduccionCarpeta extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      listasReproduccion: []
    };
    window.idsLista = [];
  }

  componentDidMount() {
    // Cris TODO esta función no furula en el backend
    fetch(ipBackend + "GetListasUsr/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "idUsrGet" : window.idUsuario, "contrasenya" : window.passwd})
    }).then(response => {
      if(response.ok){
        response.json().then((data) =>{
          if (data.listas.length > 0){
            data.listas.forEach((lista) => {
              fetch(ipBackend + "GetLista/", {
                method : "POST",
                body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idLista" : lista})
              }).then((response) => {
                  if(response.ok){
                    response.json().then((datos) => {
                      if (datos.lista.tipoLista === tipoListaReproduccion){
                        const listaCustom = {
                          id: lista,
                          nombre: datos.lista.nombreLista
                        };
                        this.setState({ listasReproduccion: [...this.state.listasReproduccion, listaCustom] });
                      }
                    })
                  } else{
                    toast.warning("No se ha podido recuperar la información de tus listas de reproduccion")
                  }
                }).catch(error => toast.error(error.message))
            })
          }
        }).catch((error) => {
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("El usuario o la contraseña son incorrectos")
      }
    }).catch(error => toast.error(error.message))
  }
  
  render(){
    return (
      <>
        <div className="bg-blue_7th" >
          <div className="text-center my-5 justify-content-center row gx-5">
            <h1 className="display-5 fw-bolder text-white mb-2">Mis listas de reproducción</h1>
          </div>
          <div className="text-center my-5 justify-content-center row gx-5">
            <div className="d-flex justify-content-center">
              <ButtonOnClick onClick={contenidoCarpeta} id="" text="Volver a mi carpeta"/>
            </div>
          </div>
          <div className="text-center my-5 justify-content-center row gx-5" style={{display: 'flex', alignItems: 'center' }}>
            {(this.state.listasReproduccion.length === 0) ? (
              <p className="display-6 fw-bolder text-white mb-2">No tienes listas de reproducción</p>
            ) : (
                this.state.listasReproduccion.map((lista) => <CardNameFolderPlaylist idLista={lista.id} text={lista.nombre}/>)
            )}
          </div>
        </div>
      </>
    )
  }
}

class CardNameFolderPlaylist extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="justify-content-center" style={{display: 'flex', alignItems: 'center' }}>
        <p className="display-6 fw-bolder text-white mb-2">{this.props.text}</p>
        <AddNoTransitionCarpeta idLista={this.props.idLista}/>
      </div>
    )
  }
}

class ListasFavoritos extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      listasReproduccion: []
    };
    window.idsLista = [];
  }

  componentDidMount() {
    fetch(ipBackend + "GetListasUsr/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "idUsrGet" : window.idUsuario, "contrasenya" : window.passwd})
    }).then(response => {
      if(response.ok){
        response.json().then((data) =>{
          console.log("Cris respuesta: ", data)
          if (data.listas.length > 0){
            data.listas.forEach((lista) => {
              fetch(ipBackend + "GetLista/", {
                method : "POST",
                body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idLista" : lista})
              }).then((response) => {
                  if(response.ok){
                    response.json().then((datos) => {
                      if (datos.lista.tipoLista === tipoListaFavoritos){
                        const listaCustom = {
                          id: lista,
                          nombre: datos.lista.nombreLista
                        };
                        this.setState({ listasReproduccion: [...this.state.listasReproduccion, listaCustom] });
                        // Cris TODO buscar función que te de las canciones que hay en la lista
                      }
                    })
                  } else{
                    toast.warning("No se ha podido recuperar la información de tus listas de reproduccion")
                  }
                }).catch(error => toast.error(error.message))
            })
          }
        }).catch((error) => {
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("El usuario o la contraseña son incorrectos")
      }
    }).catch(error => toast.error(error.message))
  }
  
  render(){
    return (
      <>
        <div className="bg-blue_7th" >
          <div className="text-center my-5 justify-content-center row gx-5">
            <h1 className="display-5 fw-bolder text-white mb-2">Mis audios favoritos</h1>
          </div>
          <div className="text-center my-5 justify-content-center row gx-5">
            <div className="d-flex justify-content-center">
              <ButtonOnClick onClick={menuPrincipal} id="" text="Volver al menú"/>
              <ButtonOnClick onClick={nuevaListaDeReproduccion} id="" text="Crear nueva lista"/>
            </div>
          </div>
          <div className="text-center my-5 justify-content-center row gx-5" style={{display: 'flex', alignItems: 'center' }}>
            {(this.state.listasReproduccion.length === 0) ? (
              <p className="display-6 fw-bolder text-white mb-2">No tienes listas de reproducción</p>
            ) : (
                this.state.listasReproduccion.map((lista) => <CardNamePlaylist var={lista.id} text={lista.nombre}/>)
            )}
          </div>
        </div>
      </>
    )
  }
}

class CancionesArtista extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: new Set()
    };
  }

  componentDidMount() {
    fetch(ipBackend + "GetSongsArtist/", {
      method: "POST",
      body: JSON.stringify({ "idUsr": window.idUsuario })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error al obtener las canciones");
      })
      .then(data => {
        const newSongs = new Set(data.canciones);
        this.setState({ songs: newSongs });
      })
      .catch(error => toast.error(error.message));
  }

  render() {
    return (
      <div className="text-center">
        <h1 className="CancionesArtista text-tuPerfil-50 mb-3">
          Canciones publicadas
        </h1>
        <div>
          {Array.from(this.state.songs).map(song => (
            <p key={song}>{song}</p>
          ))}
           <div>
        </div>
        </div>
      </div>
    );
  }
}

class MinutajeSemanal extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      segundosReproducidos: 0
    };
  }

  componentDidMount() {
    fetch(ipBackend + "GetTotRepTime(String idUsr, String contrasenya/", {
      method: "POST",
      body: JSON.stringify({ "idUsr": window.idUsuario, "contrasenya": window.passwd })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error al obtener el minutaje semanal");
    })
    .then(data => {
      const segundosReproducidos = new Set(data.segs); //TODO: ver como se llama el resultado en el backend
      this.setState({ segundosReproducidos: segundosReproducidos});
    })
    .catch(error => toast.error(error.message));
  }

  render(){
    const diaDeLaSemana = moment().locale('es').format('dddd');
    const { segundosReproducidos } = this.state;

    return(
      <div className="bg-blue_7th" >
        <div className="text-center my-5 justify-content-center row gx-5">
          <h1 className="display-5 fw-bolder text-white mb-2">Estadísticas de reproducciones globales</h1>
        </div>
        <div className="text-center my-5 justify-content-center row gx-5">
          <h1 className="titulo-formArtista titulo-formArtista-lg mb-3 text-white">Hoy es {diaDeLaSemana}</h1>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white">Se han reproducido {segundosReproducidos} segundos de audio</p>
        </div>
        <div class="text-center my-5">
          <ButtonOnClick onClick={historicoEstadistico} id="" text="Ver historico semanal"/>
        </div>
      </div>
    );
  }
}

// TODO: ver como obtener del backend el historico semanal para cada día de la semana que se guarda
class HistoricoSemanal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      segundosReproducidos1: 0, // Día actual
      segundosReproducidos2: 10, // Día anterior
      segundosReproducidos3: 20, 
      segundosReproducidos4: 30,
      segundosReproducidos5: 40,
      segundosReproducidos6: 50,
      segundosReproducidos7: 60, // Hace una semana, último día del historico
    };
  }

  componentDidMount() {
    fetch(ipBackend + "GetTotRepTime/", {
      method: "POST",
      body: JSON.stringify({ "idUsr": window.idUsuario, "contrasenya": window.passwd })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error al obtener el minutaje semanal");
    })
    .then(data => {
      const segundosReproducidos1 = new Set(data.segs); //TODO: ver como se llama el resultado en el backend
      this.setState({ segundosReproducidos1: segundosReproducidos1});
    })
    .catch(error => toast.error(error.message));
  }
  
  render(){
    const diaDeLaSemana1 = moment().locale('es').format('dddd');
    const diaDeLaSemana2 = moment().locale('es').subtract(1, 'days').format('dddd');
    const diaDeLaSemana3 = moment().locale('es').subtract(2, 'days').format('dddd');
    const diaDeLaSemana4 = moment().locale('es').subtract(3, 'days').format('dddd');
    const diaDeLaSemana5 = moment().locale('es').subtract(4, 'days').format('dddd');
    const diaDeLaSemana6 = moment().locale('es').subtract(5, 'days').format('dddd');
    const diaDeLaSemana7 = moment().locale('es').subtract(6, 'days').format('dddd');

    const { segundosReproducidos1 } = this.state;
    const { segundosReproducidos2 } = this.state;
    const { segundosReproducidos3 } = this.state;
    const { segundosReproducidos4 } = this.state;
    const { segundosReproducidos5 } = this.state;
    const { segundosReproducidos6 } = this.state;
    const { segundosReproducidos7 } = this.state;

    return(
      <div className="bg-blue_7th" >
        <div className="text-center my-5 justify-content-center row gx-5">
          <h1 className="display-5 fw-bolder text-white mb-2">Estadísticas de reproducciones globales</h1>
        </div>
        <div className="text-center my-5 justify-content-center row gx-5">
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">Hasta ahora se han reproducido{' '} 
                      {segundosReproducidos1} segundos de audio el {diaDeLaSemana1}</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white">Se han reproducido {segundosReproducidos2} segundos de audio el {diaDeLaSemana2}</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white">Se han reproducido {segundosReproducidos3} segundos de audio el {diaDeLaSemana3}</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white">Se han reproducido {segundosReproducidos4} segundos de audio el {diaDeLaSemana4}</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white">Se han reproducido {segundosReproducidos5} segundos de audio el {diaDeLaSemana5}</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white">Se han reproducido {segundosReproducidos6} segundos de audio el {diaDeLaSemana6}</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white">Se han reproducido {segundosReproducidos7} segundos de audio el {diaDeLaSemana7}</p>
        </div>
      </div>
    );
  }
}

class UsuarioExtra extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      esArtista: true, // Si el artista es falso se puede mandar solicitud de amistad
                        // Si el artista es true se puede suscribir el usuario a su perfil
    };
  }

  componentDidMount() {
    this.mostrarBotones();
    this.obtenerNombre();
  }

  obtenerNombre() {
    fetch(ipBackend + "GetUser/", {
      method: "POST",
      body: JSON.stringify({ idUsr: window.idUsuario }), // TODO: se debe enviar el usuario devuelto por la búsqueda y clicado
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            name: result.name,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  mostrarBotones() {
    fetch(ipBackend + "GetUser/", {
      method: "POST",
      body: JSON.stringify({ idUsr: window.idUsuario, passwd: window.password }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            esArtista: true/*result.esArtista*/,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <header
        class="bg-blue_7th py-5"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-4">
              <div class="card-body p-5">
                <div class="list-unstyled mb-4">
                  <li class="mb-2">
                    <img
                      src="assets/boy_listening_music.jpg"
                      width="100%"
                      style={{ borderRadius: "50%" }}
                    />
                  </li>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4 mb-md-0">
              <div class="d-flex align-items-right justify-content-end mb-3">
              </div>
              <div class="text-center">
                <p class="display-5 fw-bolder text-white mb-4 ">
                  {/*{this.state.name}*/}
                  Juan
                </p>
                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center" />
                <div class="row justify-content-center align-items-center mb-4"></div>
                <div class="row justify-content-center align-items-center mb-4">
                  {this.state.esArtista === true && (
                    <div>
                      <p className="cuerpo-formArtista fw-bolder subtitulo-formArtista subtitulo-formArtista-md mb-4 text-white">
                        ¿Te gusta la música de este artista? ¡Suscríbete!
                      </p>
                      <ButtonOnClick
                      onClick={suscribirse}
                      id=""
                      text="Suscribirse"
                      />
                    </div>
                  )}
                  {this.state.esArtista === false && (
                    <div>
                      <p className="cuerpo-formArtista fw-bolder subtitulo-formArtista subtitulo-formArtista-md mb-4 text-white">
                        ¿Conoces a este usuario? ¡Envíale una solicitud de amistad y comparte tu música!
                      </p>
                      <ButtonOnClick
                      onClick={enviar_solicitud_amistad}
                      id=""
                      text="Enviar solicitud de amistad"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
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
    body : JSON.stringify({"email" : email, "contrasenya" : contra, "tipoUsuario" : "normalUser", "alias" : usuario})
  }).then(function(response){
    console.log(response)
    if(response.ok){
      response.json().then(function(data){
        window.idUsuario = data.idUsr;
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
        window.idUsuario = data.idUsr;
        window.passwd = contra;
        return menuPrincipal();
      }).catch(function(error){
        console.error('Error al analizar la respuesta JSON:', error);
      })
    }else{
      toast.error("El usuario o la contraseña son incorrectos")
    }
  }).catch(error => toast.error(error.message))
}

function enviar_cambio_contra(e){
  e.preventDefault();

  let code = (document.getElementById("codigo")).value
  let contra = (document.getElementById("passwd")).value
  let contra2 = (document.getElementById("passwd2")).value
  
  let textBox = document.getElementById("error_input")

  if (code === "" || contra === "" || contra2 === ""){
      toast.warning("Complete todos los campos para iniciar sesión");
      
      return false;
  }

  if (contra !== contra2){
    toast.warning("Las contraseñas no coinciden");
  }

  fetch(ipBackend + "SetContrasenyaUsr/", {
    method : "POST",
    body : JSON.stringify({"email" : window.email, "contrasenya" : contra, "codigo" : code})
  }).then(function(response){
    if(response.ok){
      response.json().then(function(data){
        return menuPrincipal();
      }).catch(function(error){
        console.error('Error al analizar la respuesta JSON:', error);
      })
    }else{
      toast.error("El código es incorrecto")
    }
  }).catch(error => toast.error(error.message))
}

function editar_foto_perfil (){
  // TODO
  toast.error("Funcionalidad no implementada");
}

function enviar_peticion_artista(){
  fetch(ipBackend + "AskAdminToBeArtist/", {
    method : "POST",
    body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.password})
  }).then(function(response){
    console.log(response)
    if(response.ok){
      response.json().then(function(data){
        window.idUsuario = data.idUsr;
        //window.passwd = contra
        return menuPrincipal();
      }).catch(function(error){
        console.error('Error al analizar la respuesta JSON:', error);
      })
    }
  })
  .catch(error => toast.error(error.message))

}

function enviar_contenido_artista(){
  fetch(ipBackend + "SetSong/", {
    method : "POST",
    // Se deberá pasar como último dato de la petición un struct con los datos del audio
    body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.password, "song" : window.idUsuario})
  }).then(function(response){
    console.log(response)
    if(response.ok){
      response.json().then(function(data){
        window.idUsuario = data.idUsr;
        //window.passwd = contra
        return perfil();
      }).catch(function(error){
        console.error('Error al analizar la respuesta JSON:', error);
      })
    }
  })
  .catch(error => toast.error(error.message))

  let ficheroAudio = document.getElementById("fichero_audio");
  DjangoAPI.setSong(window.idUsr, window.contrasenya, ficheroAudio);
}

function suscribirse(){
  fetch(ipBackend + "SubscribeToArtist/", {
    method: "POST",
    body: JSON.stringify({ // TODO: conseguir el id del usuario al que nos queremos suscribir, desde la pantalla de búsqueda seguramente
      "idUsr": window.idUsuario, "contrasenya": window.passwd, "idUsrArtista": "idArtista"
    })
  }).then(response => {
    if (response.ok) {
      response.json().then(data => {
        // Mostrar mensaje de éxito
        if (data === 1) {
          toast.success("Te has suscrito al artista con éxito");
        }
      }).catch(error => {
        console.error('Error al analizar la respuesta JSON:', error);
      })
    } else {
      toast.error("Ha habido un error");
    }
  }).catch(error => toast.error(error.message))
}

function enviar_solicitud_amistad(){
  fetch(ipBackend + "AskFriend/", {
    method: "POST",
    body: JSON.stringify({ // TODO: conseguir el id del usuario al que se le quiere enviar la solicitud, del que estamos viendo el perfil
      "idUsr": window.idUsuario, "contrasenya": window.passwd, "idAmigo": "idAmigo"
    })
  }).then(response => {
    if (response.ok) {
      response.json().then(data => {
        // Mostrar mensaje de éxito
        if (data === 1) {
          toast.success("Solicitud de amistad enviada con éxito");
        } else {
          toast.info("Ya has enviado una solicitud de amistad a este usuario");
        }
      }).catch(error => {
        console.error('Error al analizar la respuesta JSON:', error);
      })
    } else {
      toast.error("Ha habido un error");
    }
  }).catch(error => toast.error(error.message))
}

function ultimo_punto_de_escucha(){

  //TODO: Comprobar que haya un ultimo punto de escucha
  return(
    <ButtonGroup>
          <Button id="" text="Última escucha"/>
    </ButtonGroup>
  )
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

function RecoveryMail(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacion/>
      <EnviarCorreoRecuperacion/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function ChangePassword(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacion/>
      <FormularioCambiarContrasena/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
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

function DailyTop(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <ListaTopDiario/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
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

function BecomeArtist(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <FormularioArtista/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function UploadSong(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
    <BarraNavegacionApp/>
    <NuevaCancion/>
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

function CarpetaContenido(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <NuevaCarpetaContenido/>
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

function AnyadirListaCarpeta(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <AnyadirListaReproduccionCarpeta/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function GlobalPlayList(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <ListasGlobales/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function NewGlobalPlaylist(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <CrearListaGlobal/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function Folders(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <Carpetas/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function Favs(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <ListasFavoritos/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function MySongs(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <CancionesArtista/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function Statistics(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <MinutajeSemanal/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function StatisticHistory(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <HistoricoSemanal/>
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

function ProfileOtherUser(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <UsuarioExtra/>
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

function correoRecuperacion(){
  root.render(<RecoveryMail/>)
}

function cambiarContrasena(){
  root.render(<ChangePassword/>)
}

function registrarse(){
  root.render(<Signin/>)
}

function topDiario(){
  root.render(<DailyTop/>)
}

function perfil(){
  root.render(<Profile/>)
}

function serArtista(){
  root.render(<BecomeArtist/>)
}

function subirCancion(){
  root.render(<UploadSong/>)
}

function menuPrincipal(){
  root.render(<Menu/>)
}

function misListasDeReproduccion(){
  root.render(<PlayLists/>)
}

function nuevaListaDeReproduccion(){
  window.origenPasoListaRepACanciones = constListaNueva;
  root.render(<PlayListContenido/>)
}

function nuevaCarpeta(){
  window.origenPasoCarpetaALista = constCarpetaNueva;
  root.render(<CarpetaContenido/>)
}

function contenidoListaDeReproduccion(indice){
  window.idLista = indice;
  root.render(<PlayListContenido/>);
}

function contenidoCarpeta(idCarpeta){
  window.origenPasoCarpetaALista = constCarpetaExistente;
  window.idCarpeta = idCarpeta;
  root.render(<CarpetaContenido/>)
}

function anyadirCancionListaRep(){
  root.render(<AnyadirCancionLista/>)
}

function anyadirListaCarpeta(){
  root.render(<AnyadirListaCarpeta/>)
}

function misCarpetas(){
  root.render(<Folders/>)
}

function misCanciones(){
  root.render(<MySongs/>)
}

function misFavoritos(){
  root.render(<Favs/>)
}

function estadisticas(){
  root.render(<Statistics/>) 
}

function historicoEstadistico(){
  root.render(<StatisticHistory/>)
}

function listaGlobal(){
  root.render(<GlobalPlayList/>)
}

function nuevaListaGlobal(){
  root.render(<NewGlobalPlaylist/>)
}

function reproduccionAleatoria(){
  root.render(<PlayListContenido/>)
}

function perfilOtroUsuario(){
  root.render(<ProfileOtherUser/>)
}

export default App;
