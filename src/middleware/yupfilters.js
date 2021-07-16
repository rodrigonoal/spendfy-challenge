const yup = require('yup');
const weekdays = require('../assets/weekdays');


const documentFilter = async (req, res, next) => {
    const schema = yup.object().shape({
        name: yup.string().trim().required(),
        content: yup.string().trim().required()
    }) 
    
    try {
        await schema.validate(req.body);

    } catch (error) {
        return res.status(400).json(error.message);
    }

    return next();
}

const weesdayAfterFilter = async (req, res, next) => {
    const schema = yup.object().shape({
        amountOfDays: yup.number().integer().required().positive(),
        startday: yup.string().trim().required()
            .test(value => weekdays.find(weekday => weekday === value))
    });

    try {
        await schema.validate(req.query);

    } catch (error) {
        return res.status(400).json(error.message);
    }

    return next();
}


module.exports = {
    documentFilter,
    weesdayAfterFilter
}