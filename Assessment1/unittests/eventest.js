const { addEven } = require("../libs/addeven");

const testEven = (req, res) => {
  let a = 2;
  let b = 4;
  let c = 6;
  if (addEven(a, b, c) == 12) {
    res.send("Adding first three even numbers test case passed");
  } else {
    res.send("Adding first three even numbers test case failed");
  }
};
module.exports = { testEven };
