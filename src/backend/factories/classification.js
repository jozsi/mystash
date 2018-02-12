// For now we'll use a lightweight prediction algo (simple linear regression)
// We can switch to a more advanced algo later on
const knn = require("k.n.n");

const classification = {};

classification.predict = function(features, target, k=3) {
  if (k < 1) {
    throw new Error('k needs to be greater than 0');
  }

  let data = [];

  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    
    if (!feature.type) {
      continue;
    }

    data.push(new knn.Node(feature));
  }

  let model = new knn(data);

  let knnResult = model.launch(k, new knn.Node(target));

  return knnResult.type;
}

module.exports = classification;