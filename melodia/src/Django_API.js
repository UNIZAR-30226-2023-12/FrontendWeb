/* eslint-disable no-unused-vars */
import { ToastContainer, toast } from 'react-toastify';

//const ipBackend = "http://django.cncfargye8h5eqhw.francecentral.azurecontainer.io:8081/"; // azure
const ipBackend = "http://localhost:8081/"; // cris local
//const ipBackend = "http://192.168.56.1:8081/"; // ismael
//const ipBackend = "http://ec2-3-83-121-162.compute-1.amazonaws.com:8081/" // aws deployment

const GENERO_POP = 0
const GENERO_ROCK = 1
const GENERO_METAL = 2
const GENERO_RAP = 3
const GENERO_REGGAE = 4
const GENERO_JAZZ = 5
const GENERO_BLUES = 6
const GENERO_CLASICA = 7
const GENERO_ELECTRONICA = 8
const GENERO_FOLK = 9
const GENERO_LATINA = 10
const GENERO_INDIE = 11
const GENERO_COUNTRY = 12
const GENERO_AMBIENT = 13
const GENERO_TRAP = 14
const GENERO_DANCE = 15
const GENERO_HIPHOP = 16
const GENERO_RNB = 17
const GENERO_SOUL = 18
const GENERO_PUNK = 19
const GENERO_FUNK = 20
const GENERO_NUMERO_GENEROS = 21

const RECOMENDADOR_TAMANYO_VENTANA_PREDICCION = 10

// Sets globales
const PREFIJO_LISTA_GLOBAL_CANCIONES = "listaGlobalCanciones"
const PREFIJO_LISTA_GLOBAL_USUARIOS = "listaGlobalUsuarios"
const PREFIJO_LISTA_GLOBAL_ARTISTAS = "listaGlobalArtistas"
const PREFIJO_LISTA_GLOBAL_PODCASTS = "listaGlobalPodcasts"

// Constantes simbólicas de las claves de los atributos de usuario
const CLAVE_CONTADOR_USUARIOS = "contadorUsuarios"
const CLAVE_ID_USUARIO = "idUsr"
const CLAVE_ID_USUARIO_OBJETIVO = "idUsr2"
const CLAVE_ID_USUARIO_ARTISTA = "idUsrArtista"
const CLAVE_ID_USUARIO_GET = "idUsrGet"
const CLAVE_EMAIL = "email"
const CLAVE_ALIAS = "alias"
const CLAVE_CONTRASENYA = "contrasenya"
const CLAVE_TIPO_USUARIO = "tipoUsuario"
const CLAVE_ID_ULTIMO_AUDIO = "idUltimoAudio"
const CLAVE_IMAGEN_PERFIL = "imagenPerfil"
const CLAVE_QUERY = "query"
const CLAVE_N = "n"
const CLAVE_TEMPORAL_ENTRENAMIENTO = "datos_temporales"

// const Prefijos de las claves relacionadas con los usuarios
const PREFIJO_ID_USUARIO = "usuario"
const PREFIJO_AMIGOS = "amigos"
const PREFIJO_ARTISTAS_SUSCRITOS = "artistas"
const PREFIJO_NOTIFICACIONES = "notificaciones"
const PREFIJO_CARPETAS = "carpetas"
const PREFIJO_SEGUNDOS_AUDIOS = "segundosAudios"

// Claves para hash de ultimosAudios
const CLAVE_SEGUNDOS = "segundos"

// Clave de set de ids de administradores
const CLAVE_ADMINISTRADORES = "administradores"

// Se usa tambien para acceder al set de listas de Carpeta
const CLAVE_LISTAS = "listas"

// Se usa para acceder a las canciones de un artista
const CLAVE_CANCIONES = "canciones"

// Constantes simbólicas de los tipos de usuario
export const USUARIO_ADMINISTRADOR = "admin"
export const USUARIO_NORMAL = "normalUser"
export const USUARIO_ARTISTA = "artista"

