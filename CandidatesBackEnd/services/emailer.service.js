const nodemailer = require("nodemailer");
const db = require("../_helpers/database");
module.exports = {
  considerMail,
  mail,
};

// must use a wrapper
async function considerMail(Stalker, User, user) {
  user.skills.map((skill) => {
    if (!skill.experience) {
      skill.experience = { $lte: 0 };
    } else {
      skill.experience = { $lte: skill.experience };
    }
    return skill;
  });
  let stalkers = Stalker.find();
  let skills = user.skills;
  for (let skillIndex in skills) {
    // console.log("Skill[index]: ", skills[skillIndex])
    Stalker.find({ skillMinimums: { $elemMatch: skills[skillIndex] } });
  }
  stalkers = await stalkers;
  for (let i in stalkers) {
    console.log("Stalker: ", stalkers[i]);
    if (stalkers[i].email) {
      await mail(
        stalkers[i].email,
        "A new potential applicant has arrived! Email them at " + user.email
      );
    }
  }
  if (stalkers && stalkers.length > 0) {
  }
}
async function mail(recievers, candidateInfo, subject) {
  if (!subject) {
    subject = "New Relevant Applicant";
  }
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "USERNAME",
      pass: "PASSWORD",
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: recievers, // list of receivers
    subject: subject, // Subject line
    text: candidateInfo, // plain text body
  });
}
