const keys=require('../../config/keys');
// we're going to receive the survey as an argument , our model has a body property and that is the actual body text that our user wants to show inside the email.
module.exports=(survey)=>{
    // return "<div>"+survey.body+"</div>"
    return `
    <html>
        <body>
            <div style="text-align:center;">
                <h3>I would like your input!</h3>
                <p>Please answer the following question:</p>
                <p>${survey.body}</p>                
                <div>
                    <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
                </div>
                <div>
                    <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
                </div>
            </div>            
        </body>
    </html>
    `
}