// Constantes simbólicas para los audios
const CLAVE_ID_AUDIO = "idAudio"
const CLAVE_NOMBRE_AUDIO = "nombre"
const CLAVE_GENEROS_AUDIO = "generos"
const CLAVE_DESCRIPCION_AUDIO = "desc"
const CLAVE_ARTISTA_AUDIO = "artista"
const CLAVE_VALORACION_AUDIO = "val"
const CLAVE_NUMERO_REPRODUCCIONES = "nVeces"
const CLAVE_CALIDAD_AUDIO = "calidad"
const CLAVE_FICHERO_ALTA_CALIDAD = "ficheroAltaCalidad"
const CLAVE_FICHERO_BAJA_CALIDAD = "ficheroBajaCalidad"
const CLAVE_PREFIJO_AUDIO = "audio"
const CLAVE_ES_PODCAST = "esPodcast"
const CLAVE_ES_CANCION = "esCancion"
const CLAVE_SECOND = "second"
const CLAVE_ID_AMIGO = "idAmigo"
const CLAVE_IMAGEN_AUDIO = "imagenAudio"

// Constantes simbólicas para las Carpeta
const CLAVE_CONTADOR_CARPETAS = "contadorCarpetas"
const CLAVE_ID_CARPETA = "idCarpeta"
const CLAVE_NOMBRE_CARPETA = "nombreCarpeta"
const CLAVE_PRIVACIDAD_CARPETA = "privacidadCarpeta"
const CLAVE_LISTAS_CARPETA = "listasCarpeta"
const PREFIJO_ID_CARPETA = "carpeta"
const CARPETA_PUBLICA = "publica"
const CARPETA_PRIVADA = "privada"
// Constantes simbólicas para los const prefijos de los sets de carpeta

// Constantes simbólicas para las Notificaciones
const CLAVE_CONTADOR_NOTIFICACIONES = "contadorNotificaciones"
const CLAVE_ID_NOTIFICACION = "idNotificacion"
const CLAVE_TIPO_NOTIFICACION = "tipoNotificacion"
const CLAVE_ID_USUARIO_EMISIOR = "idUsuarioEmisor"
const CLAVE_TITULO_NOTIFICACION = "titulo"
const CLAVE_MENSAJE_NOTIFICACION = "mensaje"
const NOTIFICACION_TIPO_NORMAL = "normal"
const NOTIFICACION_TIPO_AMIGO = "amigo"
const NOTIFICACION_TIPO_SOLICITUD_ARTISTA = "quieroArtista"
const PREFIJO_ID_NOTIFICACION = "notificacion"

// Constantes para mensajes y títulos default
const TITULO_NOTIFICACION_ARTISTA = "Solicitud de artista"
const MENSAJE_NOTIFICACION_ARTISTA = " quiere ser artista"

// Constantes simbólicas para las Lista de reproducción
const CLAVE_CONTADOR_LISTAS = "contadorListas"
const CLAVE_ID_LISTA = "idLista"
const CLAVE_NOMBRE_LISTA = "nombreLista"
const CLAVE_PRIVACIDAD_LISTA = "privada"
const CLAVE_TIPO_LISTA = "tipoLista"
const LISTA_TIPO_REPRODUCCION = "listaReproduccion"
const LISTA_TIPO_FAVORITOS = "listaFavoritos"
const LISTA_TIPO_RANKING = "listaRanking"
const LISTA_PRIVADA = "privada"
const LISTA_PUBLICA = "publica"
const CLAVE_LINK_LISTA = "linkLista"

// Constantes simbólicas de los const prefijos de los sets de listas
const PREFIJO_ID_LISTA = "lista"
const CLAVE_AUDIOS = "audios"
const CLAVE_HASH_EMAIL_ID = "tablaHashEmailId"
const CLAVE_SET_USUARIOS_ENTRENADOS = "usuariosEntrenados"
const CLAVE_LISTA_ENTRENAMIENTO = "listaEntrenamiento"
const PREFIJO_SEGUNDOS_REPRODUCIDOS_AUDIO = "segundosReproducidos"

const CLAVE_ID_ERROR = "idError"

