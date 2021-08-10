const functions = require('firebase-functions');
const cors = require("cors")({ origin: true });
const nodemailer = require("nodemailer");
const { writeFileSync } = require('fs');
const ics = require('ics');
const os = require('os');
const path = require('path');
const tw = require('twilio');

const accountSid = "ACee2316565da0c7db00183b119a61c13f";
const authToken = "57d47d4f6261df3242cf821063078284";

const client = new tw(accountSid, authToken);

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: "1GB"
};

var transporter = nodemailer.createTransport({
  /* service: 'gmail',
  auth: {
    user: 'pruebaspjl1805@gmail.com',
    pass: 'pruebasPJL'
  } */
/*   host: 'mail01.lorente.fin.ec',
  port: '587',
  secure: false,
  auth: {
    user: 'citaspjl@lorente.fin.ec',
    pass: 'hKVGLgc1;f(u'
  },
  tls: {
    rejectUnauthorized:false
  } */
  /* host: 'mail.oderbiz.com',
  port: '587',
  secure: false,
  auth: {
    user: 'sistemas@oderbiz.com',
    pass: '@sistemasODB_2020@'
  },
  tls: {
    rejectUnauthorized:false
  } */

  host: 'smtpout.secureserver.net',
  port: '465',
  secure: true,
  auth: {
    user: 'info@comunicacioneslorente.com',
    pass: '@comunicacion_lorente2020'
  },
  tls: {
    rejectUnauthorized: false
  }
});


exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    var tipo = "";
    var day, year, month, hour, minute;

    var monthsRef = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if(req.body.oficial.tipo === "atencion") {
      tipo = "Atención al cliente";
    } else {
      tipo = "Crédito y operaciones";
    }

    hour = req.body.hora.split(":")[0];

    minute = req.body.hora.split(":")[1];
    year = req.body.fecha.split(" ")[2];
    day = req.body.fecha.split(" ")[1];

    month = parseInt(monthsRef.indexOf(req.body.fecha.split(" ")[0]));
    month += 1;
    console.log("hora:", hour, "minuto: ", minute, "year:", year, "day: ", day, "month: ", month);

    ics.createEvent({
      title: "CITA PROGRAMADA PJL",
      description: "El sistema de de generación de turnos de la Coop. Padre Julián Lorente ha programado una cita con " + req.body.nombres + " para el servicio de " + tipo + ".",
      location: "Agencia: " + req.body.agencia.name + " " + req.body.agencia.direccion,
      busyStatus: "FREE",
      startOutputType:"local",
      start: [parseInt(year), month, parseInt(day), parseInt(hour), parseInt(minute)],
      duration: { minutes: 15 },
      alarms: [
        {
          action: "audio",
          trigger: {hours: 0, minutes:5, before: true},
          repeat: 1,
          attachType: "VALUE=URI",
          attach: "Glass"
        }
      ]
    }, (error, value) => {
      if(error) {
        console.log("Error: " + error);
      } else {
        let pathEvent = path.join(os.tmpdir(), "/citaprogramada.ics")
        console.log("aqui el path " + pathEvent);
        writeFileSync(pathEvent, value)
        console.log("si se ha generado el archivo: ", value);
      }
    })


    let mensaje;
    let { nombres, email, fecha, hora, codigoCita, numPdf, agencia, oficial, pdf } = req.body;

    mensaje += '<table style="max-width:600px;max-height:10px;padding:10px;margin:0 auto;border-collapse:collapse">';
    mensaje += '  <tbody>';
    mensaje += '    <tr>';
    mensaje += '      <td style="background-color:#d5c234;text-align:left;padding:0">';
    mensaje += '        <a href="https://www.lorente.fin.ec/" target="_blank">';
    mensaje += '          <img style="max-width: 150px; display:block; margin:1.5% 3%" src="https://www.lorente.fin.ec/sites/all/themes/business_responsive_theme/logo.png" data-saferedirecturl="https://www.google.com/url?q=https://www.lorente.fin.ec/&source=gmail&ust=1603817036809000&usg=AFQjCNEEojJBqDsB-0tCFc48IBs7TDfJhg"/>';
    mensaje += '        </a>';
    mensaje += '      </td>';
    mensaje += '    </tr>';
    mensaje += '    <tr>';
    mensaje += '      <td style="background-color:#ecf0f1">';
    mensaje += '        <div style="color:#34495e;margin:4% 10% 2%;text-align:justify;font-family:sans-serif">';
    mensaje += '          <h2 style="color:#d5c234;margin:0 0 7px;text-align:center">COOPERATIVA DE AHORRO Y CRÉDITO PADRE JULIÁN LORENTE</h2>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000;margin-top:5%">Estimado/a:'+ nombres +'</p>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000;margin-top:5%"> Usted ha solicitado un turno para la agencia ' + agencia.name + '</p>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000;margin-top:5%"><b>Información de turno</b></p>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000"> Fecha: ' + fecha + ' y Hora: ' + hora + ' </p>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000"> Oficial de servicio: ' + oficial.nombre + '</p>';
    mensaje += '          <br>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000;margin-top:5%">Esta información es unicamente para la persona que ha generado el turno.</p>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000;margin-top:5%">Verifique la numeración del PDF con la del archivo adjunto y recuerde llevarlo el día de su cita.</p>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000;margin-top:5%"><b>Númeración de PDF: </b> ' + numPdf + '</p>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000;margin-top:2%"><b>Código de la Cita: </b>' + codigoCita + '</p>';
    mensaje += '        </div>';
    mensaje += '      </td>';
    mensaje += '    </tr>';
    mensaje += '    <tr>';
    mensaje += '      <td style="background-color:#d5c234;text-align:center;padding-top:15px;padding-bottom:15px">';
    mensaje += '        <p style="margin:2px;font-size:12px;color:#007196;text-decoration:none"> Call center 1800 57 11 35  &nbsp;|&nbsp; Mercadillo entre Olmedo y Juan José Peña &nbsp;|&nbsp; <a href="https://www.lorente.fin.ec/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.lorente.fin.ec/&amp;source=gmail&amp;ust=1603817036809000&amp;usg=AFQjCNEEojJBqDsB-0tCFc48IBs7TDfJhg">https://www.lorente.fin.ec/</a></p>';
    mensaje += '      </td>';
    mensaje += '    </tr>';
    mensaje += '  </tbody>';
    mensaje += '</table>';


    let pathFile = path.join(__dirname, "/citaprogramada.ics");
    console.log("pathFile", pathFile);

    const workDir = path.join(__dirname, "/citaprogramada.ics");

    //Solo para producción
    /* let pathFile = path.join(os.tmpdir(), "/citaprogramada.ics");
    console.log("pathFile", pathFile);
    const workDir = path.join(os.tmpdir(), "/citaprogramada.ics"); */

    const mailOptions = {
      from: 'info@comunicacioneslorente.com',
      //Agregar el correo del oficial cuando ya se implemente
      to: oficial.email, // Cambia esta parte por el destinatario
      cc: email,
      subject: 'CITA PROGRAMADA',
      html: mensaje,
      attachments: [
        {
          filename: numPdf + '_' + nombres + '.pdf',
          path: pdf,
          contentType: 'application/pdf'
        },
        {
          filename: "citaProgramada.ics",
          path: workDir,
          contentType: 'text/Calendar'
        }
      ]
    };
    transporter.sendMail(mailOptions, (err, info) => {
      console.log("voy a enviar el correo");
      if (err) {
        console.log("Error al envial mail" + err);
        res.status(500).send(err);
      } else {
        console.log("Email enviado" + info);
        res.status(200).send(info);
      }
    });
  });
});

