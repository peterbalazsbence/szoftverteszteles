QUnit.module("Holdjáró");

QUnit.test("Kezdőpozíció és irány", function (assert) {
    const rover = new Rover(2, 3, "E", 8, 6);
    assert.deepEqual(rover.state(), {x: 2, y: 3, direction: "E"});
});

QUnit.test("Előre észak felé", function (assert) {
    const rover = new Rover(2, 2, "N", 8, 6);
    rover.execute("f");
    assert.deepEqual(rover.state(), {x:2,y:3,direction:"N"});
});
