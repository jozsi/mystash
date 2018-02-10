// For now we'll use a lightweight prediction algo (simple linear regression)
// We can switch to a more advanced algo later on
const knn = require("k.n.n");

const classification = {};

classification.predict = function(features, target, k=3) {
  if (k < 1) {
    throw new Error('k needs to be greater than 0');
  }

  let model = new knn(features);

  let knnResult = model.launch(target);

  return knnResult.type;
}

module.exports = classification;