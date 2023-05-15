
import './Style.css';
import React, { StrictMode, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components"
import H5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { BsSliders2Vertical, BsBarChartLineFill, BsFillHeartFill } from 'react-icons/bs';
import { MdShuffleOn, MdOutlineShuffle, MdRepeatOn, MdRepeat, MdArrowUpward, MdArrowDownward, MdArrowForward, MdWatchLater, MdPlayArrow, MdAdd} from 'react-icons/md'
import { GiDrum, GiMusicalKeyboard, GiUltrasound } from 'react-icons/gi'
import {AiOutlineGlobal} from 'react-icons/ai'
import {FiShare2} from 'react-icons/fi'
import * as DjangoAPI from './Django_API';
import * as DjangoErr from './Django_Err';
import moment from 'moment';
import 'moment/locale/es';

import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
//const ipBackend = "http://ec2-18-206-199-169.compute-1.amazonaws.com:8081/" // aws deployment
//const ipBackend = "http://django.cncfargye8h5eqhw.francecentral.azurecontainer.io:8081/"; // azure
const ipBackend = "http://localhost:8081/"; // cris local
//const ipBackend = "http://192.168.56.1:8081/"; // ismael
const tipoListaReproduccion = "listaReproduccion";
const tipoListaFavoritos = "listaFavoritos";
const constListaNueva = "nueva";
const constListaExistente = "existente";
const constCarpetaNueva = "nueva";
const constCarpetaExistente = "existente";

window.passwd = "example";
window.idUsuario = "example";
window.email = "example";
window.alias = "alias";
window.nombreNuevaListaReproduccion = "Nueva lista de reproducción";
window.nombreNuevaCarpeta = "Nueva carpeta";
window.nombreNuevaListaGlobal = "Nueva lista global";
window.idsLista = [];
window.idLista = 0;
window.listasReproduccion = [];
window.hayListasReproduccion = 0;
window.calidad = DjangoAPI.CALIDAD_BAJA;
window.origenPasoListaRepACanciones = "";
window.origenPasoCarpetaALista = "";
window.idCarpeta = 0;
window._idAudioReproduciendo = "idAudio:1";
window.listaAudiosReproducir = [];
window.ultimoSegundo = 0;

window.player = React.createRef();
window.reproductor = React.createRef();
window.menuPrincipal = React.createRef();
window.ultimoAudio = "idAudio:2";

window.valoracionGeneral = 0;
window.idsAudios = [];
window.infoAudios = [];
window.busquedaAnyadirCancionLista = "";
window.idsCanciones = [];
window.cancionesLista = [];
window.cambiadoOrdenCanciones = false;
window.sortKeyListas = "tematica";
window.recargarLista = true;

window.idsCarpeta = [];
window.infoListas = [];

//Observador que cuando window.idAudioReproduciendo cambie, se hagan cosas...
Object.defineProperty(window, 'idAudioReproduciendo', {
  set: function(newValue) {
    // Realiza acciones cuando se establece el nuevo valor de idAudioReproduciendo
    console.log('Se ha cambiado el valor de idAudioReproduciendo a:', newValue);
    // Ejecuta otras acciones aquí

    window._idAudioReproduciendo = newValue; // Actualiza la variable _idAudioReproduciendo
    window.menuPrincipal.current.cambiarImagen();
    window.player.reproducir(newValue, window.ultimoSegundo).then(() => {
      window.ultimoSegundo = 0;
    })
    window.player.actualizarInfo(newValue);

  },
  get: function() {
    return this._idAudioReproduciendo;
  },
  configurable: true
});

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
                          <li class="nav-item"><a id='nav' class={active('1', this.props.active)} aria-current="page">Notificaciones  &#128276;</a></li>
                          <li class="nav-item"><a id='nav' class={active('2', this.props.active)}  onClick={perfil}>Perfil &#128578;	</a></li>
                          {/*TODO: cuando se pueda acceder al envio de correo eliminar de aqui, se verá desde el botón de mandar correo*/}
                          <li class="nav-item"><a id='nav' class={active('3', this.props.active)} onClick={topDiario}>Top Diario &#129351; </a></li>
                          <li><p>&emsp;&emsp;&emsp;&emsp;</p></li>
                          <li class="nav-item"><a id='nav' class='nav-link' onClick={inicioSesion}>Cerrar Sesión &#128682;</a></li>
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

    fetch(ipBackend + "GenerateRandomCodeUsr/", {
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
                    onClick={this.enviar_codigo_recuperacion}
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
  render(){
    return(
      <header class="bg-blue_7th py-5 main" style={{"align-self" : "center"}}>
          <div class="container">
              <div class="row gx-5 justify-content-center">
                  <div class="text-center my-5">
                      <h1 class="display-5 fw-bolder text-white mb-2" style={{"padding-bottom" : "1 rem"}}>Recuperar contraseña</h1>
                          <form id="contactForm" style={{"margin" : "auto", "max-width" : "20rem", "width" : "100%", "align-self": "center"}} onSubmit={enviar_cambio_contra}>
                              <div class="form-floating mb-3">
                                  <input class="form-control" id="codigo" type="text" placeholder="Introduce el código de verificación enviado a tu correo"/>
                                  <label for="name">Codigo</label>
                              </div>
                              <div class="form-floating mb-3">
                                  <input class="form-control" id="passwd" type="password" placeholder="Introduce la nueva contraseña"/>
                                  <label for="passwd">Nueva contraseña</label>
                              </div>
                              <div class="form-floating mb-3">
                                  <input class="form-control" id="passwd2" type="password" placeholder="Repite la nueva contraseña"/>
                                  <label for="passwd2">Repetir nueva contraseña</label>
                              </div>
                              <button class="btn btn-primary_blue_4th btn-lg px-4 me-sm-3" id="submitButton" type="submit" onClick={enviar_cambio_contra}>Recuperar contraseña</button>
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
  constructor(props){
    super(props)

    this.state = {"class" : "btn btn-primary_blue_4th btn-lg px-4 me-sm-3"};
  }

  componentDidMount(){
    console.log(this.props.class)
    if(this.props.class !== undefined){
      this.setState({"class" : this.props.class})
    }
  }

  render(){
    return (<a class={this.state.class} href="#!" id={this.props.id} style={this.props.style} onClick={this.props.onClick}>{this.props.text}</a>)
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
    return(<MdPlayArrow class="rhap_repeat-button rhap_button-clear" onClick={this.props.onClick} style={this.props.style}/>)
  }
}

class HeartNoTransition extends React.Component{

  meterCancionEnListaFav(idAudio){

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
  
  // contenidoListaDeReproduccion();
}

  render(){
    return(<BsFillHeartFill class="rhap_repeat-button rhap_button-clear" onClick={this.meterCancionEnListaFav(this.idAudio)}/>)
  }
}

class AddNoTransitionCarpeta extends React.Component{

  CambiarPantalla = () => {
    fetch(ipBackend + "AddListToFolder/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idLista" :this.idLista, "idCarpeta" : window.idCarpeta})
    }).then((response) => {
        if(response.ok){
          //bien y correcto
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
    contenidoListaDeReproduccion(this.props.idLista);
  }  

  render(){
    return(<MdArrowForward class="rhap_repeat-button rhap_button-clear" onClick={this.CambiarPantalla}/>)
  }
}

class RightArrowNoTransitionCarpeta extends React.Component{

  CambiarPantalla = () => {
    window.origenPasoCarpetaALista = constCarpetaExistente;
    window.nombreNuevaCarpeta = this.props.text;
    contenidoCarpeta(this.props.folderKey);
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

    this.barraValoracion = React.createRef()
    
    this.state = {'audioSrc' : '', 
                  'audioCtx' : new AudioContext(),
                  'bajos' : 0,
                  'medios' : 0,
                  'altos' : 0,
                  'showEqualizer' : false,
                  'repeatButton' : {},
                  'nombreAudio' : "Nombre Audio",
                  'artista' : "Nombre Artista",
                  'valoracion' : 0
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

    this.reproducir = this.reproducir.bind(this);
    this.mover = this.mover.bind(this);
    this.actualizarInfo = this.actualizarInfo.bind(this);

    // Cris esto si que vale, NO LO QUITES
    window.valoracionGeneral = 0;
  }

  componentDidMount(){
    window.player = this;

    const audioElement = document.querySelector('[src="' + this.state.audioSrc + '"]');
    const sourceNode = this.state.audioCtx.createMediaElementSource(audioElement);
    
    // Conectar los nodos en serie
    sourceNode.connect(this.bajos);
    this.bajos.connect(this.medios);
    this.medios.connect(this.altos);
    this.altos.connect(this.state.audioCtx.destination);

    window.reproductor = this.reproductor;
    
    DjangoAPI.getFicheroSong(window.idUsuario, window._idAudioReproduciendo, false, window.calidad).then(
      audio => {
        var audioURL = URL.createObjectURL(audio);
        this.reproductor.current.audio.current.src = audioURL;

        this.reproductor.current.audio.current.addEventListener('canplay', () => {
          this.reproductor.current.audio.current.play();
        });
      }
    )

    DjangoAPI.getSong(window.idUsuario, window.passwd, window._idAudioReproduciendo)
    .then(async (data) =>{
      this.setState({"nombreAudio" : data.idAudio.nombre});
      window.valoracionGeneral = data.idAudio.val;
      await new Promise(resolve => setTimeout(resolve, 100));
      DjangoAPI.getUser(window.idUsuario, window.passwd, data.idAudio.artista)
      .then(async (datos) => {
        this.setState({"artista" : datos.alias});
        await new Promise(resolve => setTimeout(resolve, 100));
      })
    })

    this.actualizarInfo(window._idAudioReproduciendo)
  }

  reproducir(audio, ultimoSegundo) {
    return new Promise((resolve, reject) => {
      DjangoAPI.getFicheroSong(window.idUsuario, audio, false, DjangoAPI.CALIDAD_BAJA).then(
        audio => {
          this.reproductor.current.audio.current.pause()
          var audioURL = URL.createObjectURL(audio);
          this.reproductor.current.audio.current.src = audioURL;
          this.reproductor.current.audio.current.currentTime = ultimoSegundo;
          this.reproductor.current.audio.current.load();
          
          window.reproductor.current.audio.current.addEventListener('canplay', () => {
            window.reproductor.current.audio.current.play();
          });

          resolve();
        }
      ).catch(error => reject(error))
    })
  }

  actualizarInfo(idAudio){
    DjangoAPI.getSong(window.idUsuario, window.passwd, idAudio).then(audio => {
      DjangoAPI.getUser(window.idUsuario, window.passwd, audio.artista).then(artista => {
        this.setState({"nombreAudio" : audio.nombre, "artista" : artista.alias, "valoracion" : 1})
        toast.info("Estas escuchando " + audio.nombre + " de " + artista.alias)

        DjangoAPI.getValoracionMedia(idAudio).then(valoracion => {
          this.barraValoracion.current.setState({rating : valoracion})
        })

      })
    })
  }

  mover(segundo) {
    this.reproductor.current.audio.current.currentTime = segundo;
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
    this.reproductor.current.audio.current.pause();
    let segundo = this.reproductor.current.audio.current.currentTime;
    toast.info("Guardado el tiempo: " + segundo);
    DjangoAPI.setLastSecondHeared(window.idUsuario, window.passwd, window._idAudioReproduciendo, segundo);
  }

  share_song = () => {

    DjangoAPI.getLinkAudio(window.idUsuario, window.passwd, window.idAudioReproduciendo).then(link => {
      // Copiar enlace al portapapeles
      navigator.clipboard.writeText(link);
      // Mostrar mensaje de éxito
      toast.info("Enlace a la canción copiado en el portapapeles");
    })
    .catch(() => {
      toast.error("Ha habido un error");
    })
    
  }
  
  render(){

    return (
      <>
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
        <div>
          <div className="justify-content-center text-center" style={{display: 'flex', alignItems: 'center', "background-color": "#ffffff"}}>
            <p className="display-7 mb-2">{this.state.nombreAudio}</p>
            <span className="separator"> </span>
            <p className="display-7 mb-2"> - </p>
            <span className="separator"> </span>
            <p className="display-7 mb-2">{this.state.artista}</p>
          </div>
          <div className="justify-content-center text-center" style={{alignItems: 'center', "background-color": "#ffffff"}}>
            <p className="display-7 mb-2">Valoración global </p>
            <SongRated ref={this.barraValoracion} />
          </div>
          <div className="justify-content-center text-center" style={{alignItems: 'center', "background-color": "#ffffff"}}>
            <p className="display-7 mb-2">Tu valoración </p>
            <SongRating/>
          </div>
        </div>
      </>
    );
  }
};

function GrabarValoracion(valoracion) {
  console.log(valoracion)
  fetch(ipBackend + "SetValoracion/", {
    method: "POST",
    body: JSON.stringify({"idUsr": window.idUsuario, "idAudio": window._idAudioReproduciendo, "valoracion": valoracion})
  }).then(response => {
    if (response.ok) {
      toast.success("Tu valoración se ha almacenado con éxito");
      fetch(ipBackend + "GetValoracionMedia/", {
        method: "POST",
        body: JSON.stringify({"idAudio": window._idAudioReproduciendo})
      }).then(response => {
        if (response.ok) {
          response.json().then(data => {
            console.log("Cris valoracion obtenida", data.valoracion);
            window.valoracionGeneral = Math.round(data.valoracion);
          })
          //await new Promise(resolve => setTimeout(resolve, 100));
        }
      }).catch(error => toast.error(error.message))
    } else {
      toast.error("Ha habido un error al almacenar tu valoración");
    }
  }).catch(error => toast.error(error.message))
}

const SongRating = () => {
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);

  const handleRating = (value) => {
    if (!rated) {
      setRating(value);
      GrabarValoracion(value);
      setRated(true);
    }
  };

  return (
    <div className="justify-content-center" style={{display: 'flex', alignItems: 'center', "background-color": "#ffffff"}}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star key={value} filled={value <= rating} onClick={() => handleRating(value)} />
      ))}
    </div>
  ); 
};

class SongRated extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      rating : 0
    }
  }

  render() {
    return (
      <div className="justify-content-center" style={{display: 'flex', alignItems: 'center', "background-color": "#ffffff"}}>
        {[1, 2, 3, 4, 5].map((value) => (
          <Star key={value} filled={value <= this.state.rating} />
        ))}
      </div>
    );
  }
}

