
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null: err.stack
    })
}

// const errorHandler = (err, req, res, next) => {
//   let customError = {
//     // set default
//     statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
//     msg: err.message || 'Something went wrong try again later',
//   }

//   // if (err instanceof CustomAPIError) {
//   //   return res.status(err.statusCode).json({ msg: err.message })
//   // }

//   if (err.name === 'ValidationError') {
//     customError.msg = Object.values(err.errors)
//       .map((item) => item.message)
//       .join(',')
//     customError.statusCode = 400
//   }
//   if (err.code && err.code === 11000) {
//     customError.msg = `Duplicate value entered for ${Object.keys(
//       err.keyValue
//     )} field, please choose another value`
//     customError.statusCode = 400
//   }
//   if (err.name === 'CastError') {
//     customError.msg = `No item found with id : ${err.value}`
//     customError.statusCode = 404
//   }

//   return res.status(customError.statusCode).json({ msg: customError.msg })
// }

export default errorHandler