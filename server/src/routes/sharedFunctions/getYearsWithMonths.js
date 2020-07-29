async function getYearsWithMonths(uniqueYears, model) {
  const promises = uniqueYears.map(async (uniqueYear) => {
    const yearsWithMonths = await model.aggregate([
      { $match: { year: uniqueYear } },
      { $group: { _id: "$year", months: { $addToSet: "$month" } } },
    ]);

    return yearsWithMonths.map(({ _id, months }) => ({
      year: _id,
      months: months.sort((a, b) => b - a),
    }));
  });

  const years = await Promise.all(promises);
  return [].concat.apply([], years).sort((a, b) => b.year - a.year);
}

module.exports = getYearsWithMonths;
