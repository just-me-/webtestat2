

module.exports = {
    equal: function(lvalue, rvalue, options) {
        if (arguments.length < 3)
            throw new Error("Handlebars Helper equal needs 2 parameters");
        if( lvalue!=rvalue ) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    },

    notreverseandequal: function(reverse, left, right, options) {
        if (arguments.length <4)
            throw new Error("Handlebars Helper equal needs 3 parameters");
        if( left == right && !reverse ) {
            return options.fn(this)
        } else {
            return options.inverse(this);
        }
    },

    times: function(n, block) {
        var accum = '';
        for (var i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    },

    //TODO oder streeichen ;) die date difference richtig hinzukriegne ist glaubihc noch saumässig mühsam.... ist aktuell NaN meist.
    timedistance: function(date) {
        if(!date) {
            return "unknown";
        }
        const dateNow = new Date();
        const dateArr = date.split("\.");
        const dateTo = new Date(dateArr[2], dateArr[1]-1, dateArr[0]);
        console.log(dateNow, dateTo, "asooooo");

        const diff = dateTo - dateNow.valueOf();
        console.log("HELPEREEEEEEEEEEEEEEEEEEEEEEEEE", diff);
        if (diff > 0) {
            const diffHours = diff/1000/60/60;
            if(diffHours<=24) {
                return "in "+Math.round(diffHours)+" hours"
            } else if(diffHours/24<=7) {
                return "in "+Math.round(diffHours/24)+" days"
            } else {
                return "in "+Math.round(diffHours/(24*7))+" weeks"
            }

            return "in " + diffHours;
        } else {
            return "expired"
        }
    }
};