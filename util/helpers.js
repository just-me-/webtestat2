

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
    bar: function(){
        return "BAR!";
    }
};