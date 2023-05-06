
import './Style.css';
import React, { StrictMode, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components"
import H5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { BsSliders2Vertical, BsBarChartLineFill } from 'react-icons/bs';
import { MdShuffleOn, MdOutlineShuffle, MdRepeatOn, MdRepeat, MdArrowUpward, MdArrowDownward} from 'react-icons/md'
import * as DjangoAPI from './Django_API';
import * as Tone from 'tone';

import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
const ipBackend = "http://127.0.0.1:8081/";
const tipoListaReproduccion = "listaReproduccion";
window.password = "example";
window.idUsuario = "example";
window.listasReproduccion = "example";
window.nombreNuevaListaReproduccion = "Nueva lista de reproducción";
window.calidad = "baja";

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
    this.setState(prevState => ({
      loop: !prevState.loop
    }));
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

class Shuffle_Button extends React.Component{
  constructor(props){
    super(props)

    this.state = {"shuffle" : false};
  }

  switch_state = () => {
    this.setState(prevState => ({
      shuffle: !prevState.shuffle
    }));
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

    this.state = {'audioSrc' : '', 
    'loop' : 0,
    eq: new Tone.EQ3(-10, 0, 10),}

    let x = 2;
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

  ecualiza() {
    try {
      console.log(this.reproductor.current.audio.current);
      const mediaElement = Tone.context.createMediaElementSource(this.reproductor.current.audio.current);
      const gainNode = new Tone.Gain();
      console.log(mediaElement)
      console.log(gainNode)
      const reverb = new Tone.Reverb(3).toDestination();
      mediaElement.connect(gainNode);
    } catch (error) {
      console.error(error);
    }
  }

  enable_loop = () =>{
    //console.log(DjangoAPI.prueba());
    if(this.state.loop === 0){
      toast.info("Reproduccion en bucle habilitada")
      this.state.loop = 1;
    }else{
      toast.info("Reproduccion en bucle deshabilitada")
      this.state.loop = 0;
    }
  }

  render(){

    return (
        <div style={{"display" : "flex"}}>
          <H5AudioPlayer
            ref={this.reproductor}
            id='reproductor'
            src={this.state.audioSrc}
            autoPlay={false}
            volume={0.2}
            showFilledVolume={true}
            showSkipControls={true}
            customAdditionalControls={[
              <BsSliders2Vertical class="rhap_repeat-button rhap_button-clear" onClick={this.ecualiza.bind(this)}/>,
            ]}
            customControlsSection={[
              RHAP_UI["ADDITIONAL_CONTROLS"],
              <Repeat_Button/>,
              RHAP_UI["MAIN_CONTROLS"],
              <Shuffle_Button/>,
              RHAP_UI["VOLUME_CONTROLS"]
            ]}
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

class PerfilUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      esArtista: true,
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
                <ButtonSmall
                  onClick={ver_reproducciones_artista}
                  id=""
                  text = {<BsBarChartLineFill />}
                />
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
                  {this.state.esArtista == false && (
                    <ButtonOnClick
                      onClick={serArtista}
                      id=""
                      text="Conviértete en artista"
                    />
                  )}
                  {this.state.esArtista == true && (
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
              <input class="subcuerpo-formArtista fw-normal text-white" type="file" accept=".wav,.mp3" />
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
    this.state = {hayListasReproduccion: false};
  }

  componentDidMount() {
    fetch(ipBackend + "GetListasUsr/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd})
    }).then(function(response){
      if(response.ok){
        response.json().then(function(data){
          if (data.listas.length > 0){
            data.listas.forEach(function(lista, index){
              fetch(ipBackend + "GetLista/", {
                method : "POST",
                body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "idLista" : lista})
              }).then(function(response){
                  if(response.ok){
                    response.json().then(function(datos){
                      if (datos.lista.tipoLista == tipoListaReproduccion){
                        this.state.hayListasReproduccion = true;
                        console.log("Cris: datos lista: ", datos.lista)
                      } else {
                        console.log("Cris: no es reproducción, var = ")
                      }
                    })
                  } else{
                    toast.error("El usuario o la contraseña son incorrectos")
                  }
                }).catch(error => toast.error(error.message))
            })
          }
        }).catch(function(error){
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("El usuario o la contraseña son incorrectos")
      }
    }).catch(error => toast.error(error.message))
  }

  // <PlaylistSortSelector onChange={handleSortChangeFolders} /> servira para las carpetas
  // style={{"padding-bottom" : "1rem"}} abajo
  // style={{"margin-top" : "3rem"}} arriba en container

  // <header class="bg-blue_7th py-5" >
  //         <div class="container px-5">
  //           <div class="row gx-5 justify-content-center">
  //             <div class="col-lg-6">
  //               <div class="text-center my-5">
  //                 <h1 class="display-5 fw-bolder text-white mb-2">Mis listas de reproducción</h1>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </header>
  render(){
    return (
      <>
        <header class="bg-blue_7th" >
          <div class="text-center my-5 justify-content-center row gx-5">
            <h1 class="display-5 fw-bolder text-white mb-2">Mis listas de reproducción</h1>
          </div>
        </header>
        <body>
          <div class="text-center my-5 justify-content-center row gx-5">
            {this.state.hayListasReproduccion ? (
              <mostrar_listas_reproduccion playlists={window.listasReproduccion} />
            ) : (
              <p class="display-6 fw-bolder text-white mb-2">No tiene listas de reproducción</p>
            )}
          </div>
          <div class="text-center my-5 justify-content-center row gx-5">
            <div class="d-flex justify-content-center">
              <ButtonOnClick onClick={nuevaListaDeReproduccion} id="" text="Crear nueva lista"/>
            </div>
          </div>
        </body>
      </>
    )
  }
}

const handleSortChangeFolders = (value) => {
  //setSortKey(value);
};

const PlaylistSortSelector = ({ onChange }) => {
  const handleSortChangeFolders = (event) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <select onChange={handleSortChangeFolders}>
      <option value="tematica">Temática</option>
      <option value="titulo">Título</option>
      <option value="artista">Artista</option>
      <option value="idioma">Idioma</option>
    </select>
  );
};

class NuevaListaReproduccionContenido extends React.Component{

  constructor(props) {
    super(props);
    this.state = {listas: "", nombreLista: ""};
  }

  componentDidMount() {
    fetch(ipBackend + "SetLista/", {
      method : "POST",
      body : JSON.stringify({"idUsr" : window.idUsuario, "contrasenya" : window.passwd, "tipoLista": tipoListaReproduccion, "nombreLista": window.nombreNuevaListaReproduccion})
    }).then(function(response){
      if(response.ok){
        response.json().then(function(data){
          // Lista creada
        }).catch(function(error){
          console.error('Error al analizar la respuesta JSON:', error);
        })
      }else{
        toast.error("El usuario o la contraseña son incorrectos")
      }
    }).catch(error => toast.error(error.message))
    console.log("Cris: nombre recargado:", window.nombreNuevaListaReproduccion);
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
                  <ButtonOnClick onClick={anyadirCancionListaRep} id="" text="Añadir canciones"/>
                  <ShuffleButtonNoTransition class="rhap_repeat-button rhap_button-clear" onClick={reproduccionAleatoria}/>
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

function FormularioRenombre({ nombre }) {
  const [nombreEditando, setNombreEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(nombre);

  function handleNombreCambiado(e) {
    e.preventDefault();
    window.nombreNuevaListaReproduccion = nuevoNombre;
    setNombreEditando(false);
    // Cris TODO llevar el cambio al backend
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
    }).catch(error => toast.error(error.message))
  }


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
  //   }).catch(error => toast.error(error.message))
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

function ver_reproducciones_artista(){
  // TODO
  toast.error("Funcionalidad no implementada");
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
  root.render(<PlayListContenido/>)
}

function anyadirCancionListaRep(){
  root.render(<AnyadirCancionLista/>)
}

function reproduccionAleatoria(){
  root.render(<PlayListContenido/>)
}

export default App;
