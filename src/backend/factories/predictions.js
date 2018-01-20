// For now we'll use a lightweight prediction algo (simple linear regression)
// We can switch to a more advanced algo later on
const regression = require('regression');

const prediction = {};

prediction.predict = function(trainingX, trainingY, stepsAhead, startPoint) {
  let data = [];
  try {
    for (let i = 0; i < trainingX.length; i++) {
      // Todo: Check all paramaters are numerical (if text, regression will not work correctly)
      data.push([parseInt(trainingX[i], 10), trainingY[i]]);
    }
  }
  catch (err) {
    throw new Error('trainingX and trainingY must be vectors of the same size. Found %d and %d respectively', trainingY.length, trainingY.length);
  }

  if (stepsAhead < 0) {
    throw new Error('Expected stepsAhead to be greater or equal to 0. Found %d', stepsAhead)
  }

  let regressionResult = regression.linear(data);
  let result = [];

  for (let i = 0; i < stepsAhead; i++) {
    result.push(regressionResult['predict'](startPoint + i));
  }

  return result;
}

module.exports = prediction;