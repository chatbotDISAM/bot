const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const unidadesCtrl = require("../controllers/unidadesController");
const programasCtrl = require("../controllers/programasController");
const preguntasCtrl = require("../controllers/preguntasController");
const respuestasCtrl = require("../controllers/respuestasController");
const conversacionesCtrl = require("../controllers/conversacionesController");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));


module.exports = {
    flowUnidades: () => {
        return addKeyword([EVENTS.WELCOME,'Hola','Holi','Hi','Holaa','Holaaa','Holaaaa','Holaaaaa','Buenos dias','buenos dias','Buenas tardes','buenas tardes','Holaaaaaa','hola','holaa','holaaa','holaaaa','holaaaaa','holaaaaaa','hi'])
            .addAnswer(
                ["¡Hola! Mi nombre es Bot DISAM, será un gusto solventar tus dudas, por favor, de las opciones que se presentan a continuación, escribe el número que corresponde a la opción de la unidad a la cual pertenece tu consulta"], { delay: 10 })
            .addAction(async (ctx, { flowDynamic }) => {
                const unidades = await unidadesCtrl.getUnidades();




                const unidadestxt = unidades.map((g) => {
                    return `*${g.id}. ${g.nombre_unidad}*\n`;
                });

                await delay(500)
                await flowDynamic('\n' + unidadestxt.join('\n'));

            }
            ).addAnswer("Recuerda ingresar solamente el número correspondiente a la opción que deseas consultar \n",
                { capture: true, delay: 800 },
                async (ctx, { flowDynamic, gotoFlow, fallBack, endFlow }) => {
                    const unidad = await unidadesCtrl.getById(ctx.body)


                    if (!unidad) {
                        return fallBack("Ingrese una opción valida, recuerde solo escribir el número correspondiente")
                    }

                    await conversacionesCtrl.create(ctx.from,ctx.to,ctx.body)
                    
                   

                    programas = await programasCtrl.getAllById_Unidad(ctx.body)
                    const programastxt = programas.map((g) => {
                        return `*${g.Id}. ${g.Nombre_programa}*\n`;
                    });

                   




                    if (programas.length != 0) {


                        flowDynamic("Escogiste la opción: *" + unidad.nombre_unidad + "* \n\nEsta unidad tiene los siguientes programas, por favor, escoja el número del programa que esté relacionado con tu consulta" + '\n\n' + programastxt.join('\n'))

                    }

                    else {

                        flowDynamic("Escogiste la opción: *" + unidad.nombre_unidad + "* \n\nEsta unidad no posee programas por el momento")
                        return endFlow("Gracias por usar este servicio")
                    }




                }).addAnswer("Recuerda ingresar solamente el número correspondiente a la opción que deseas consultar \n",
                    { capture: true, delay: 800 }, async (ctx, { flowDynamic, fallBack, endFlow }) => {
                        const preguntas = await preguntasCtrl.getAllById_Programa(ctx.body);
                        console.log(ctx.body)
    
    
                        if (preguntas.length == 0) {
                            return endFlow('Este programa, no posee preguntas frecuentes por el momento, ¡Gracias por usar este servicio!');
                        }
                        const validacion1 = await programasCtrl.getById(ctx.body)
                        const valorAntiguo = await conversacionesCtrl.getByRemitente(ctx.from)
                        

                        if(validacion1['id_unidad'] != valorAntiguo['Mensaje'] ){
                            return fallBack("Ingrese una opción valida, recuerde solo escribir el número correspondiente")
                        }
    
                        const preguntastxt = preguntas.map((g) => {
                            return `*${g.Id}. ${g.Texto}*\n`;
                        });

                        await conversacionesCtrl.create(ctx.from,ctx.to,ctx.body)
                        
    
                        await delay(500)
                        await flowDynamic('Algunas preguntas frecuentes en este programa son: \n\n' + preguntastxt.join('\n'));
    
                    })
                    .addAnswer("Recuerde ingresar el numero correspondiente a la pregunta para ver la respuesta a la consulta",{delay:800, capture:true},
                     async (ctx, { flowDynamic, fallBack, endFlow }) => {
                        const respuesta = await respuestasCtrl.getAllById_Pregunta(ctx.body);
                        const pregunta = await preguntasCtrl.getById(respuesta[0]['Id_pregunta']);

                        
                        const valorAntiguo = await conversacionesCtrl.getByRemitente(ctx.from)
                          

                        console.log(valorAntiguo['Mensaje'])
                        console.log(pregunta['Id_Programa'])


                        if(valorAntiguo['Mensaje'] != pregunta['Id_Programa']){
                            return fallBack("Ingrese una opción valida, recuerde solo escribir el número correspondiente")
                        }
    
                        if (respuesta.length == 0) {
                            return fallBack("Ingrese una opción valida, recuerde solo escribir el número correspondiente")
                        }
                       
    
                       
    
                        await delay(500)
                        await flowDynamic('La respuesta a tu consulta es la siguiente:\n\n'+pregunta['Id']+'. '+pregunta['Texto'] +'\n\n' + respuesta[0]['Texto']);
                        return endFlow("Gracias por usar este servicio")
    
                    })
            



    }
}