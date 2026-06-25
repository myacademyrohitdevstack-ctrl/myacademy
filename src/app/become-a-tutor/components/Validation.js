export function validateStep(step, form) {
  switch (step) {
    // Subject
    case 0:
      if (!form.subject) {
        return "Please select a subject";
      }
      break;

    // Experience
    case 1:
      if (!form.experience) {
        return "Please select your teaching experience";
      }
      break;

    // Student Level
    case 2:
      if (!form.studentLevel) {
        return "Please select who you teach";
      }
      break;

    // Teaching Mode
    case 3:
      if (!form.mode) {
        return "Please select a teaching mode";
      }
      break;

    // Availability
    case 4:
      if (!form.availability?.length) {
        return "Please select at least one available day";
      }
      break;

    // Time Slot
    case 5:
      if (!form.timeSlot) {
        return "Please select your preferred teaching hours";
      }
      break;

    // Earnings
    case 6:
      if (!form.earnings) {
        return "Please select your expected earnings";
      }
      break;

    // Qualification
    case 7:
      if (!form.qualification) {
        return "Please select your qualification";
      }
      break;

    // Contact Information
    case 8:
      if (!form.name?.trim()) {
        return "Please enter your full name";
      }

      if (!form.email?.trim()) {
        return "Please enter your email address";
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(form.email)) {
        return "Please enter a valid email address";
      }

      if (!form.phone?.trim()) {
        return "Please enter your phone number";
      }

      const phoneRegex = /^[0-9]{10}$/;

      if (!phoneRegex.test(form.phone.replace(/\s/g, ""))) {
        return "Please enter a valid 10-digit phone number";
      }

      if (!form.city?.trim()) {
        return "Please enter your city";
      }

      break;

    default:
      return null;
  }

  return null;
}