const Star = ({ filled, onClick }) => {
  const starStyle = {
    cursor: 'pointer',
    color: filled ? 'yellow' : 'gray'
  };

  return <span style={starStyle} onClick={onClick}>★</span>;
};

const randomSong = () => {
  DjangoAPI.getRecomendedAudio(window.idUsuario, window.passwd).then(idAudio => {
    window.idAudioReproduciendo = idAudio;
  })
}

class MenuPrincipal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      esArtista: false,
      esAdmin: false,
      urlImage: "assets/girls_listening_music.jpg"
    };

    this.cambiarImagen = this.cambiarImagen.bind(this); // enlazar el método con "this"
  }

  componentDidMount() {
    DjangoAPI.getImagenAudio(window.idUsuario, window.passwd, window._idAudioReproduciendo).then(
      imagen => {
        let imagenURL = URL.createObjectURL(imagen);
        this.setState({urlImage : imagenURL})
      }
    )

    DjangoAPI.getUser(window.idUsuario, window.passwd, window.idUsuario).then(usuario => {
      if(usuario.tipoUsuario === DjangoAPI.USUARIO_ARTISTA){
        this.setState({esArtista : true});
      }
      else if(usuario.tipoUsuario === DjangoAPI.USUARIO_ADMINISTRADOR){
        this.setState({esAdmin : true})
      }
    })
  }

  cambiarImagen() {
    DjangoAPI.getImagenAudio(window.idUsuario, window.passwd, window._idAudioReproduciendo).then(
      imagen => {
        let imagenURL = URL.createObjectURL(imagen);
        this.setState({urlImage : imagenURL})
      }
    )
  }

  render(){
    const esArtista = this.state.esArtista;
    const esAdmin = this.state.esAdmin;
    return(
      <div class="main" style={{"display" : "flex"}}>
        <div style={{"display" : "flex", "flex-direction" : "column", "justify-content" : "center" , "width":"15rem", "margin-left" : "0.5rem"}}>
        <p style={{ marginBottom: '10px' }}><br/></p>
          <BotonUltimaEscucha/>
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
            <ButtonOnClick id="" onClick={randomSong} text="Random"/>
            <p></p>
            <ButtonOnClick onClick={amigos} id="" text="Social"/>
          </ButtonGroup>
          <p style={{ marginBottom: '10px' }}><br/></p>
          {esArtista ? <ButtonOnClick onClick={misCanciones} id="" text="Mis Canciones"/> : null}
          {esAdmin ? <ButtonOnClick onClick={listaGlobal} id="" text="Listas Globales"/> : null}
          <p style={{ marginBottom: '10px' }}><br/></p>
        </div>
        <div style={{"display" : "flex", "flex-direction" : "column", "flex" : "1"}}>
          <div class="bg-blue_3th main" style={{"width" : "100%", "heigth" : "100%", "flex": 1 }}>
            <div class="form-floating mb-3" style={{"display" : "flex"}}>
              <input class="form-control" id="busqueda" type="text" placeholder="Cancion X"/>
              <label for="busqueda">Buscar  &#128269;</label>
              <Button class="btn btn-primary_blue_6th btn-lg mg-1" onClick={busquedaGlobal} style={{"margin-right" : "0.5rem"}} text="&#128270;"/>
              <Button class="btn btn-primary_blue_6th btn-lg " text="&#127808;"/>
            </div>
          </div>
          <div class="bg-blue_3th main" style={{"width" : "100%", "heigth" : "100%", "flex": 1, "display": "flex", "justify-content": "center", "align-items": "center"}}>
              <ImagenInfo src={this.state.urlImage}/>
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
  const [calidad, setCalidad] = useState(window.calidad || DjangoAPI.CALIDAD_BAJA);
  const [cambios, setCambios] = useState(false);

  const handleChange = (event) => {
    setCalidad(event.target.value);
    setCambios(true);
    if (event.target.value === DjangoAPI.CALIDAD_ALTA) {
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
    if (window.calidad === DjangoAPI.CALIDAD_ALTA) { // Anteriormente estaba en alta y queremos cambiar a baja
      window.calidad = DjangoAPI.CALIDAD_BAJA;
    }
    else {
      window.calidad = DjangoAPI.CALIDAD_ALTA; // Anteriormente estaba en baja y queremos cambiar a alta
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
            value={DjangoAPI.CALIDAD_BAJA}
            checked={calidad === DjangoAPI.CALIDAD_BAJA}
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
            value={DjangoAPI.CALIDAD_ALTA}
            checked={calidad === DjangoAPI.CALIDAD_ALTA}
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
      top1: "Canción 1", // Primera canción del top diario
      top2: "Canción 2",
      top3: "Canción 3",
      top4: "Canción 4",
      top5: "Canción 5",
      top6: "Canción 6",
      top7: "Canción 7",
      top8: "Canción 8",
      top9: " Canción 9",
      top10: "Canción 10", // Última canción del top diario
    }
  }

  componentDidMount(){
    fetch(ipBackend + "GetTopReproducciones/", {
      method: "POST",
      body: JSON.stringify({ "n": "10", "esPodcast": "TRUE"})
    })
    .then(response => { // Se devuelve un array con 10 idAudio
      if (response.ok) {
        response.json().then(data => {
          for (let i = 0; i < data.topAudios.length; i++) {
            const audio = data.topAudios[i];
            console.log("PAULA " + audio);
            fetch(ipBackend + "GetSong/", {
              method: "POST",
              body: JSON.stringify({ "idUsr":window.idUsuario, "contrasenya":window.passwd, "idAudio":audio })
            })
            .then(response => {
              if (response.ok) {
                return response.json().then(dataCancion => {
                  const cancion = dataCancion.idAudio.nombre; // Asumiendo que la respuesta del backend tiene un campo 'cancion'
                  switch (i) {
                    case 0:
                      this.setState({ top1: cancion });
                      break;
                    case 1:
                      this.setState({ top2: cancion });
                      break;
                    case 2:
                      this.setState({ top3: cancion });
                      break;
                    case 3:
                      this.setState({ top4: cancion });
                      break;
                    case 4:
                      this.setState({ top5: cancion });
                      break;
                    case 5:
                      this.setState({ top6: cancion });
                      break;
                    case 6:
                      this.setState({ top7: cancion });
                      break;
                    case 7:
                      this.setState({ top8: cancion });
                      break;
                    case 8:
                      this.setState({ top9: cancion });
                      break;
                    case 9:
                      this.setState({ top10: cancion });
                      break;
                    default:
                      break;
                  }
                })
              } else {
                throw new Error(`Error al obtener la canción para el elemento ${i+1}`);
              }
            })
            .catch(error => toast.error("Error en el for" + error.message));
          }
        })
      } else {
        toast.error("Error al obtener el top diario");
      }
    })
    .catch(error => toast.error("Error el procesar el top diario" + error.message));
  }

  render(){
    const { top1, top2, top3, top4, top5, top6, top7, top8, top9, top10 } = this.state;
    return(
      <div className="bg-blue_7th" >
        <div className="text-center my-5 justify-content-center row gx-5">
          <h1 className="display-5 fw-bolder text-white mb-2">Estadísticas de reproducciones globales</h1>
        </div>
        <div className="text-center my-5 justify-content-center row gx-5">
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 1 { top1 }</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 2  { top2 }</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 3  { top3 }</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 4  { top4 }</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 5  { top5 }</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 6  { top6 }</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 7  { top7 }</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 8  { top8 }</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 9  { top9 }</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">TOP 10 { top10 }</p>
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
      esAdmin: false,
      urlFotoPerfil: "assets/boy_listening_music.jpg"
    };
  }

  componentDidMount() {
    this.mostrarBotones();
    this.obtenerNombre();

    DjangoAPI.getImagenPerfilUsr(window.idUsuario, window.passwd, window.idUsuario).then(imagen => {
      let urlImagen = URL.createObjectURL(imagen);
      this.setState({urlFotoPerfil : urlImagen});
    })
  }

  obtenerNombre() {

    DjangoAPI.getUser(window.idUsuario, window.passwd, window.idUsuario).then(
      usuario => {
        this.setState({
          name: usuario.alias,
        });
      }
    ).catch(error => toast.error(error))

  }

  mostrarBotones() {
    DjangoAPI.getUser(window.idUsuario, window.passwd, window.idUsuario).then(
      async usuario => {
        if(usuario.tipoUsuario === DjangoAPI.USUARIO_ARTISTA){
          this.setState({
            esArtista: true,
            esAdmin: false
          });
          await new Promise(resolve => setTimeout(resolve, 100));
        }else if(usuario.tipoUsuario === DjangoAPI.USUARIO_ADMINISTRADOR){
          this.setState({
            esArtista: true,
            esAdmin : true
          });
          await new Promise(resolve => setTimeout(resolve, 100));
        } else {
          this.setState({
            esArtista: false,
            esAdmin: false
          });
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
      }
    ).catch(error => toast.error(error))
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
                      src={this.state.urlFotoPerfil}
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
                  {this.state.name}
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
          <form onSubmit={enviar_peticion_artista(text)}>
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
                <input id="fichero_audio" className="subcuerpo-formArtista fw-normal text-white" type="file" accept=".wav,.mp3"/>
              </div>
              <button type="submit" className="btn btn-primary">Enviar solicitud</button>
              </div>
          </form>
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
                <input class="form-control" id="duracionAudio" type="text" placeholder="nuevaCancion"/>
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
                <input id="fichero_imagen" class="input-formArtista text-white" type="file"  name="image" accept="image/*" />
              </div>
              <p className="cuerpo-formArtista fw-bolder subtitulo-formArtista subtitulo-formArtista-md mb-4 text-white">
                Sube el archivo de audio a añadir en tu perfil de artista
              </p>
              <div className="d-flex justify-content-center mb-4">
                <input id="fichero_audio" class="input-formArtista text-white" type="file" accept=".wav,.mp3" />
              </div>
              <ButtonCommit onClick={enviar_contenido_artista} id="" text="Subir contenido"/>
            </div>
        </div>
        </div>
      </div>
    );
  }
}

/*
 * Listas de reproducción
 */

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
                this.state.listasReproduccion.map((lista) => <CardNamePlaylist idLista={lista.id} text={lista.nombre}/>)
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
        <span className="separator"> </span>
        <RightArrowNoTransition idLista={this.props.idLista} text={this.props.text}/>
      </div>
    )
  }
}

