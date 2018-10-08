function configurator(req, res) {
    let configuration;
    if(req.cookies.configuration) {
        configuration = JSON.parse(req.cookies.configuration);   //daten von cookie abziehen
    } else {                                                         //oder sonst default initializen
        configuration = {
            darkmode: false,
            filter: 'none',
            order: 'createdAt',
            reverse: false

        };
    }

    console.log("Config was initialized as follows:");
    console.log(configuration);

    //Alle Parameter aus REquest-URL abgreifen und setzen:
    if(req.query.darkmode !== undefined){
        configuration.darkmode = req.query.darkmode;
    }

    if(req.query.order !== undefined){
        configuration.order = req.query.order;

        // Reiehnfolge definieren: 1 = ascending, -1 = descending im internen key sorting
        if (configuration.reverse) {
            configuration.sorting = -1;
        } else {
            configuration.sorting = 1;
        }
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