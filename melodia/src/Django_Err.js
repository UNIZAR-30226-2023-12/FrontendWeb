export const OK = 200
export const FORBIDDEN = 403

// No poner errores menores al 515, están reservados para el estandar HTTP
// Constantes para los errores de audios
export const ERROR_CANCION_NO_ENCONTRADA = 519
export const ERROR_CANCION_NO_ELIMINADA = 520
export const ERROR_CANCION_NO_MODIFICADA = 521
export const ERROR_CANCION_NO_ANYADIDA = 522
export const ERROR_CANCION_ELEMENTOS_FALTANTES = 523
export const ERROR_CANCION_ELEMENTOS_VACIOS = 524
export const ERROR_PODCAST_NO_ENCONTRADO = 525
export const ERROR_PODCAST_NO_ELIMINADO = 526
export const ERROR_PODCAST_NO_MODIFICADO = 527
export const ERROR_PODCAST_NO_ANYADIDO = 528
export const ERROR_PODCAST_ELEMENTOS_FALTANTES = 529
export const ERROR_PODCAST_ELEMENTOS_VACIOS = 530

// Constantes para los errores de usuarios
export const ERROR_USUARIO_NO_ENCONTRADO = 531
export const ERROR_USUARIO_PARAMETROS_INCORRECTOS = 532
export const ERROR_CONTRASENYA_INCORRECTA = 533
export const ERROR_USUARIO_EMAIL_YA_EXISTE = 539
export const ERROR_USUARIO_NO_ADMINISTRADOR = 540
export const ERROR_USUARIO_TIPO_NO_VALIDO = 550
export const ERROR_USUARIO_YA_SUSCRITO = 554
export const ERROR_USUARIO_NO_SUSCRITO = 555
export const ERROR_USUARIO_YA_ES_ARTISTA = 557
export const ERROR_USUARIO_NO_ARTISTA = 558
export const ERROR_USUARIO_CODIGO_RECUPERACION_INCORRECTO = 559

// Constantes para los errores de listas de reproducción
export const ERROR_LISTA_NO_ENCONTRADA = 534
export const ERROR_LISTA_PARAMETROS_INCORRECTOS = 535
export const ERROR_LISTA_TIPO_INCORRECTO = 551
export const ERROR_LISTA_PRIVACIDAD_INCORRECTA = 556
export const ERROR_AUDIO_NOT_IN_LISTA = 552
export const ERROR_LISTA_ES_FAVORITOS = 560

// Constantes para los errores de notificaciones
export const ERROR_NOTIFICACION_NO_ENCONTRADA = 536
export const ERROR_TIPO_NOTIFICACION_NO_VALIDA = 537
export const ERROR_NOTIFICACION_NO_SOLICITUD_ARTISTA = 541

// Constantes para los errores de administradores y artistas
export const ERROR_NO_SE_HA_PODIDO_CAMBIAR_TIPO_USUARIO = 538

// Constantes para los errores de carpetas
export const ERROR_CARPETA_PARAMETROS_INCORRECTOS = 542
export const ERROR_CARPETA_PRIVACIDAD_NO_VALIDA = 549
export const ERROR_CARPETA_NO_ENCONTRADA = 543
export const ERROR_LISTA_NOT_IN_CARPETA = 544
export const ERROR_CARPETA_NOT_IN_USER = 553

// Constantes para los errores de gestión de amigos
export const ERROR_USUARIO_YA_AMIGO = 545
export const ERROR_NOTIFICACION_NO_AMIGO = 546
export const ERROR_USUARIO_NO_AMIGO = 547
export const ERROR_SEGUNDOS_NEGATIVOS = 548
export const ERROR_ERROR_DESCONOCIDO = 599

