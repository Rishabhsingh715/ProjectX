const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log('inside new comment mailer');
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comment/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'rishabh_715',
        to: comment.user.email,
        subject: "new comment published",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('error in sending mail ', err);
            return;
        }
        console.log('message sent', info);
        return;
    });
}