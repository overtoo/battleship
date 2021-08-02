const Ship = (length) => {
  const healthArray = [];
  for (let i = 0; i < length; i++) {
    healthArray.push("-");
  }

  const getLength = () => length;

  const hit = (position) => {
    healthArray[position] = "X";
  };

  const isSunk = () => {
    if (healthArray.every((segment) => segment == "X")) {
      return true;
    } else return false;
  };

  const getHealth = () => {
    return healthArray;
  };

  return { getLength, hit, isSunk, getHealth, length };
};

// module.exports = Ship;
export default Ship;
