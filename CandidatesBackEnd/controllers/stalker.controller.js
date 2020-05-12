const stalkerService = require('../services/stalker.service')
const mailService = require('../services/emailer.service')
module.exports = {
    registerNewStalker,
    getAll
};

function registerNewStalker(req, res, next) {
    console.log("adding stalker", req.body);
    console.log("----------------------------");
    // console.log(req.body);
    stalkerService.addStalker(req.body)
        .then(() => {
            res.json({});
            mailService
                .mail(req.body.email, "Thanks for signing up for candidate notifications!", "Welcome to Candidates.com!")
                .then(() => res.json({}))
                .catch(err => next(err));
        })
        .catch(err => next(err));


}
function getAll(req, res, next) {
    console.log("Getting all stalkers");
    stalkerService.getAllStalkers(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
