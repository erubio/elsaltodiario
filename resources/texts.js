const constants = require("../src/utils/constants");

module.exports = {
    helpTextCard: 'Recuerda que puedes pedirme las siguientes secciones:\r\nGeneral\r\nActualidad\r\nEl salmón contracorriente\r\nRadical Magazine', 
    error: 'Ups! Vaya! La hemos liado un poco y ahora no te podemos ofrecer las últimas noticias, lo estamos arreglando, pregúntame dentro de un rato a ver si ya hemos encotrado el problema.',
    longPause: '<break time="1.5s" />',
    pause: '<break time="1s" />',
    sectionReprompt: 'Puedes pedirme las siguientes secciones: General. Actualidad. El salmón contracorriente. Radical Magazine',
    shortPause: '<break time="0.5s" />',
    title: 'El salto diario',
    transition: `<audio src="${constants.doamin}/audio/transition.mp3" />`,
    of: 'de',
    welcomeText: 'Bienvenida a "el salto diario", donde te informaremos de las últimas noticias. Quieres conocer la edición general? o prefieres otras secciones como: Actualidad, El salmón contracorriente o Radical Magazine?',
    welcomeTextCard: 'El Salto diario, secciones disponibles:\r\nGeneral\r\nActualidad\r\nEl salmón contracorriente\r\nRadical Magazine',
    
}