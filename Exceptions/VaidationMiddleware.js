// Middleware to handle custom validation errors
export const errorHandler = (err, req, res, next) => {
    if (err.name === 'CustomValidationError') {
        res.status(400).json({ error: err.customMessages });
    } else {
        res.status(500).json({ error: err.message });
    }
}
