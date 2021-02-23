const constants = require("../src/utils/constants");

module.exports = {
    byeText: 'Vale! Esperamos que vuelvas pronto para conocer las últimas noticias de El salto diario',
    helpTextCard: 'Recuerda que puedes pedirme las siguientes secciones: Actualidad\r\nEl salmón contracorriente\r\nRadical Magazine', 
    error: 'Ups! Vaya! La hemos liado un poco y ahora no te podemos ofrecer las últimas noticias, lo estamos arreglando, pregúntame dentro de un rato a ver si ya hemos encotrado el problema.',
    errorText: 'Perdona, creo que estaba un poco despistada y no te he entendido, puedes repetirlo otra vez?',
    longPause: '<break time="2s" />',
    pause: '<break time="1.5s" />',
    sectionReprompt: 'Puedes pedirme las siguientes secciones:  Actualidad. El salmón contracorriente. Radical Magazine',
    shortPause: '<break time="1s" />',
    title: 'El salto diario',
    transition: `<audio src="${constants.doamin}/audio/transition.mp3" />`,
    of: 'de',
    welcomeText: 'Bienvenida a "el salto diario", donde te informaremos de las últimas noticias. Me puedes pedir las siguientes secciones: Actualidad, El salmón contracorriente o Radical Magazine. ¿Cuál prefieres?',
    welcomeTextCard: 'El Salto diario, secciones disponibles:\r\nActualidad\r\nEl salmón contracorriente\r\nRadical Magazine',
    
}