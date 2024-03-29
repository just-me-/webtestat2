function configurator(req, res) {
    let configuration;
    if(req.cookies.configuration) {
        configuration = JSON.parse(req.cookies.configuration);   //daten von cookie abziehen
    } else {                                                         //oder sonst default initializen
        configuration = {
            darkmode: false,
            filter: 'none',
            orderBy: 'createdAt',
            reverse: false,
            sortorder: 1

        };
    }

    //Alle Parameter aus Request-URL abgreifen und setzen:
    if(req.query.darkmode !== undefined){
        if(req.query.darkmode === true || req.query.darkmode === "true")
            configuration.darkmode = true;
        else
            configuration.darkmode = false;
    }

    if(req.query.orderBy !== undefined){
        configuration.orderBy = req.query.orderBy;
    }

    if (req.query.reverse !== undefined) {
        configuration.reverse = req.query.reverse;
    } else {
        configuration.reverse = false;  //reset necessary here because i use two variables
    }

    if (configuration.reverse) {
        configuration.sortorder = -1;   //bisschen unnötig hier zwei variablen, aber ist klarer für den dev (also für mich)
    } else {
        configuration.sortorder = 1;
    }


    if(req.query.filter !== undefined){
        configuration.filter = req.query.filter;
    }

    console.log("Config was changed to:");
    console.log(configuration);

    let stringified = JSON.stringify(configuration);
    if(req.cookie === undefined) {
        req.cookie = {};
    }
    req.cookie.configuration = stringified;
    res.cookie('configuration', stringified, { maxAge: 900000, httpOnly: true });

    return configuration;
}

module.exports = configurator;