class NuevaListaReproduccionContenido extends React.Component{

  constructor(props) {
    super(props);
    window.cancionesLista = [];
    window.idsCanciones = [];
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
      this.pedirDatosLista();
    }
  }

  async pedirDatosLista(){
    await fetch(ipBackend + "GetAudiosLista/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idLista": window.idLista})
    }).then(async (response) =>{
      if(response.ok){
        await response.json().then(async (datos) => {
          // obtener los datos de la lista
          window.idsCanciones.push(...datos.audio);
          await Promise.all(
            window.idsCanciones.map(async (id) => {
              await DjangoAPI.getSong(window.idUsuario, window.passwd, id)
              .then(async (datoss) =>{
                if(response.ok){
                  let tematica = "";
                  if (datoss.esPodcast === "0"){
                    tematica = "canción";
                  } else {
                    tematica = "podcast";
                  }
                  let artista = "";
                  await DjangoAPI.getUser(window.idUsuario, window.passwd, datoss.artista)
                  .then((datitos) => {
                    if (response.ok){
                      artista = datitos.alias;
                    }
                  }
                  )
                  let audioCustom = {
                    id: id,
                    nombre: datoss.nombre,
                    tematica: tematica,
                    artista: artista,
                    idioma: "desconocido"
                  };
                  window.cancionesLista.push(audioCustom);
                }
              });
            })
          )
        }).catch(error => {
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("Ha habido un error")
      }
    }).catch(error => toast.error(error.message))
    window.origenPasoListaRepACanciones = "";
    cancionesListaDeReproduccion();
  }

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
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }
}

