// const ipBackend = "http://127.0.0.1:8081/"; // cristina
const ipBackend = "http://192.168.56.1:8081/"; // ismael

const CLAVE_ID_USUARIO = "idUsr"
const CLAVE_EMAIL = "email"
const CLAVE_CONTRASENYA = "contrasenya"

const CLAVE_NOMBRE_AUDIO = "nombre"
const CLAVE_PREFIJO_AUDIO = "audio"
const CLAVE_ES_PODCAST = "esPodcast"

export const postSong = (usuario, contrasenya, cancion) => {

    let bytes;
    let base64_file;

    // Suponiendo que tienes el nombre del archivo en una variable llamada "filename"
    let file = new File([cancion], cancion); 

    let reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = function() {
        let arrayBuffer = reader.result;
        bytes = new Uint8Array(arrayBuffer);
        let decoder = new TextDecoder("utf-8");
        base64_file = btoa(decoder.decode(bytes));
    };
   
    fetch(ipBackend + "SetSong/", {
        method: "POST",
        body: JSON.stringify({ CLAVE_ID_USUARIO: usuario, CLAVE_CONTRASENYA: contrasenya, CLAVE_NOMBRE_AUDIO:"TestSong", CLAVE_PREFIJO_AUDIO : base64_file, CLAVE_ES_PODCAST : false, "longitud" : 2, "genero" : 1, "calidad":, "artista":}),
    })
}