const CORREO_RECUPERACION = "enterprisemussa@gmail.com"
const CONTRASENYA_CORREO_RECUPERACION = "bupkbmfyswswolsu"
const PREFIJO_CODIGO_RECUPERACION = "codigo"
const CLAVE_CODIGO_RECUPERACION = "codigo"

export const CALIDAD_ALTA = "alta"
export const CALIDAD_BAJA = "baja"


export const setSong = (usuario, contrasenya, metadatos, inputNodeAudio) => {

    let archivo = inputNodeAudio.files[0]
    let lector = new FileReader()

    const promesa = new Promise((resolve, reject) => {
        lector.onload = function(evento) {
          let bytes = evento.target.result;
          let base64 = btoa(
            new Uint8Array(bytes)
              .reduce((datos, byte) => datos + String.fromCharCode(byte), '')
          );
          resolve(base64);
        };
    
        lector.onerror = function(evento) {
          reject(evento);
        }
    
        lector.readAsArrayBuffer(archivo);
    });
    
    return new Promise((resolve, reject) => {
        promesa.then( (base64) => {
    
            fetch(ipBackend + "SetSong/", {
                method: "POST",
                body: JSON.stringify({ [CLAVE_ID_USUARIO]: usuario, [CLAVE_CONTRASENYA]: contrasenya, 
                [CLAVE_NOMBRE_AUDIO] : metadatos.nombre, [CLAVE_ARTISTA_AUDIO] : metadatos.artista, genero : metadatos.genero,
                [CLAVE_CALIDAD_AUDIO] : metadatos.calidad, [CLAVE_NUMERO_REPRODUCCIONES] : metadatos.numReproducciones, [CLAVE_VALORACION_AUDIO] : metadatos.valoracion,
                [CLAVE_PREFIJO_AUDIO] : base64, "longitud" : metadatos.duracion, [CLAVE_ES_PODCAST] : metadatos.esPodcast}),
            }).then(response => {
                if(response.ok){
                    toast.success("Cancion publicada con éxito!!")
                    response.json().then(data => {resolve(data.idAudio)})
                }else{
                    toast.error("Hubo un error al publicar la canción")
                }
            })
            .catch(error => reject(error))
        }) 
    })
}

export const getSong = (usuario, contrasenya, idAudio) => {
    return new Promise((resolve, reject) => {
        fetch(ipBackend + "GetSong/",{
            method : "POST",
            body : JSON.stringify({[CLAVE_ID_USUARIO] : usuario, [CLAVE_CONTRASENYA]: contrasenya, [CLAVE_ID_AUDIO] : idAudio})
        }).then(response => response.json().then(data => {
            resolve(data.idAudio)
        }))
        .catch(error => reject(error))
    })
}

export const getFicheroSong = (usuario, idAudio, esPodcast, calidad) => {

    let esCancionString, calidadString

    if(esPodcast){
        esCancionString = "False";
    }else{
        esCancionString = "True";
    }

    if(calidad === CALIDAD_ALTA){
        calidadString = "True";
    }else{
        calidadString = "False";
    }

    return new Promise((resolve, reject) => {

        let parametros = {[CLAVE_ID_USUARIO] : usuario, [CLAVE_ID_AUDIO] : idAudio, [CLAVE_CALIDAD_AUDIO] : calidadString, [CLAVE_ES_CANCION] : esCancionString};
        let parametrosGET = new URLSearchParams(parametros).toString();

        fetch(ipBackend + "GetFicheroSong/?" + parametrosGET ,{
            method : "GET"
        }).then((response) => response.json().then(
            data => {

                // Decodificamos la cadena base64 en un array de bytes
                const byteCharacters = atob(data.fichero);

                // Comprobamos si es un fichero mp3 o wav
                let blobType;
                if (byteCharacters.slice(0, 3) === "ID3") {
                    blobType = 'audio/mp3';
                } else if (byteCharacters.slice(0, 4) === "RIFF") {
                    blobType = 'audio/wav';
                } else {
                    throw new Error('Tipo de archivo desconocido');
                }

                // Creamos un array de bytes a partir de los caracteres decodificados
                const byteNumbers = new Array(byteCharacters.length)
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i)
                }
                const byteArray = new Uint8Array(byteNumbers)

                // Creamos un objeto Blob a partir del array de bytes
                const blob = new Blob([byteArray], { type: blobType })

                resolve(blob);
            }
        )).catch(error => reject(error))
    })
}

