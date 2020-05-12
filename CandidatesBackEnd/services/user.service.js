const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helpers/database");
const { considerMail } = require("./emailer.service");
const User = db.User;
const Stalker = db.Stalker;

module.exports = {
  authenticate,
  getAllUsers,
  getByUsername,
  addUser,
  update,
};

async function authenticate({ username, password }) {
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, config.secret);
    return {
      ...userWithoutHash,
      token,
    };
  }
}

async function getAllUsers(reqBody) {
  //Returning the result of the promise.
  if (!reqBody.skills) {
    console.log("Finding *all* users");
    let users = await User.find();
    let noHash = [];
    users.forEach((elem) => {
      const toObj = elem.toObject();
      delete toObj["hash"];
      noHash.push(toObj);
    });
    return noHash;
  }
  let skills = reqBody.skills;

  // TODO: simplify

  skills.map((skill) => {
    if (!skill.experience) {
      skill.experience = { $gte: 0 };
    } else {
      skill.experience = { $gte: skill.experience };
    }
    return skill;
  });

  let queries = [];

  skills.forEach((skill) => queries.push({ skills: { $elemMatch: skill } }));

  let query = await User.find({
    $and: queries,
  });

  let noHash = [];
  query.forEach((elem) => {
    const toObj = elem.toObject();
    delete toObj["hash"];
    noHash.push(toObj);
  });
  return noHash;
}

async function getByUsername(username) {
  return await User.find({ username: username });
}

async function addUser(userParam) {
  // validate
  if (await User.findOne({ username: userParam.username })) {
    throw 'Username "' + userParam.username + '" is already taken';
  } else if (await User.findOne({ email: userParam.email })) {
    throw 'Email "' + userParam.email + '" is already taken';
  }
  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }
  user.jobSeeking = true;
  // save user
  await user.save();

  await considerMail(Stalker, User, user);
}
async function update(userParam) {
  console.log("trying to update skill. Request body: ", userParam);
  // validate

  if (!(await User.findOne({ username: userParam.username }))) {
    throw 'Username "' + userParam.username + '" does not exist';
  }

  User.updateOne(
    { username: userParam.username },
    {
      skills: userParam.skills,
    },
    (err, affected, resp) => {
      if (err) console.log(err);
      else {
        console.log("response: ", resp);
        console.log("Affected: ", affected);
      }
    }
  );
  await considerMail(Stalker, User, user);
}
