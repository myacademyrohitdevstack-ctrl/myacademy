export const validateStep = (step, form) => {
  switch (step) {
    case 0:
      if (!form.goal) return "Please select a learning category.";
      break;

    case 1:
      if (!form.language)
        return "Please select a language or subject.";
      break;

    case 2:
      if (!form.level)
        return "Please select your current level.";
      break;

    case 3:
      if (!form.focus)
        return "Please select your learning focus.";
      break;

    case 4:
      if (!form.budget)
        return "Please select your budget.";
      break;

    case 5:
      if (form.availability.length === 0)
        return "Please select at least one day.";
      break;

    case 6:
      if (!form.timeSlot)
        return "Please select a preferred time slot.";
      break;

    case 7:
      if (!form.tutor)
        return "Please select a learning preference.";
      break;

    case 8:
      if (!form.name.trim())
        return "Please enter your name.";

      if (!form.email.trim())
        return "Please enter your email.";

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      )
        return "Please enter a valid email.";

      if (!form.phone?.trim())
        return "Please enter your phone number.";

      if (!/^[0-9]{10}$/.test(form.phone))
        return "Please enter a valid 10 digit phone number.";

      break;

    default:
      return "";
  }

  return "";
};