import { ValidationError } from 'sequelize';

class CustomValidationError extends ValidationError {
  constructor(errors) {
    super(errors);
    this.name = 'CustomValidationError';
    this.customMessages = this.formatMessages(errors);
  }

  formatMessages(errors) {
    return errors.map(err => err?.message).join("||");
  }
}

export default CustomValidationError;
