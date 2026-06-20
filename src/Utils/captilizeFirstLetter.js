function capitalizeFirstLetter(str) {
  if (!str) return ''; // Handles empty strings safely
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export default capitalizeFirstLetter