export const setImagenAudio = (usuario, contrasenya, idAudio, inputNodeImage) => {
    let imagenBase64;

    // Leer archivo de imagen y convertirlo a base64
    let archivoImagen = inputNodeImage.files[0]
    let lectorImagen = new FileReader()

    const promesaImagen = new Promise((resolve, reject) => {
        lectorImagen.onload = function(evento) {
          let bytes = evento.target.result;
          imagenBase64 = btoa(
            new Uint8Array(bytes)
              .reduce((datos, byte) => datos + String.fromCharCode(byte), '')
          );
          resolve();
        };
    
        lectorImagen.onerror = function(evento) {
          reject(evento);
        }
    
        lectorImagen.readAsArrayBuffer(archivoImagen);
    });

    promesaImagen.then(() => {
        fetch(ipBackend + "SetImagenAudio/", {
            method : "POST",
            body : JSON.stringify({[CLAVE_ID_USUARIO]: usuario, [CLAVE_CONTRASENYA]: contrasenya, [CLAVE_ID_AUDIO] : idAudio, [CLAVE_IMAGEN_AUDIO] : imagenBase64})
        }).then(response => {
            if(response.ok){
                toast.success("Imagen adjuntada con éxito!!")
            }else{
                toast.error("Hubo un error al colocar la imagen")
            }
        })
    })
}

export const getImagenAudio = (usuario, contrasenya, idAudio) => {
    return new Promise((resolve, reject) => {
        fetch(ipBackend + "GetImagenAudio/",{
            method : "POST",
            body : JSON.stringify({[CLAVE_ID_USUARIO] : usuario, [CLAVE_CONTRASENYA]: contrasenya, [CLAVE_ID_AUDIO] : idAudio})
        }).then(response => response.json().then(data => {

            // Decodificamos la cadena base64 en un array de bytes
            const byteCharacters = atob(data.imagenAudio);

            // Creamos un array de bytes a partir de los caracteres decodificados
            const byteNumbers = new Array(byteCharacters.length)
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i)
            }
            const byteArray = new Uint8Array(byteNumbers)

            // Creamos un objeto Blob a partir del array de bytes
            const blob = new Blob([byteArray], { type: 'image/*' })

            resolve(blob);
        }))
        .catch(error => reject(error))
    })
}

export const getRecomendedAudio = (usuario, contrasenya) => {
    return new Promise((resolve, reject) => {
        fetch(ipBackend + "GetRecomendedAudio/", {
            method : "POST",
            body : JSON.stringify({[CLAVE_ID_USUARIO]: usuario, [CLAVE_CONTRASENYA]: contrasenya})
        }).then(response => response.json().then(data => {
            console.log(data)
            resolve(data)
        })).catch(error => reject(error))
    })
}

export const setLastSecondHeared = (usuario, contrasenya, audio, segundos) => {

    fetch(ipBackend + "SetLastSecondHeared/", {
        method: "POST",
        body: JSON.stringify({  [CLAVE_ID_USUARIO]: usuario, [CLAVE_CONTRASENYA]: contrasenya, 
                                [CLAVE_ID_AUDIO]: audio, [CLAVE_SECOND]: segundos})
    })

}

export const getLastSecondHeared = (usuario, contrasenya, audio) => {

    return new Promise((resolve, reject) => {
        fetch(ipBackend + "GetLastSecondHeared/", {
            method: "POST",
            body: JSON.stringify({  [CLAVE_ID_USUARIO]: usuario, [CLAVE_CONTRASENYA]: contrasenya, 
                                    [CLAVE_ID_AUDIO]: audio})
        }).then(response => response.json().then(data => {
            resolve(data.second)
        }))
        .catch(error => reject(error))
    })

}

