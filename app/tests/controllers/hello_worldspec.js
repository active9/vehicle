var gas = require('gas')();

// Container Exists
gas.container("hello_world", function() {

    gas.line("can get /hello_world", function() {
        return vehicle.request(vehicle.app)
            .get('/hello_world', function(err, res) {
                console.log("RES:", res);
                if (err) {
                    console.log("FAIL:", err);
                    return gas.fail(err)
                } else {
                    console.log("TEXT", typeof res.text);
                    if (gas.typeof(res.text,"string")) {
                        if (res.text) {
                            return gas.pass('got /hello_world');
                        } else {
                            return gas.fail('failed to request /hello_world');
                        }
                    } else {
                        console.log("NO");
                        return gas.fail('');
                    }
                }
            });
            console.log("HERE LAST");
    });

    gas.line("exists as a method", function() {
        if (gas.typeof(gas.container,"function"))
        return gas.pass();
        else
        return gas.fail();
    });

    gas.line("can mock a container method", function() {
        if (gas.mock("container",function(){return true;}))
        return gas.pass();
        else
        return gas.fail('failed mocking the gas container method');
    });

});