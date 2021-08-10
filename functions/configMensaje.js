const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');


module.exports = (formulario) => {
    const documento = formulario.pdf;
    const filePath = path.join(__dirname, './emails/emails.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        nombres: formulario.nombres,
        fecha: formulario.fecha,
        hora: formulario.hora,
        codigoCita: formulario.codigoCita,
        numPdf: formulario.numPdf,
        agencia: formulario.agencia.name,
        oficial: formulario.oficial.nombre
    };
    const htmlToSend = template(replacements);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pruebaspjl1805@gmail.com', // Cambialo por tu email
            pass: 'pruebasPJL' // Cambialo por tu password
        }
    });
    const mailOptions = {
        from: 'Coop. Padre Julian Lorente',
        to: formulario.email, // Cambia esta parte por el destinatario
        subject: 'CITA PROGRAMADA',
        html: htmlToSend,
        attachments: [
            {
                filename: formulario.numPdf + '_' + formulario.nombres + '.pdf',
                path: documento,
                contentType: 'application/pdf'
            }
        ]
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}