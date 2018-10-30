

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
        let result = date - Date.now();
        // console.log("HELPEREEEEEEEEEEEEEEEEEEEEEEEEE", result);
        if (result > 0) {
            return "in " + result;
        } else {
            return "expired"
        }
    }
};