class ListaReproduccionContenido extends React.Component{

  constructor(props) {
    super(props);
  }

  async handleSortChange(e) {
    window.sortKeyListas = e.target.value;
    if (window.sortKeyListas === "tematica"){
      await window.cancionesLista.sort((a, b) => a.tematica > b.tematica ? 1 : -1);
    } else if (window.sortKeyListas === "titulo") {
      await window.cancionesLista.sort((a, b) => a.nombre > b.nombre ? 1 : -1);
    } else if (window.sortKeyListas === "artista") {
      await window.cancionesLista.sort((a, b) => a.artista > b.artista ? 1 : -1);
    } else if (window.sortKeyListas === "idioma") {
      await window.cancionesLista.sort((a, b) => a.idioma > b.idioma ? 1 : -1);
    }
    cancionesListaDeReproduccion();
  };

  PlaylistSortSelector = ({ onChange }) => {
    return (
      <select onChange={onChange} defaultValue="tematica" value={window.sortKeyListas}>
        <option value="tematica">Temática</option>
        <option value="titulo">Título</option>
        <option value="artista">Artista</option>
        <option value="idioma">Idioma</option>
      </select>
    );
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
                  {(window.cancionesLista.length > 0 &&
                    <ShuffleButtonNoTransition class="rhap_repeat-button rhap_button-clear" onClick={reproduccionAleatoria}/>
                  )}
                  
                </div>
                <div class="text-center my-5" style={{"margin-bottom": "20px"}}>
                {window.cancionesLista.length === 0 ? (
                  <span className="separator"> </span>
                ) : (
                  <>
                    <div class="my-5" style={{"margin-bottom": "20px"}}>
                      <div className="right-align">
                        <this.PlaylistSortSelector onChange={this.handleSortChange}/>
                      </div>
                    </div>
                    <div class="text-center my-5" style={{"margin-bottom": "20px"}}>
                      {window.cancionesLista.map((lista) =>
                        (<CardNameListaSong
                          idAudio={lista.id}
                          text={lista.nombre}
                          tematica={lista.tematica}
                          artista={lista.artista}
                          idioma={lista.idioma}/>))}
                    </div>
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

  mandarAudioAReproductor = (idAudio) => {
    window._idAudioReproduciendo = this.props.idAudio;
    menuPrincipal();
  }

  render(){
    return (
      <>
        <div class="text-center my-5" style={{"margin-bottom": "20px"}}>
          <div className="justify-content-center" style={{display: 'flex', alignItems: 'center' }}>
            <p className="display-6 fw-bolder text-white mb-2">{this.props.text}</p>
            <span className="separator"> </span>
            <p className="display-6 fw-bolder text-white mb-2">{this.props.artista}</p>
            <span className="separator"> </span>
            <p className="display-6 fw-bolder text-white mb-2">{this.props.tematica}</p>
            <span className="separator"> </span>
            <p className="display-6 fw-bolder text-white mb-2">{this.props.idioma}</p>
            <span className="separator"> </span>
            <ButtonCommit onClick={this.mandarAudioAReproductor} text={String.fromCharCode(9658)} />
          </div>
        </div>
      </>
    )
  }
}

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
    this.state = {
      buscado: false
    };
    window.busquedaAnyadirCancionLista = "";
    window.idsAudios = [];
    window.infoAudios = [];
  }

  async handleSubmit(event){
    event.preventDefault();
    await fetch(ipBackend + "GlobalSearch/", {
      method : "POST",
      body : JSON.stringify({"query" : window.busquedaAnyadirCancionLista, "n" : 10})
    }).then(async (response) => {
      if(response.ok){
        await response.json().then(async (data) => {
          window.idsAudios.push(...data.audios);
          this.setState({ buscado: true });
          await Promise.all(
          window.idsAudios.map(async (audio) => {
            await DjangoAPI.getSong(window.idUsuario, window.passwd, audio)
            .then((datos) =>{
              if(response.ok){
                let audioCustom = {
                  id: audio,
                  nombre: datos.nombre
                };
                window.infoAudios.push(audioCustom);
              }
            });
          }))          
        }).catch(function(error){
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("El usuario o la contraseña son incorrectos")
      }
    }).catch(error => {
      toast.error(error.message)
    });
    anyadirCancionListar();
  }

  handleInputChange(event) {
    window.busquedaAnyadirCancionLista = event.target.value;
  }

  render(){
    return (
      <>
        <header class="bg-blue_7th py-5">
          <div class="container px-5" style={{ marginTop: "3rem" }}>
            <div class="row gx-5 justify-content-center">
              <div class="col-lg-6">
                <div class="text-center my-5">
                  <h1 class="display-5 fw-bolder text-white mb-2" style={{ paddingBottom: "1rem" }}>
                    Añadir canciones
                  </h1>
                </div>
                <form className="justify-content-center" style={{display: 'flex', alignItems: 'center' }} onSubmit={event => this.handleSubmit(event)}>
                  <input
                    class="form-control"
                    id="busqueda-anyadir"
                    type="text"
                    placeholder="Nombre de la canción"
                    value={window.busquedaAnyadirCancionLista}
                    onChange={event => this.handleInputChange(event)} // Nuevo evento onChange para actualizar el estado
                  />
                  <button type="submit" class="btn btn-primary">
                    Buscar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}

class CardNameAddSong extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="justify-content-center" style={{display: 'flex', alignItems: 'center' }}>
        <p className="display-6 fw-bolder text-white mb-2">{this.props.text}</p>
        <span className="separator"> </span>
        <ButtonCommit onClick={() => meterCancionEnListaRep(this.props.idAudio)} text={String.fromCharCode(43)} />
      </div>
    )
  }
}

class ListarCancionesAnyadirListasReproduccion extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      busqueda: "",
    };
  }

  handleSubmit = (event) => {
    //anyadirCancionListaRep();
  }

  handleInputChange(event) {
    anyadirCancionListaRep();
    //window.busquedaAnyadirCancionLista = event.target.value;
  }

  render(){
    return (
      <>
        <header class="bg-blue_7th py-5">
          <div class="container px-5" style={{ marginTop: "3rem" }}>
            <div class="row gx-5 justify-content-center">
              <div class="col-lg-6">
                <div class="text-center my-5">
                  <h1 class="display-5 fw-bolder text-white mb-2" style={{ paddingBottom: "1rem" }}>
                    Añadir canciones
                  </h1>
                </div>
                <form className="justify-content-center" style={{display: 'flex', alignItems: 'center' }} onSubmit={event => this.handleSubmit(event)}>
                  <input
                    class="form-control"
                    id="busqueda-anyadir"
                    type="text"
                    placeholder="Nombre de la canción"
                    value={window.busquedaAnyadirCancionLista}
                    onChange={event => this.handleInputChange(event)} // Nuevo evento onChange para actualizar el estado
                  />
                  <button type="submit" class="btn btn-primary">
                    Buscar
                  </button>
                </form>
                {(window.infoAudios.length > 0) ? (
                  window.infoAudios.map((audio) => <CardNameAddSong idAudio={audio.id} text={audio.nombre}/>)
                ) : (
                  <p className="display-6 fw-bolder text-white mb-2 text-center" style={{alignItems: 'center'}}>No hay resultados</p>
                )}
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}

async function meterCancionEnListaRep(idAudio){

  let funciona = false;
  await fetch(ipBackend + "SetSongLista/", {
    method : "POST",
    body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idLista": window.idLista, "idAudio": idAudio})
  }).then(async response =>{
    if(response.ok){
      await response.json().then(async datos => {
        funciona = true;
        window.cancionesLista.push(datos.canciones); // no va a funcionar, es solamente para que compile
      }).catch(error => {
        console.error('Error al analizar la respuesta JSON:', error);
      })
    }else{
      toast.error("Ha habido un error, no se ha podido añadir la canción a la lista")
    }
  }).catch(error => toast.error(error.message));
  if(funciona === true){
    toast.success("Canción añadida a la lista");
  }
}

/*
 * Listas globales del admin
 */

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
                  { /*<PlaylistSortSelector onChange={this.handleSortChange} />*/ }
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }
}

