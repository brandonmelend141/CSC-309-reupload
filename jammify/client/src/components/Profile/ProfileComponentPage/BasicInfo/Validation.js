const nameValidation = (fieldName, fieldValue) => {
  if (!fieldValue) {
    return `${fieldName}: Field is required`;
  }
  if (fieldValue.trim() === "") {
    return `${fieldName}: Field is required`;
  }
  if (/[^a-zA-Z0-9]/.test(fieldValue)) {
    return `${fieldName}: Invalid characters`;
  }
  if (fieldValue.trim().length < 3) {
    return `${fieldName}: Needs to be at least 3 characters`;
  }
  if (fieldValue.trim().length > 15) {
    return `${fieldName}: Needs to be less than 15 characters`;
  }
  return "Valid";
};

const emailValidation = (fieldName, fieldValue) => {
  if (!fieldValue) {
    return "Valid";
  }
  if (fieldValue.trim() === "") {
    return "Valid";
  }
  // if (!/^[a-zA-Z0-9-.]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(fieldValue)) {
  //   return `${fieldName}: Invalid Format`;
  // }
  if (fieldValue.trim().length < 3) {
    return `${fieldName}: Needs to be at least 3 characters`;
  }
  if (fieldValue.trim().length > 30) {
    return `${fieldName}: Needs to be less than 30 characters`;
  }
  return "Valid";
};

const descValidation = (fieldName, fieldValue) => {
  if (!fieldValue) {
    return "Valid";
  }
  if (fieldValue.trim() === "") {
    return "Valid";
  }
  if (fieldValue.trim().length > 100) {
    return `${fieldName}: Needs to be less than 100 characters`;
  }
  return "Valid";
};

export { nameValidation, emailValidation, descValidation };