exports.sendEmailToOfficer = functions.https.onRequest((req, res) => {
  cors(req, res, () => {

    var tipo = "";
    var day, year, month, hour, minute;

    var monthsRef = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if(req.body.oficial.tipo === "atencion") {
      tipo = "Atención al cliente";
    } else {
      tipo = "Crédito y operaciones";
    }

    hour = req.body.hora.split(":")[0];

    minute = req.body.hora.split(":")[1];
    year = req.body.fecha.split(" ")[2];
    day = req.body.fecha.split(" ")[1];

    month = parseInt(monthsRef.indexOf(req.body.fecha.split(" ")[0]));
    month += 1;
    console.log("hora:", hour, "minuto: ", minute, "year:", year, "day: ", day, "month: ", month);

    ics.createEvent({
      title: "CITA PROGRAMADA PJL",
      description: "El sistema de de generación de turnos de la Coop. Padre Julián Lorente ha programado una cita con " + req.body.nombres + " para el servicio de " + tipo + ".",
      location: "Agencia: " + req.body.agencia.name + " " + req.body.agencia.direccion,
      busyStatus: "FREE",
      startOutputType:"local",
      start: [parseInt(year), month, parseInt(day), parseInt(hour), parseInt(minute)],
      duration: { minutes: 15 },
      alarms: [
        {
          action: "audio",
          trigger: {hours: 0, minutes:5, before: true},
          repeat: 1,
          attachType: "VALUE=URI",
          attach: "Glass"
        }
      ]
    }, (error, value) => {
      if(error) {
        console.log("Error: " + error);
      } else {
        let pathEvent = path.join(os.tmpdir(), "/citaprogramada.ics")
        console.log("aqui el path " + pathEvent);
        writeFileSync(pathEvent, value)
        console.log("si se ha generado el archivo: ", value);
      }
    })


    let mensaje;
    let { nombres, email, fecha, hora, codigoCita, numPdf, agencia, oficial, pdf } = req.body;

    mensaje += '<table style="max-width:600px;max-height:10px;padding:10px;margin:0 auto;border-collapse:collapse">';
    mensaje += '  <tbody>';
    mensaje += '    <tr>';
    mensaje += '      <td style="background-color:#d5c234;text-align:left;padding:0">';
    mensaje += '        <a href="https://www.lorente.fin.ec/" target="_blank">';
    mensaje += '          <img style="max-width: 150px; display:block; margin:1.5% 3%" src="https://www.lorente.fin.ec/sites/all/themes/business_responsive_theme/logo.png" data-saferedirecturl="https://www.google.com/url?q=https://www.lorente.fin.ec/&source=gmail&ust=1603817036809000&usg=AFQjCNEEojJBqDsB-0tCFc48IBs7TDfJhg"/>';
    mensaje += '        </a>';
    mensaje += '      </td>';
    mensaje += '    </tr>';
    mensaje += '    <tr>';
    mensaje += '      <td style="background-color:#ecf0f1">';
    mensaje += '        <div style="color:#34495e;margin:4% 10% 2%;text-align:justify;font-family:sans-serif">';
    mensaje += '          <h2 style="color:#d5c234;margin:0 0 7px;text-align:center">COOPERATIVA DE AHORRO Y CRÉDITO PADRE JULIÁN LORENTE</h2>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000;margin-top:5%">Estimado/a:'+ nombres +'</p>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000;margin-top:5%"> Usted ha solicitado un turno para la agencia ' + agencia.name + '</p>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000;margin-top:5%"><b>Información de turno</b></p>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000"> Fecha: ' + fecha + ' y Hora: ' + hora + ' </p>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000"> Oficial de servicio: ' + oficial.nombre + '</p>';
    mensaje += '          <br>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000;margin-top:5%">Esta información es unicamente para la persona que ha generado el turno.</p>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000;margin-top:5%">Verifique la numeración del PDF con la del archivo adjunto y recuerde llevarlo el día de su cita.</p>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000;margin-top:5%"><b>Númeración de PDF: </b> ' + numPdf + '</p>';
    mensaje += '          <p style="margin:2px;font-size:12px;color:#000000;margin-top:2%"><b>Código de la Cita: </b>' + codigoCita + '</p>';
    mensaje += '        </div>';
    mensaje += '      </td>';
    mensaje += '    </tr>';
    mensaje += '    <tr>';
    mensaje += '      <td style="background-color:#d5c234;text-align:center;padding-top:15px;padding-bottom:15px">';
    mensaje += '        <p style="margin:2px;font-size:12px;color:#007196;text-decoration:none"> Call center 1800 57 11 35  &nbsp;|&nbsp; Mercadillo entre Olmedo y Juan José Peña &nbsp;|&nbsp; <a href="https://www.lorente.fin.ec/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.lorente.fin.ec/&amp;source=gmail&amp;ust=1603817036809000&amp;usg=AFQjCNEEojJBqDsB-0tCFc48IBs7TDfJhg">https://www.lorente.fin.ec/</a></p>';
    mensaje += '      </td>';
    mensaje += '    </tr>';
    mensaje += '  </tbody>';
    mensaje += '</table>';


    let pathFile = path.join(__dirname, "/citaprogramada.ics");
    console.log("pathFile", pathFile);
    const workDir = path.join(__dirname, "/citaprogramada.ics");

    //Solo para producción
    /* let pathFile = path.join(os.tmpdir(), "/citaprogramada.ics");
    console.log("pathFile", pathFile);
    const workDir = path.join(os.tmpdir(), "/citaprogramada.ics"); */

    const mailOptions = {
      from: 'info@comunicacioneslorente.com',
      //Agregar el correo del oficial cuando ya se implemente
      to: oficial.email,
      subject: 'CITA PROGRAMADA',
      html: mensaje,
      attachments: [
        {
          filename: numPdf + '_' + nombres + '.pdf',
          path: pdf,
          contentType: 'application/pdf'
        },
        {
          filename: "citaProgramada.ics",
          path: workDir,
          contentType: 'text/Calendar'
        }
      ]
    };
    transporter.sendMail(mailOptions, (err, info) => {
      console.log("voy a enviar el correo");
      if(err){
        console.log("Notificacion fallida ", err);
        res.status(500).send(err);
        /* res.status(500).send(JSON.stringify({
          info: "No se ha podido generar la notificación al oficial de cooperativa.",
          code: 1
        })); */
      } else {
        console.log("Notificacion enviada" + info);
        res.status(200).send(info);
      }
    });
  });
});


exports.sendMessage = functions.runWith(runtimeOpts).https.onRequest((req, res) => {
  cors(req, res, () => {
    let { officer, data_agencia, data_cita, data_cliente } = req.body.data;
    client.messages
      .create({
        to: data_cliente.formatPhone,
        from: "(908)718-2758",
        body: "Estimado/a " + data_cliente.nombres.split(" ")[0] + " se ha confirmado su cita PJL en agencia " + data_agencia.name + " con oficial " + officer + ". La cita tiene fecha " + data_cita.fecha + " y hora " + data_cita.hora
      }).then(() =>
        res.json({
          code: 0,
          data: "Se ha notificado correctamente la confirmación de la cita."
        })
      )
      .catch(e => res.status(400).send(e));
  });
});
