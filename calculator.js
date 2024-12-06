const add = (numbers) => {
  if (!numbers) return 0;

  const delimiters = /[\n,]/;
  const nums = numbers.split(delimiters).map(Number);

  const negatives = nums.filter((num) => num < 0);
  if (negatives.length) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
  }

  return nums.reduce((sum, num) => sum + num, 0);
};

export default add;
