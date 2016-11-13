// Generated by CoffeeScript 1.11.1
var demo, rnd;

demo = new CANNON.Demo;

rnd = function() {
  return (Math.random() - Math.random()) / 2.0;
};

demo.addScene('test', function() {
  var body, card_mat, clearing, colors, d, ground_body, ground_shp, h, i, mass, phoneShape, phone_body, phone_card_concat, phone_mat, rc, results, s, shape, size, w, world;
  world = demo.getWorld();
  world.gravity.set(0, 0, -10);
  world.broadphase = new CANNON.NaiveBroadphase;
  world.solver.iterations = 50;
  world.defaultContactMaterial.contactEquationStiffness = 5e6;
  world.defaultContactMaterial.contactEquationRelaxation = 3;
  phone_mat = new CANNON.Material();
  card_mat = new CANNON.Material();
  phone_card_concat = new CANNON.ContactMaterial(phone_mat, card_mat, {
    friction: 0.05,
    restitution: 0.0
  });
  world.addContactMaterial(phone_card_concat);
  ground_shp = new CANNON.Plane;
  ground_body = new CANNON.Body({
    mass: 0
  });
  ground_body.addShape(ground_shp);
  ground_body.position.set(-5, 0, 0);
  world.addBody(ground_body);
  demo.currentMaterial = new THREE.MeshLambertMaterial({
    color: 0x008356
  });
  demo.addVisual(ground_body);
  clearing = false;
  ground_body.addEventListener("collide", function(e) {
    if (!clearing) {
      clearing = true;
      return setTimeout((function() {
        demo.restartCurrentScene();
        return clearing = false;
      }), 5000);
    }
  });
  mass = 1.0;
  w = 9.0;
  h = 5.0;
  d = 0.1;
  s = 0.5;
  phone_body = new CANNON.Body({
    mass: 0,
    material: phone_mat
  });
  size = new CANNON.Vec3(h * s * 2.0, w * s * 2.0, h / 5.0 * s);
  phoneShape = new CANNON.Box(size);
  phone_body.addShape(phoneShape);
  phone_body.position.set(0, 0, h / 5.0 * s);
  world.addBody(phone_body);
  demo.currentMaterial = new THREE.MeshLambertMaterial({
    color: 0x111111
  });
  demo.addVisual(phone_body);
  i = 0;
  colors = [0x004777, 0xA31621, 0x95C623, 0x624763, 0xFFD166, 0xEEEEEE];
  rc = function() {
    var rci;
    rci = Math.random() * colors.length | 0;
    return demo.currentMaterial = new THREE.MeshLambertMaterial({
      color: colors[rci]
    });
  };
  results = [];
  while (i < 50) {
    rc();
    body = new CANNON.Body({
      mass: mass,
      material: card_mat
    });
    size = new CANNON.Vec3(h * s, w * s, d * s);
    shape = new CANNON.Box(size);
    body.addShape(shape);
    body.position.set(rnd() * 5.0, rnd() * 5.0, i * 2.0 + 5);
    body.quaternion.setFromEuler(rnd() / 2.0, rnd() / 2.0, rnd() / 2.0, "XYZ");
    world.addBody(body);
    demo.addVisual(body);
    results.push(i++);
  }
  return results;
});

demo.start();
