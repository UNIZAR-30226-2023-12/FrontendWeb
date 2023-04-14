
import './Style.css';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

class BarraNavegacion extends React.Component{
  render(){
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-blue_4th">
              <div class="container px-5">
                  <a class="navbar-brand" href="#!">Melodia</a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                          <li class="nav-item"><a class="nav-link active" aria-current="page" onClick={principal}>Inicio</a></li>
                          <li class="nav-item"><a class="nav-link" onClick={inicioSesion}>Iniciar Sesión</a></li>
                          <li class="nav-item"><a class="nav-link" href="signin.html">Registrarse</a></li>
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
  /*
    constructor(props){
      super(props)
    }
  */

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
            <div class="container px-5">
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-6">
                        <div class="text-center my-5">
                            <h1 class="display-5 fw-bolder text-white mb-2" style={{"padding-bottom" : "1 rem"}}>Iniciar Sesión</h1>
                                <form id="contactForm" style={{"margin" : "auto", "max-width" : "20rem", "width" : "100%", "align-self": "center"}}>
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="name" type="text" placeholder="Introduce tu nombre de Usuario"/>
                                        <label for="name">Usuario</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input class="form-control" id="passwd" type="password" placeholder="Introduce tu Contraseña"/>
                                        <label for="passwd">Contraseña</label>
                                    </div>
                                    <button class="btn btn-primary_blue_4th btn-lg px-4 me-sm-3" id="submitButton" type="submit" >Iniciar Sesión</button>
                                </form>
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

class Footer extends React.Component{
  render(){
    return (
        <>
          <footer class="py-5 bg-blue_4th">
              <div class="container px-5"><p class="m-0 text-center text-white">Copyright &copy; Mussa Enterprise 2023</p></div>
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

export default App;
