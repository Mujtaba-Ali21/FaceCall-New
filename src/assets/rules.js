export const rules = {
  disableBtn: function (phoneNumber) {
    if (phoneNumber < 7) {
      return true;
    } else if (phoneNumber > 15) {
      return false;
    } else {
      return true;
    }
  }
};