/*
 * Carpetas
 */

class Carpetas extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      carpetas: []
    };
    window.idsCarpeta = [];
    window.infoListas = [];
  }

  componentDidMount() {;
    this.pedirInfo();
  }

  async pedirInfo(){
    await fetch(ipBackend + "GetFoldersUsr/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "idUsrGet" : window.idUsuario, "contrasenya" : window.passwd})
    }).then(async (response) => {
        if(response.ok){
          await response.json().then(async (data) =>{
            if (data.idCarpeta.length > 0){
              window.idsCarpetas = data.idCarpeta;
              await data.idCarpeta.forEach(async (carpeta) => {
                  await fetch(ipBackend + "GetFolder/", {
                    method : "POST",
                    body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idCarpeta" : carpeta})
                  }).then(async (response) => {
                      if(response.ok){
                        await response.json().then(async (datos) => {
                          const carpetaCustom = {
                            id: carpeta,
                            nombre: datos.nombreCarpeta
                          };
                          await window.infoListas.push(carpetaCustom);
                          await new Promise((resolve) => setTimeout(resolve, 100));
                      })
                      } else{
                        toast.warning("No se ha podido recuperar la información de tus carpetas")
                      }
                  }).catch(error => toast.error(error.message))
              })
              await new Promise((resolve) => setTimeout(resolve, 100));
              misCarpetas2();
            }
        }).catch((error) => {
            console.error('Error al analizar la respuesta JSON:', error);
        })
        }else{
        toast.error("El usuario o la contraseña son incorrectos")
        }
    }).catch(error => toast.error(error.message));
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
        </div>
      </>
    )
  }
}

class Carpetas2 extends React.Component{
  constructor(props) {
    super(props);
    // cris aqui
    console.log("Cris info", window.infoListas);
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
            {(window.infoListas.length === 0) ? (
              <p className="display-6 fw-bolder text-white mb-2">No tienes carpetas</p>
            ) : (
                window.infoListas.map((lista) => <CardNameFolder folderKey={lista.id} text={lista.nombre}/>)
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
          <RightArrowNoTransitionCarpeta folderKey={this.props.folderKey} text={this.props.text}/>
      </div>
      )
  }
}

class NuevaCarpetaContenido extends React.Component{

  constructor(props) {
    super(props);
    window.listasCarpeta = [];
    console.log("Cris idCarpeta", window.idCarpeta);
  }

