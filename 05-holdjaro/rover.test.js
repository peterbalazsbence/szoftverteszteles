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

QUnit.test("Parancssor végrehajtása", function (assert) {
    const rover = new Rover(2, 2, "N", 8, 6);
    rover.execute("ffrflb");
    assert.deepEqual(rover.state(), {x:3,y:3,direction:"N"});
});

QUnit.test("Keleti térképszél", function (assert) {
    const rover = new Rover(7, 2, "E", 8, 6);
    rover.execute("f");
    assert.deepEqual(rover.state(), {x:0,y:2,direction:"E"});
});

QUnit.test("Északi pólus átlépése", function (assert) {
    const rover = new Rover(1, 5, "N", 8, 6);
    rover.execute("f");
    assert.deepEqual(rover.state(), {x:5,y:5,direction:"S"});
});

QUnit.test("Akadálynál megáll a parancssor", function (assert) {
    const rover = new Rover(2, 1, "N", 8, 6, [[2,3]]);
    assert.deepEqual(rover.execute("ffrf"), {x:2,y:2,direction:"N",obstacle:{x:2,y:3}});
});

QUnit.test("Páratlan térképszélesség elutasítása", function (assert) {
    assert.throws(() => new Rover(0,0,"N",7,6), RangeError);
});

QUnit.test("Ismeretlen parancs elutasítása", function (assert) {
    const rover = new Rover(2,2,"N",8,6);
    assert.throws(() => rover.execute("fx"), RangeError);
    assert.deepEqual(rover.state(),{x:2,y:2,direction:"N"});
});

QUnit.test("Nyugati térképszél", function (assert) {
    const rover=new Rover(0,2,"W",8,6);
    rover.execute("f");
    assert.deepEqual(rover.state(),{x:7,y:2,direction:"W"});
});

QUnit.test("Déli pólus átlépése", function (assert) {
    const rover=new Rover(1,0,"S",8,6);
    rover.execute("f");
    assert.deepEqual(rover.state(),{x:5,y:0,direction:"N"});
});

QUnit.test("Hátramenet a póluson át", function (assert) {
    const rover=new Rover(1,5,"S",8,6);
    rover.execute("b");
    assert.deepEqual(rover.state(),{x:5,y:5,direction:"N"});
});

QUnit.test("Mozgás a pólus átlépése után", function (assert) {
    const rover=new Rover(1,5,"N",8,6);
    rover.execute("ff");
    assert.deepEqual(rover.state(),{x:5,y:4,direction:"S"});
});

QUnit.test("Teljes kör kelet felé", function (assert) {
    const rover=new Rover(2,2,"E",8,6);
    rover.execute("ffffffff");
    assert.deepEqual(rover.state(),{x:2,y:2,direction:"E"});
});

QUnit.test("Teljes kör a pólusokon át", function (assert) {
    const rover=new Rover(2,2,"N",8,6);
    rover.execute("f".repeat(12));
    assert.deepEqual(rover.state(),{x:2,y:2,direction:"N"});
});

QUnit.test("Négy jobbra fordulás", function (assert) {
    const rover=new Rover(2,2,"N",8,6);
    rover.execute("rrrr");
    assert.deepEqual(rover.state(),{x:2,y:2,direction:"N"});
});

QUnit.test("Négy balra fordulás", function (assert) {
    const rover=new Rover(2,2,"N",8,6);
    rover.execute("llll");
    assert.deepEqual(rover.state(),{x:2,y:2,direction:"N"});
});

QUnit.test("Hátramenet mind a négy irányba", function (assert) {
    for (const [direction,x,y] of [["N",2,1],["E",1,2],["S",2,3],["W",3,2]]) { const rover=new Rover(2,2,direction,8,6);
    rover.execute("b");
    assert.deepEqual(rover.state(),{x,y,direction});
    }
});

QUnit.test("Akadály hátramenetben", function (assert) {
    const rover=new Rover(2,2,"N",8,6,[[2,1]]);
    assert.deepEqual(rover.execute("b"),{x:2,y:2,direction:"N",obstacle:{x:2,y:1}});
});

QUnit.test("Akadály a térképszélen túl", function (assert) {
    const rover=new Rover(7,2,"E",8,6,[[0,2]]);
    assert.deepEqual(rover.execute("f"),{x:7,y:2,direction:"E",obstacle:{x:0,y:2}});
});

QUnit.test("Akadály a pólus túloldalán", function (assert) {
    const rover=new Rover(1,5,"N",8,6,[[5,5]]);
    assert.deepEqual(rover.execute("f"),{x:1,y:5,direction:"N",obstacle:{x:5,y:5}});
});

QUnit.test("Folytatás akadály után", function (assert) {
    const rover=new Rover(2,2,"N",8,6,[[2,3]]);
    rover.execute("f");
    assert.deepEqual(rover.execute("rf"),{x:3,y:2,direction:"E",obstacle:null});
});

QUnit.test("Üres parancssor", function (assert) {
    const rover=new Rover(2,2,"N",8,6);
    assert.deepEqual(rover.execute(""),{x:2,y:2,direction:"N",obstacle:null});
});
