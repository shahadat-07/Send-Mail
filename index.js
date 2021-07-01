const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '678655618001-55parqvmr33qv2tftlikvq874p2oo69q.apps.googleusercontent.com'
const CLIENT_SECRET = 'ys6Q6D9huls6ZLrj6ur0CTMm'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//043nhztssJYFoCgYIARAAGAQSNwF-L9IriGtxq7lR_R6MhQPrBg2JgsYi_4oX0ufGjqN8m0Y_I-JZMqxKrZQsschRuw9umFBeaPU'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'atikurrahmanshahadat@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'SHAHADAT HOSSEN <atikurrahmanshahadat@gmail.com>',
            to: 'shahadat.07.sh@gmail.com',
            subject: 'Hello from gmail using API',
            text: 'Hello from gmail email using API from shahahdat.hossen.web@gmail.com',
            html: '<h1>Hello from gmail email using API from shahahdat.hossen.web@gmail.com</h1>',
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}

sendMail()
    .then((result) => console.log('Email is sent...', result))
    .catch((error) => console.log(error.message));