export const getImageAudio = (usuario, contrasenya, audio) => {

    return new Promise((resolve, reject) => {
        fetch(ipBackend + "GetImagenAudio/", {
            method : "POST",
            body : JSON.stringify({[CLAVE_ID_USUARIO]: usuario, [CLAVE_CONTRASENYA]: contrasenya, [CLAVE_ID_AUDIO]: audio})
        }).then(response => response.json().then(
            data => {
                resolve(data.imagenAudio)
            }
        ))
        .catch(error => reject(error))
    })
}

export const getImagenPerfilUsr = (usuario, contrasenya, usuarioObjetivo) => {

    return new Promise((resolve, reject) => {
        fetch(ipBackend + "GetImagenPerfilUsr/", {
            method : "POST",
            body : JSON.stringify({[CLAVE_ID_USUARIO]: usuario, [CLAVE_CONTRASENYA]: contrasenya, [CLAVE_ID_USUARIO_OBJETIVO]: usuarioObjetivo})
        }).then(response => response.json().then(
            data => {
                // Decodificamos la cadena base64 en un array de bytes
                const byteCharacters = atob(data.imagenPerfil);

                // Creamos un array de bytes a partir de los caracteres decodificados
                const byteNumbers = new Array(byteCharacters.length)
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i)
                }
                const byteArray = new Uint8Array(byteNumbers)

                // Creamos un objeto Blob a partir del array de bytes
                const blob = new Blob([byteArray], { type: 'image/*' })

                resolve(blob);
            }
        ))
        .catch(error => reject(error))
    })
}

export const getUser = (usuario, contrasenya, usuarioObjetivo) => {

    return new Promise((resolve, reject) => {
        fetch(ipBackend + "GetUser/", {
            method : "POST",
            body : JSON.stringify({[CLAVE_ID_USUARIO]: usuario, [CLAVE_CONTRASENYA]: contrasenya, [CLAVE_ID_USUARIO_GET]: usuarioObjetivo})
        }).then(response => response.json().then(
            data => {
                resolve(data);
            }
        ))
        .catch(error => reject(error))
    })
}

export const getSongsArtist = (usuario, contrasenya, artista) => {
    return new Promise((resolve, reject) => {
        fetch(ipBackend + "GetSongsArtist/", {
            method: "POST",
            body: JSON.stringify({ [CLAVE_ID_USUARIO] : usuario, [CLAVE_CONTRASENYA] : contrasenya, [CLAVE_ID_USUARIO_ARTISTA] : artista})
        }).then((response) => response.json().then(listSongs => {
            resolve(listSongs.canciones)
        }))
        .catch(error => reject(error))
    })
}

export const getLinkAudio = (usuario, contrasenya, audio) => {
    return new Promise((resolve, reject) => {
        fetch(ipBackend + "GetLinkAudio/", {
            method: "POST",
            body: JSON.stringify({ [CLAVE_ID_USUARIO] : usuario, [CLAVE_CONTRASENYA] : contrasenya, [CLAVE_ID_AUDIO] : audio})
        }).then((response) => response.json().then(data => {
            resolve(data.linkAudio)
        }))
        .catch(error => reject(error))
    })
}

export const globalSearch = (query, numResultados) => {
    return new Promise((resolve, reject) => {
        fetch(ipBackend + "GlobalSearch/", {
            method: "POST",
            body: JSON.stringify({ [CLAVE_QUERY] : query, [CLAVE_N] : numResultados})
        }).then(response => response.json().then(resultado => {
            resolve(resultado)
        })).catch(error => reject (error))
    })
}

export const getValoracion = (usuario, idAudio) => {
    return new Promise((resolve, reject) => {
        fetch(ipBackend + "GetValoracion/", {
            method: "POST",
            body: JSON.stringify({ [CLAVE_ID_USUARIO] : usuario, [CLAVE_ID_AUDIO] : idAudio})
        }).then(response => response.json().then(resultado => {
            resolve(parseFloat(resultado.valoracion))
        })).catch(error => reject (error))
    })
}