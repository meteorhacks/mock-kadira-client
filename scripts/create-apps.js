
// distribute apps by plans (free plan gets more priority than others)
var plans = ['free', 'solo', 'startup', 'pro', 'business'];

// remove existing temporary apps
db.apps.remove({__temp__: true});
var apps = [];

// insert 10000 test apps
for(var i=0; i<10000; ++i) {
  apps.push({
    _id: "test-app-" + i,
    name: "test-app-" + i,
    created: new Date(),
    owner: "test-app-owner",
    secret: "test-app-secret",
    readonlySecret: "test-app-secret-ro",
    plan: plans[i % plans.length],
    initialDataReceived: Date.now(),
    shard: "one",
    __temp__: true,
  });
}

db.apps.insert(apps);
