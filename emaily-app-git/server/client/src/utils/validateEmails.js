// source is http://emailregex.com/
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// for every single email we trim it we return the trimmed string all those trimmed e-mails are assembled together in a new array and then returned from this entire function call.
//we want to keep around the e-mails that are invalid. So specifically we want to keep around the cases where something fails this test or this expression returns false
export default (emails) => {
  console.log("emails", emails);
  //check if last value is a comma
  //   if (emails.slice(-1) === ",") {
  //     console.log("last word is comma");
  //   }
  const invalidEmails = emails
    .split(",")
    .map((email) => email.trim())
    .filter((email) => re.test(email) === false);
  // check if invalid emails are present and if last character is not a comma
  if (invalidEmails.length && emails.slice(-1) !== ",") {
    return `These emails are invalid: ${invalidEmails}`;
  }
  // no errors case we do simple return
  return;
};