  componentDidMount() {
    if (window.origenPasoCarpetaALista === constCarpetaNueva) {
      // hay que crear la nueva carpeta
      fetch(ipBackend + "SetFolder/", {
          method : "POST",
          body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "nombreCarpeta": window.nombreNuevaCarpeta, "privacidadCarpeta": "privada"})
      }).then(response => {
          if(response.ok){
          response.json().then(data => {
              // Carpeta creada
              window.idCarpeta = data.idCarpeta;
          }).catch(error => {
              console.error('Error al analizar la respuesta JSON:', error);
          })
          }else{
          toast.error("Ha habido un error")
          }
      }).catch(error => toast.error(error.message))
    } else if (window.origenPasoCarpetaALista === constCarpetaExistente) {
      // la lista ya carpeta, solo hay que coger sus listas
      this.pedirDatosCarpeta();
    }
    window.origenPasoCarpetaALista = "";
  }

  async pedirDatosCarpeta(){
    await fetch(ipBackend + "GetListasFolder/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idCarpeta": window.idCarpeta})
    }).then(async (response) =>{
      if(response.ok){
        await response.json().then(async (datos) => {
          // obtener los datos de la carpeta
          window.idsCarpeta.push(...datos.idLista);
          await Promise.all(
            window.idsCarpeta.map(async (id) => {
              fetch(ipBackend + "GetLista/", {
                method : "POST",
                body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idLista" : id})
              }).then((response) => {
                  if(response.ok){
                      response.json().then((datos) => {
                        const listaCustom = {
                          id: id,
                          nombre: datos.lista.nombreLista
                        };
                        window.listasCarpeta.push(listaCustom);
                      })
                  } else{
                      toast.warning("No se ha podido recuperar la información de tus listas de reproduccion")
                  }
                }).catch(error => toast.error(error.message))
            })
          )
        }).catch(error => {
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("Ha habido un error")
      }
    }).catch(error => toast.error(error.message))
    await new Promise((resolve) => setTimeout(resolve, 200));
    window.origenPasoCarpetaALista = "";
    listasCarpetas();
  }

  render(){
    return (
      <>
        <header class="bg-blue_7th py-5" >
          <div class="container px-5" style={{"marginTop" : "3rem"}}>
            <div class="row gx-5 justify-content-center">
              <div class="col-lg-6">
                <div class="text-center my-5">
                  <FormularioRenombreCarpeta
                    nombre={window.nombreNuevaCarpeta}
                  />
                </div>
                <div class="text-center my-5" style={{"margin-bottom": "20px"}}>
                  <ButtonOnClick onClick={misCarpetas} id="" text="Volver atrás"/>
                  <ButtonOnClick onClick={anyadirListaCarpeta} id="" text="Añadir listas"/>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }
}

function FormularioRenombreCarpeta({ nombre }) {
  const [nombreEditando, setNombreEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(nombre);

  function handleNombreCambiado(e) {
    e.preventDefault();
    window.nombreNuevaCarpeta = nuevoNombre;
    setNombreEditando(false);
    fetch(ipBackend + "SetNombreCarpeta/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idCarpeta": window.idCarpeta, "nombreCarpeta": window.nombreNuevaCarpeta})
    }).then(function(response){
      if(response.ok){
        response.json().then(function(data){
          toast.success("El nombre de la carpeta se ha cambiado con éxito");
        }).catch(function(error){
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("Ha habido un error")
      }
    }).catch(error => toast.error(error.message))
    return (
      root.render(<CarpetaContenido/>)
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

class CarpetaListasContenido extends React.Component{

    constructor(props) {
      super(props);
    }
  
    render(){
      return (
        <>
          <header class="bg-blue_7th py-5" >
            <div class="container px-5" style={{"marginTop" : "3rem"}}>
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-6">
                        <div class="text-center my-5">
                            <FormularioRenombreCarpeta
                                nombre={window.nombreNuevaCarpeta}
                            />
                        </div>
                        <div class="text-center my-5" style={{"margin-bottom": "20px"}}>
                            <ButtonOnClick onClick={misCarpetas} id="" text="Volver atrás"/>
                            <ButtonOnClick onClick={anyadirListaCarpeta} id="" text="Añadir listas"/>
                        </div>
                        <div class="text-center my-5" style={{"margin-bottom": "20px"}}>
                        {window.listasCarpeta.length === 0 ? (
                            <span className="separator"> </span>
                        ) : (
                            <div class="text-center my-5" style={{"margin-bottom": "20px"}}>
                                {window.listasCarpeta.map((lista) =>
                                (<CardNameCarpetaLista
                                    key={lista.id}
                                    text={lista.nombre}/>))}
                            </div>
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
      <>
        <div class="text-center my-5" style={{"margin-bottom": "20px"}}>
          <div className="justify-content-center" style={{display: 'flex', alignItems: 'center' }}>
            <p className="display-6 fw-bolder text-white mb-2">{this.props.text}</p>
          </div>
        </div>
      </>
    )
  }
}

class AnyadirListaReproduccionCarpeta extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      listasReproduccion: []
    };
  }

  componentDidMount() {
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
                        const listaCustom = {
                          id: lista,
                          nombre: datos.lista.nombreLista
                        };
                        this.setState({ listasReproduccion: [...this.state.listasReproduccion, listaCustom] });
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
        <header class="bg-blue_7th py-5">
          <div class="container px-5" style={{ marginTop: "3rem" }}>
            <div class="row gx-5 justify-content-center">
              <div class="col-lg-6">
                <div class="text-center my-5">
                  <h1 class="display-5 fw-bolder text-white mb-2" style={{ paddingBottom: "1rem" }}>
                    Añadir listas
                  </h1>
                </div>
                <div className="text-center my-5 justify-content-center row gx-5" style={{display: 'flex', alignItems: 'center' }}>
                  {(this.state.listasReproduccion.length === 0) ? (
                  <p className="display-6 fw-bolder text-white mb-2">No tienes listas</p>
                  ) : (
                      this.state.listasReproduccion.map((lista) => <CardNameFolderPlaylist id={lista.id} text={lista.nombre}/>)
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
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
        <span className="separator"> </span>
        <ButtonCommit onClick={() => meterListaEnCarpeta(this.props.id)} text={String.fromCharCode(43)} />
      </div>
    )
  }
}

async function meterListaEnCarpeta(idLista){

  let funciona = false;
  await fetch(ipBackend + "AddListToFolder/", {
    method : "POST",
    body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idCarpeta": window.idCarpeta, "idLista": idLista})
  }).then(async response =>{
    if(response.ok){
      await response.json().then(async datos => {
        funciona = true;
      }).catch(error => {
        console.error('Error al analizar la respuesta JSON:', error);
      })
    }else{
      toast.error("Ha habido un error, no se ha podido añadir la canción a la lista")
    }
  }).catch(error => toast.error(error.message));
  if(funciona === true){
    toast.success("Lista añadida");
  }
}

/*
 * Favoritos
 */

class ListasFavoritos extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      listasFavoritos: [],
      numCanciones: 0,
      sortKey: ""
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
                        this.setState({ listasFavoritos: [...this.state.listasFavoritos, listaCustom] });
                        fetch(ipBackend + "GetAudiosLista/", {
                          method : "POST",
                          body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idLista": lista})
                        }).then(response =>{
                          if(response.ok){
                            response.json().then(datos => {
                              // obtener los datos de la lista
                              window.idLista = lista;
                              this.setState({numCanciones: datos.audio.length});
                              window.cancionesLista.push(datos.audio);
                              // hay que sacar el numero de canciones de la lista
                            }).catch(error => {
                              console.error('Error al analizar la respuesta JSON:', error);
                            })
                          }else{
                            toast.error("Ha habido un error")
                          }
                        }).catch(error => toast.error(error.message))
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

  handleSortChange  = (event) => {
    this.setState({ sortKey: event.target.value });
    this.sortSongs();
  };

  sortSongs = () => {

    if (this.state.sortKey === "tema"){
      window.listasFavoritos = [...window.listasFavoritos.sort((a, b) => a.tematica.localeCompare(b.tematica))];
    } else if (this.state.sortKey === "genero") {
      window.listasFavoritos = [...window.listasFavoritos.sort((a, b) => a.genero.localeCompare(b.genero))];
    }
  };
  
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
            </div>
          </div>
          <div class="text-center my-5" style={{"margin-bottom": "20px"}}>
            {this.state.numCanciones === 0 ? (
              <p className="display-6 fw-bolder text-white mb-2">No tienes nada en favoritos</p>
            ) : (
              <>
                <FavsSortSelector onChange={this.handleSortChange}/>
                {window.cancionesLista.map((lista) => (<CardNameListaSongFav idAudio={lista.id} text={lista.nombre}/>))}
              </>
            )}
          </div>
        </div>
      </>
    )
  }
}

const FavsSortSelector = ({ onChange }) => {
  return (
    <select onChange={onChange}>
      <option value="">Selecciona el criterio de ordenación</option>
      <option value="tema">Tema</option>
      <option value="genero">Género</option>
    </select>
  );
};

class CardNameListaSongFav extends React.Component{

  constructor(props) {
    super(props);
  }

  render(){
    return (
    <div className="justify-content-center" style={{display: 'flex', alignItems: 'center' }}>
      <p className="display-6 fw-bolder text-white mb-2">{this.props.text}</p>
      <UpArrowNoTransition/>
      <DownArrowNoTransition/>
      <HeartNoTransition idAudio={this.props.idAudio}/>
      <PlayNoTransition/>
    </div>
    )
  }
}

class ListaAmigos extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      amigos: []
    };
  }

  componentDidMount() {
    fetch(ipBackend + "GetFriends/", {
      method: "POST",
      body: JSON.stringify({ "idUsr": window.idUsuario, "contrasenya": window.passwd })
    })
      .then(response => {
        if (response.ok) {
          return response.json().then(data => {
            console.log("PAULA", data);
            this.setState({ amigos: data });
          })
        }
        throw new Error("Error al obtener los amigos");
      }).catch(error => toast.error(error.message));
  }
  
  render(){
    {amigos.map(amigo => (
      <div key={amigo}>
        <p>{amigo}</p>
      </div>
    ))}
    
    return (
      <div className="container-fluid --bs-body-bg h-100 d-flex align-items-center main">
        <div className="col-md-3 --bs-blue-bg"></div>
        <div className="col-md-6 --bs-blue-bg d-flex justify-content-center">
          <div className="text-center">
            <p className="titulo-formArtista titulo-formArtista-lg mb-3 text-white">Tus Amigos</p>
            <div className="d-flex flex-column align-items-center">
              <label for="idAmigo">Usuario</label>
              <input class="form-control" id="idAmigo" type="text" placeholder="Introduce el código de amistad"/>
              <ButtonOnClick onClick={enviar_solicitud_amistad} id="" text="Enviar petición de amistad"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CancionesArtista extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: new Array()
    };
  }

  componentDidMount() {
    DjangoAPI.getSongsArtist(window.idUsuario, window.passwd, window.idUsuario).then(
      async (listaIdAudios) => {
        const listaSongs = await Promise.all(listaIdAudios.map(idAudio =>
          DjangoAPI.getSong(window.idUsuario, window.passwd, idAudio).then(
            audio => audio.nombre
          )
        ));

        console.log(listaSongs)
        this.setState({ songs : listaSongs });
      }
    )
  }

  render() {
    return (
      <div className="text-center">
        <h1 className="CancionesArtista text-tuPerfil-50 mb-3">
          Canciones publicadas
        </h1>
          {this.state.songs.map(song => (
            <h4 class="text-center text-white mb-2 my-3" key={song}>{song}</h4>
          ))}
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
    let diaDeLaSemana = moment().locale('es').format('dddd');
    let dia = 0;
    if (diaDeLaSemana === "lunes"){
      dia = 0;
    }
    else if (diaDeLaSemana === "martes"){
      dia = 1;
    }
    else if (diaDeLaSemana === "miercoles"){
      dia = 2;
    }
    else if (diaDeLaSemana === "jueves"){
      dia = 3;
    }
    else if (diaDeLaSemana === "viernes"){
      dia = 4;
    }
    else if (diaDeLaSemana === "sabado"){
      dia = 5;
    }
    else if (diaDeLaSemana === "domingo"){
      dia = 6
    }

    fetch(ipBackend + "GetTotRepTime/", {
      method: "POST",
      body: JSON.stringify({ "idUsr": window.idUsuario, "contrasenya": window.passwd, "dia": dia })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Error al obtener el minutaje semanal");
    })
    .then(data => {
      this.setState({ segundosReproducidos: data.second});
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

class HistoricoSemanal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      segundosLunes: 10,
      segundosMartes: 20,
      segundosMiercoles: 30, 
      segundosJueves: 40,
      segundosViernes: 50,
      segundosSabado: 60,
      segundosDomingo: 70,
    };
  }

  componentDidMount() {
    const diasDeLaSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
    const promesas = [];
    let segundosLunes = 0;
    let segundosMartes = 0;
    let segundosMiercoles = 0;
    let segundosJueves = 0;
    let segundosViernes = 0;
    let segundosSabado = 0;
    let segundosDomingo = 0;
  
    for (let i = 0; i < 7; i++) {
      promesas.push(
        fetch(ipBackend + "GetTotRepTime/", {
          method: "POST",
          body: JSON.stringify({ "idUsr": window.idUsuario, "contrasenya": window.passwd, "dia": i})
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`Error al obtener el minutaje semanal para el día ${diasDeLaSemana[i]}`);
        })
        .then(data => {
          if (i === 0){
            segundosLunes = data.second;
          }
          else if (i === 1){
            segundosMartes = data.second;
          }
          else if (i === 2){
            segundosMiercoles = data.second;
          }
          else if (i === 3){
            segundosJueves = data.second;
          }
          else if (i === 4){
            segundosViernes = data.second;
          }
          else if (i === 5){
            segundosSabado = data.second;
          }
          else if (i === 6){
            segundosDomingo = data.second;
          }
        })
      );
    }
    
    Promise.all(promesas)
      .then(() => {
        this.setState({
          segundosLunes: segundosLunes,
          segundosMartes: segundosMartes,
          segundosMiercoles: segundosMiercoles,
          segundosJueves: segundosJueves,
          segundosViernes: segundosViernes,
          segundosSabado: segundosSabado,
          segundosDomingo: segundosDomingo
        });
      })
      .catch(error => toast.error(error.message));
  }
    
  render(){
    const diaDeLaSemana = moment().locale('es').format('dddd');

     const { segundosLunes } = this.state;
    const { segundosMartes } = this.state;
    const { segundosMiercoles } = this.state;
    const { segundosJueves } = this.state;
    const { segundosViernes } = this.state;
    const { segundosSabado } = this.state;
    const { segundosDomingo } = this.state;

    return(
      <div className="bg-blue_7th" >
        <div className="text-center my-5 justify-content-center row gx-5">
          <h1 className="display-5 fw-bolder text-white mb-2">Estadísticas de reproducciones globales</h1>
        </div>
        <div className="text-center my-5 justify-content-center row gx-5">
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white text-bald">Estadísticas de los últimos 7 días a día {diaDeLaSemana}</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white">Se han reproducido {segundosLunes} segundos de audio el lunes</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white">Se han reproducido {segundosMartes} segundos de audio el martes</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white">Se han reproducido {segundosMiercoles} segundos de audio el miércoles</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white">Se han reproducido {segundosJueves} segundos de audio el jueves</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white">Se han reproducido {segundosViernes} segundos de audio el viernes</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white">Se han reproducido {segundosSabado} segundos de audio el sábado</p>
          <p className="subtitulo-formArtista subtitulo-formArtista-lg mb-3 text-white">Se han reproducido {segundosDomingo} segundos de audio el domingo</p>
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

class ResultadosBusquedaGlobal extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      "listaResultados" : []
    }

    if(this.props.listaResultados !== undefined){
      this.state.listaResultados = this.props.listaResultados
    }
  }

  lanzarReproductor(idAudio){
  
    window._idAudioReproduciendo = idAudio;
    return menuPrincipal();

  }

  render(){
    return(
      <div class="bg-blue_7th py-5 main" style={{display : "flex", flexDirection : "column"}}>
        {
          this.state.listaResultados.map(resultado => {
            return (
              <div style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
                <h4 class="text-center text-white my-2" key={resultado.nombre}>{resultado.nombre}</h4>
                <PlayNoTransition onClick={() => this.lanzarReproductor(resultado.idAudio)}/>
              </div>
            )
          })
        }
      </div>
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
  
  if (email === "" || contra === ""){
      toast.warning("Complete todos los campos para iniciar sesión");
      
      return false;
  }

  fetch(ipBackend + "ValidateUser/", {
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
  })
  .catch(error => toast.error(error.message))
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
    return false;
  }

  fetch(ipBackend + "RecuperarContrasenya/", {
    method : "POST",
    body : JSON.stringify({"email" : window.email, "codigo" : code, "contrasenya" : contra})
  }).then(function(response){
    if(response.ok){
      response.json().then(function(data){
      console.log(data);
      if (200 !== data.code){
        toast.error("El código es incorrecto");
      }
      else{
        return menuPrincipal();
      }
    }).catch(function(error){
      console.error('Error al analizar la respuesta JSON:', error);
    })
    }
    else{
      toast.error("Ha habido un problema en la función");
    }
  }).catch(error => toast.error(error.message))
}

function editar_foto_perfil (){
  // TODO
  toast.error("Funcionalidad no implementada");

  DjangoAPI.getRecomendedAudio(window.idUsuario, window.passwd).then(data => {
    console.log(data)
  })
}

function enviar_peticion_artista(text){
  fetch(ipBackend + "AskAdminToBeArtist/", {
    method : "POST",
    body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "mensaje": text})
  }).then(function(response){
    console.log(response)
    if(response.ok){
      response.json().then(function(data){
        window.idUsuario = data.idUsr;
        return menuPrincipal();
      }).catch(function(error){
        console.error('Error al analizar la respuesta JSON:', error);
      })
    }
  })
  .catch(error => toast.error(error.message))
  return menuPrincipal();
}

