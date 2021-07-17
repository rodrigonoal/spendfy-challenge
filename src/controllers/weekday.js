const weekdays = require('../assets/weekdays');

const findWeekdayAfter = async (req, res) => {
  const { startday, amountOfDays } = req.query;

  const starter = weekdays.indexOf(startday);

  const daysToPass = amountOfDays >= 7 ? amountOfDays % 7 : Number(amountOfDays);

  const index = starter + daysToPass;

  const answer = weekdays[index > 6 ? index - 7 : index];

  return res.status(200).json(answer);
};

module.exports = findWeekdayAfter;