const diccionarioMensajeIdError = {   [ERROR_CANCION_NO_ENCONTRADA]: "La canción no se ha encontrado",
                                [ERROR_CANCION_NO_ELIMINADA]: "La canción no se ha podido eliminar",
                                [ERROR_CANCION_NO_MODIFICADA]: "La canción no se ha podido modificar",
                                [ERROR_CANCION_NO_ANYADIDA]: "La canción no se ha podido añadir",
                                [ERROR_CANCION_ELEMENTOS_FALTANTES]: "Faltan elementos en la petición",
                                [ERROR_CANCION_ELEMENTOS_VACIOS]: "Algunos elementos están vacíos",
                                [ERROR_PODCAST_NO_ENCONTRADO]: "El podcast no se ha encontrado",
                                [ERROR_PODCAST_NO_ELIMINADO]: "El podcast no se ha podido eliminar",
                                [ERROR_PODCAST_NO_MODIFICADO]: "El podcast no se ha podido modificar",
                                [ERROR_PODCAST_NO_ANYADIDO]: "El podcast no se ha podido añadir",
                                [ERROR_PODCAST_ELEMENTOS_FALTANTES]: "Faltan elementos en la petición",
                                [ERROR_PODCAST_ELEMENTOS_VACIOS]: "Algunos elementos están vacíos",
                                [ERROR_USUARIO_NO_ENCONTRADO]: "El usuario no se ha encontrado",
                                [ERROR_USUARIO_PARAMETROS_INCORRECTOS]: "Los parámetros de la petición son incorrectos",
                                [ERROR_CONTRASENYA_INCORRECTA]: "La contraseña es incorrecta",
                                [ERROR_USUARIO_EMAIL_YA_EXISTE]: "El email ya existe",
                                [ERROR_USUARIO_NO_ADMINISTRADOR]: "El usuario no es administrador",
                                [ERROR_USUARIO_TIPO_NO_VALIDO]: "El tipo de usuario no es válido",
                                [ERROR_USUARIO_YA_SUSCRITO]: "El usuario ya está suscrito",
                                [ERROR_USUARIO_NO_SUSCRITO]: "El usuario no está suscrito",
                                [ERROR_USUARIO_YA_ES_ARTISTA]: "El usuario ya es artista",
                                [ERROR_USUARIO_NO_ARTISTA]: "El usuario no es artista",
                                [ERROR_LISTA_NO_ENCONTRADA]: "La lista no se ha encontrado",
                                [ERROR_LISTA_PARAMETROS_INCORRECTOS]: "Los parámetros de la petición son incorrectos",
                                [ERROR_LISTA_TIPO_INCORRECTO]: "El tipo de lista no es válido",
                                [ERROR_LISTA_PRIVACIDAD_INCORRECTA]: "El tipo de privacidad no es válido",
                                [ERROR_AUDIO_NOT_IN_LISTA]: "El audio no está en la lista",
                                [ERROR_NOTIFICACION_NO_ENCONTRADA]: "La notificación no se ha encontrado",
                                [ERROR_TIPO_NOTIFICACION_NO_VALIDA]: "El tipo de notificación no es válido",
                                [ERROR_NOTIFICACION_NO_SOLICITUD_ARTISTA]: "La notificación no es una solicitud de artista",
                                [ERROR_NO_SE_HA_PODIDO_CAMBIAR_TIPO_USUARIO]: "No se ha podido cambiar el tipo de usuario",
                                [ERROR_CARPETA_PARAMETROS_INCORRECTOS]: "Los parámetros de la petición son incorrectos",
                                [ERROR_CARPETA_PRIVACIDAD_NO_VALIDA]: "El tipo de privacidad no es válido",
                                [ERROR_CARPETA_NO_ENCONTRADA]: "La carpeta no se ha encontrado",
                                [ERROR_LISTA_NOT_IN_CARPETA]: "La lista no está en la carpeta",
                                [ERROR_CARPETA_NOT_IN_USER]: "La carpeta no pertenece al usuario",
                                [ERROR_USUARIO_YA_AMIGO]: "El usuario ya es amigo",
                                [ERROR_NOTIFICACION_NO_AMIGO]: "La notificación no es de amistad",
                                [ERROR_USUARIO_NO_AMIGO]: "El usuario no es amigo",
                                [ERROR_SEGUNDOS_NEGATIVOS]: "Los segundos no pueden ser negativos",
                                [OK]: "OK",
                                [FORBIDDEN]: "Forbidden",
                                [ERROR_ERROR_DESCONOCIDO]: "Error desconocido"}

export const errorMsg = (errorKey) => {
    if (errorKey in diccionarioMensajeIdError) {
        return diccionarioMensajeIdError[errorKey]
    }
    return errorMsg(ERROR_ERROR_DESCONOCIDO)
}