function enviar_contenido_artista(){
  let ficheroAudio = document.getElementById("fichero_audio");
  let ficheroImagen = document.getElementById("fichero_imagen");
  let metadatos = {};

  metadatos.nombre = (document.getElementById("nombreAudio")).value;
  metadatos.duracion = (document.getElementById("duracionAudio")).value;
  metadatos.genero = "1";
  metadatos.numReproducciones = 0;
  metadatos.valoracion = 0;
  metadatos.esPodcast = 0;
  metadatos.calidad = DjangoAPI.CALIDAD_BAJA

  if (ficheroAudio.files.length === 0) {
    toast.warning("Debes subir al menos un fichero de audio")
  } else {
    // Se ha seleccionado al menos un archivo
    if(ficheroImagen.files.length === 0) {
      toast.warning("Debes asignarle una imagen a tu audio")
    } else {
      DjangoAPI.getUser(window.idUsuario, window.passwd, window.idUsuario).then(usuario => {
        metadatos.artista = usuario.alias
        DjangoAPI.setSong(window.idUsuario, window.passwd, metadatos, ficheroAudio).then((idAudio) => {
          DjangoAPI.setImagenAudio(window.idUsuario, window.passwd, idAudio , ficheroImagen)
        })
      })
    }
  }
}

//TODO: si da tiempo hay una función en el backend que te permite ver si un usuario está suscrito
// si el perfil visitado es artista y estamos suscritos debe aparecer el botón de desuscribirse
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
  let amigo = (document.getElementById("idAmigo")).value
  
  fetch(ipBackend + "AskFriend/", {
    method: "POST",
    body: JSON.stringify({ "idUsr": window.idUsuario, "contrasenya": window.passwd, "idAmigo": amigo})
  }).then(response => {
    if (response.ok) {
      response.json().then(data => {
        if (data === 200) {
          toast.success("Solicitud de amistad enviada con éxito");
        } 
        else {
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

class BotonUltimaEscucha extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      "mostrar" : false,
      "lastIdAudio" : "idAudio:2",
      "lastSecondHeared" : 0
    };
  }

  componentDidMount(){
    this.hay_ultima_escucha().then(hay => this.setState({"mostrar": hay}))
  }

  hay_ultima_escucha(){
    return new Promise((resolve, reject) => {
      DjangoAPI.getUser(window.idUsuario, window.passwd, window.idUsuario).then(usuario => {
        DjangoAPI.getLastSecondHeared(window.idUsuario, window.passwd, usuario.idUltimoAudio).then(
          segundo => {
            console.log(segundo, usuario.idUltimoAudio)
            this.setState({"lastIdAudio" : usuario.idUltimoAudio, "lastSecondHeared" : segundo})
            resolve(parseFloat(segundo) !== 0)
          }
        )
        .catch(error => reject(error))
        
      })
    })
  }

  recuperarSegundo = () => {

    console.log(window.player)

    if(window._idAudioReproduciendo !== this.state.lastIdAudio){
      window.ultimoSegundo = this.state.lastSecondHeared;
      window.idAudioReproduciendo = this.state.lastIdAudio;
    }else{
      window.player.mover(this.state.lastSecondHeared)
    }
  }

  render(){
    return(this.state.mostrar ?
      <ButtonGroup>
            <Button id="" onClick={this.recuperarSegundo} text="Última escucha"/>
      </ButtonGroup> : <></>
    )
  }
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
      <BarraNavegacionApp active='3'/>
      <ListaTopDiario/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function Profile(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp active='2'/>
      <PerfilUsuario/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function BecomeArtist(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp active='2'/>
      <FormularioArtista/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function UploadSong(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
    <BarraNavegacionApp active='2'/>
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

function PlayListContenidoListar(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <ListaReproduccionContenido/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function CarpetaContenidoListar(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <CarpetaListasContenido/>
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

function AnyadirCancionListar(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <ListarCancionesAnyadirListasReproduccion/>
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

function Folders2(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <Carpetas2/>
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

function Friends(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <ListaAmigos/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function MySongs(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp active='2'/>
      <CancionesArtista/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function Statistics(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp active='2'/>
      <MinutajeSemanal/>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

function StatisticHistory(){
  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp active='2'/>
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
      <MenuPrincipal ref={window.menuPrincipal}/>
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

function BusquedaGlobal(){

  let view = React.createRef();
  let busqueda = (document.getElementById("busqueda")).value
  let lista = new Array()
  DjangoAPI.globalSearch(busqueda, 10).then(resultado => {
    
    resultado.audios.map(async (idAudio) => {
      await DjangoAPI.getSong(window.idUsuario, window.passwd, idAudio)
      .then((datos) =>{
          let pair = {
            "nombre" : datos.nombre,
            "idAudio" : idAudio
          } 
          lista.push(pair);
      });
      view.current.setState({"listaResultados" : lista})
    })
  })

  return(
    <div className="menu" style={{"display" : "flex", "flex-direction" : "column", "minHeight" : "100vh"}}>
      <BarraNavegacionApp/>
      <ResultadosBusquedaGlobal ref={view}/>
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

function cancionesListaDeReproduccion(){
  root.render(<PlayListContenidoListar/>)
}

function listasCarpetas(){
  root.render(<CarpetaContenidoListar/>)
}

function nuevaCarpeta(){
  window.origenPasoCarpetaALista = constCarpetaNueva;
  root.render(<CarpetaContenido/>)
}

function contenidoListaDeReproduccion(indice){
  window.idLista = indice;
  window.origenPasoListaRepACanciones = constListaExistente;
  root.render(<PlayListContenido/>);
}

function contenidoCarpeta(idCarpeta){
  window.idCarpeta = idCarpeta;
  root.render(<CarpetaContenido/>);
}

function anyadirCancionListaRep(){
  root.render(<AnyadirCancionLista/>)
}

function anyadirCancionListar(){
  root.render(<AnyadirCancionListar/>)
}

function anyadirListaCarpeta(){
  root.render(<AnyadirListaCarpeta/>)
}

function misCarpetas(){
  root.render(<Folders/>)
}

function misCarpetas2(){
  root.render(<Folders2/>)
}

function amigos(){
  root.render(<Friends/>)
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

function busquedaGlobal(){
  root.render(<BusquedaGlobal/>)
}

export default App;
