

module.exports = {
    equal: function(lvalue, rvalue, options) {
        if (arguments.length < 3)
            throw new Error("Handlebars Helper equal needs 2 parameters");
        if( lvalue!=rvalue ) {

            console.log("::::::::HELPER WAS NOT TRUE::::::::::::", lvalue, rvalue)
            return options.inverse(this);
        } else {

            console.log("::::::::HELPER WAS TRUE::::::::::::", lvalue, rvalue)
            return options.fn(this);
        }
    },

    notreverseandequal: function(reverse, left, right, options) {
        if (arguments.length <4)
            throw new Error("Handlebars Helper equal needs 3 parameters");


        if( left == right && reverse == 0 ) {

            console.log("::::::::TOM HELPER WAS TRUE::::::::::::",reverse,  left, right)
            return options.fn(this)

        } else {

            console.log("::::::::TOM HELPER WAS NOT TRUE::::::::::::", reverse, left, right)
            return options.inverse(this);
        }
    },

    times: function(n, block) {
        var accum = '';
        for (var i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    }
};