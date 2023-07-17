const sendMail = async (req, res) => {

    console.log("req", req)

    const SibApiV3Sdk = require('sib-api-v3-sdk');
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.MAIL_API_KEY;
    
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    
    sendSmtpEmail.subject = `${req.subject}`;
    sendSmtpEmail.htmlContent  = '<html>'+
                                    '<body>'+
                                        '<table style="max-width:800px;text-align:center; margin: auto" rowspan="0" colspan="0">'+
                                            '<tr>'+
                                                '<td>'+
                                                    '<table style="width:100%;margin-bottom: 30px;" rowspan="0" colspan="0">'+
                                                        '<tr>'+
                                                            '<td style="font-size: 32px;font-weight: bold;background-color: #1c5a1c;color: white;height: 100px;">'+
                                                                'Welcome to Food Informer App'+
                                                            '</td>'+
                                                        '</tr>'+
                                                    '</table>'+
                                                '</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                                '<td>'+
                                                    '<table style="width:100%" rowspan="0" colspan="0">'+
                                                        '<tr>'+
                                                            '<td style="color: black">'+
                                                                '<p>You have been given access to our platform in order to facilitate food control tasks at work.</p>'+
                                                                '<p>Start enjoying its advantages.</p>'+
                                                            '</td>'+
                                                        '</tr>'+
                                                        '<tr>'+
                                                            '<td style="padding-top: 30px;">'+
                                                                '<a href="http://localhost:5173/login" style="background-color: #1c5a1c;border-radius: 5px;text-decoration: none;font-weight: bold;padding: 10px 20px;color: white;min-width: 300px;margin-top: 30px;box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1)">'+
                                                                    'Active you account'+
                                                                '</a>'+
                                                            '</td>'+
                                                        '</tr>'+
                                                    '</table>'+
                                                '</td>'+
                                            '</tr>'+
                                        '</table>'+
                                    '</html>';
    sendSmtpEmail.sender = {"name":"Food Informer","email":"noreply@foodinformer.com"};
    //sendSmtpEmail.to = [{"email":`${req.userEmail}`,"name":`${req.userName}`}];
    sendSmtpEmail.to = [{"email":"marc.obiols.s@gmail.com","name":"Marc Obiols"}];
    //sendSmtpEmail.cc = [{"email":"marc.obiols.s@gmail.com","name":"Janice Doe"}];
    //sendSmtpEmail.bcc = [{"email":"marc.obiols.s@gmail.com","name":"Marc"}];
    //sendSmtpEmail.replyTo = {"email":"marc.obiols.s@gmail.com","name":"John Doe"};
    sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
    sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};
    
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
      return true;
    }, function(error) {
      console.error(error);
    });
}

module.exports = {
    sendMail
};
