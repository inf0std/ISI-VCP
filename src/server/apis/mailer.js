const urlJoin = require("proper-url-join");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.APP_MAIL || "seen.project.cpi@gmail.com",
    pass: process.env.APP_MAIL_PWD || "imycppaougenucwm",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
const emailBody = (email, id, name, token) => {
  return {
    from:
      '"SEEN Team" <' +
      (process.env.APP_MAIL || "seen.project.cpi@gmail.com") +
      ">",
    to: email,
    subject: `${name} Veuillez vérifier votre e-mail`,
    html: `<!DOCTYPE html>
    <html>
    <head>
    
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
      /**
       * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
       */
      @media screen {
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
        }
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
        }
      }
      /**
       * Avoid browser level font resizing.
       * 1. Windows Mobile
       * 2. iOS / OSX
       */
      body,
      table,
      td,
      a {
        -ms-text-size-adjust: 100%; /* 1 */
        -webkit-text-size-adjust: 100%; /* 2 */
      }
      /**
       * Remove extra space added to tables and cells in Outlook.
       */
      table,
      td {
        mso-table-rspace: 0pt;
        mso-table-lspace: 0pt;
      }
      /**
       * Better fluid images in Internet Explorer.
       */
      img {
        -ms-interpolation-mode: bicubic;
      }
      /**
       * Remove blue links for iOS devices.
       */
      a[x-apple-data-detectors] {
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        color: inherit !important;
        text-decoration: none !important;
      }
      /**
       * Fix centering issues in Android 4.4.
       */
      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
      body {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      /**
       * Collapse table borders to avoid space between cells.
       */
      table {
        border-collapse: collapse !important;
      }
      a {
        color: #24a892;
      }
      img {
        height: auto;
        line-height: 100%;
        text-decoration: none;
        border: 0;
        outline: none;
      }
      </style>
    
    </head>
    <body style="background-color: #e9ecef;">
    
      <!-- start preheader -->
      <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
      </div>
      <!-- end preheader -->
    
      <!-- start body -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
    
        <!-- start logo -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="center" valign="top" style="padding: 36px 24px;">
                  <a href="#" target="_blank" style="display: inline-block;">
                    <img src="../../../public/logo.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                  </a>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end logo -->
    
        <!-- start hero -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Bonjour ${name},</h1>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end hero -->
    
        <!-- start copy block -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <!-- start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">Merci de commencer avec notre Plateforme!</p><br>
                  <p style="margin: 0;">Nous avons besoin d'un peu plus d'informations pour compléter votre inscription, y compris une confirmation de votre adresse e-mail.</p><br>
                  <p style="margin: 0;">Cliquez ci-dessous pour confirmer votre adresse e-mail:
                </td>
              </tr>
              <!-- end copy -->
    
              <!-- start button -->
              <tr>
                <td align="left" bgcolor="#ffffff">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" bgcolor="#24a892" style="border-radius: 6px;">
                              <a href="${emailVerificationLink(id, email, token)}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Confirmer</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- end button -->
    
              <!-- start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">Si vous rencontrez des problèmes, veuillez coller l'URL ci-dessus dans votre navigateur web</p>
                  <p style="margin: 0;"><a href="${emailVerificationLink(id, email, token)}" target="_blank">${emailVerificationLink(id, email, token)}</a></p>
                </td>
              </tr>
              <!-- end copy -->
    
              <!-- start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                  <p style="margin: 0;">Salutations,<br>SEEN Community</p>
                </td>
              </tr>
              <!-- end copy -->
    
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end copy block -->
    
        <!-- start footer -->
        <tr>
          <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <!-- start permission -->
              <tr>
                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                  <p style="margin: 0;">Vous avez reçu cet e-mail car nous avons reçu une demande d'inscription pour votre compte. Si vous n'avez pas demandé cette action, vous pouvez supprimer cet e-mail en toute sécurité.</p>
                </td>
              </tr>
              <!-- end permission -->
    
              <!-- start unsubscribe -->
              <tr>
                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                  
                  <p style="margin: 0;">UMMTO</p><p style="margin: 0;">SEEN COMMUNITY</p>
                </td>
              </tr>
              <!-- end unsubscribe -->
    
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end footer -->
    
      </table>
      <!-- end body -->
    
    </body>
    </html>`,
  };
 
  
};
const emailVerificationLink = (id, email, token) => {
  return urlJoin(process.env.APP_URL, `api/account/verify/${id}`, {
    query: { email: email, token: token },
  });
};
const sendLinkValidationEmail = (email, id, name, token) => {
  console.log("send email", email, id, name, token);
  transporter
    .sendMail(emailBody(email, id, name, token))
    .then((info) => {
      console.log(info);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { sendLinkValidationEmail };
