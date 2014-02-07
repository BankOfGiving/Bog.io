//module.exports = function(ns, cb) {
//    var rootNamespace = 'BOG';
//
//    var registerNamespace = function(ns, cb) {
//        var nsparts = ns.split(".");
//        var parent = rootNamespace;
//        if (nsparts[0] === rootNamespace) {
//            nsparts = nsparts.slice(1);
//        }
//        for (var i = 0; i < nsparts.length; i++) {
//            var partname = nsparts[i];
//            if (typeof parent[partname] === "undefined") {
//                parent[partname] = {};
//            }
//            parent = parent[partname];
//        }
//        return parent;
//    };
//
//    return {
//        register: registerNamespace
//    }
//};

module.exports = function (ns, fs) {
    //ns Namespace as . seperated string
    //fs the return function

    //Here's our trusty register function, only now it's inline
    var register = function (ns) {
        //Split the string
        var nsParts = ns.split(".");
        //Store window in obj
        var obj = window;
        //Travese through the string parts
        for (var i = 0, j = nsParts.length; i < j; i++) {

            if (typeof obj[nsParts[i]] == "undefined") {
                //Is it did not exist create it and copy it to obj
                //so the next part can be copied into this part.
                obj = obj[nsParts[i]] = {};
            }
            else {
                //Still copy it to obj, 'cause the next one might not exist
                obj = obj[nsParts[i]];
            }
        }
    };

    //Let's register the namespace
    register(ns);

    //And call the wrapper function.
    fs();
}();
