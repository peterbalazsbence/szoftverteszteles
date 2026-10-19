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

QUnit.test("Előre dél felé", function (assert) {
    const rover = new Rover(2, 2, "S", 8, 6);
    rover.execute("f");
    assert.deepEqual(rover.state(), {x:2,y:1,direction:"S"});
});

QUnit.test("Előre kelet felé", function (assert) {
    const rover = new Rover(2, 2, "E", 8, 6);
    rover.execute("f");
    assert.deepEqual(rover.state(), {x:3,y:2,direction:"E"});
});

QUnit.test("Előre nyugat felé", function (assert) {
    const rover = new Rover(2, 2, "W", 8, 6);
    rover.execute("f");
    assert.deepEqual(rover.state(), {x:1,y:2,direction:"W"});
});

QUnit.test("Hátramenet", function (assert) {
    const rover = new Rover(2, 2, "N", 8, 6);
    rover.execute("b");
    assert.deepEqual(rover.state(), {x:2,y:1,direction:"N"});
});

QUnit.test("Jobbra fordulás", function (assert) {
    const rover = new Rover(2, 2, "N", 8, 6);
    rover.execute("r");
    assert.deepEqual(rover.state(), {x:2,y:2,direction:"E"});
});

QUnit.test("Balra fordulás", function (assert) {
    const rover = new Rover(2, 2, "N", 8, 6);
    rover.execute("l");
    assert.deepEqual(rover.state(), {x:2,y:2,direction:"W"});
});
