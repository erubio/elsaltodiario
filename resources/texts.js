const constants = require("../src/utils/constants");

module.exports = {
    error: 'Ups! Vaya! La hemos liado un poco y ahora no te podemos ofrecer las últimas noticias, lo estamos arreglando, pregúntame dentro de un rato a ver si ya hemos encotrado el problema.',
    longPause: '<break time="1.5s" />',
    pause: '<break time="1s" />',
    shortPause: '<break time="0.5s" />',
    title: 'El salto diario',
    transition: `<audio src="${constants.doamin}/audio/transition.mp3" />`,
    of: 'de',
    welcomeText: 'Bienvenida a "el salto diario", donde te informaremos de las últimas noticias. Quieres conocer la edición general u otras secciones como: Actualidad, El salmón contracorriente o Radical Magazine?',
    welcomeTextCard: 'El Salto diario, secciones disponibles: General\nActualidad\nEl salmón contracorriente\nRadical Magazine',
    
}