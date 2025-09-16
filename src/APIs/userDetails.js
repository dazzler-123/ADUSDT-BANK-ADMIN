
class UserDetails {
  constructor() {
    this.token = '';
    this.userDetails = {};
    this.parameterCommonConfig = [];
  }

  setToken(token) {
    this.token = token;
  }

  setParameterCommonConfig(data) {
    this.parameterCommonConfig = data;
  }

  setUserDetails(details) {
    this.userDetails = details;
  }

  removeDetails() {
    this.token = '';
    this.userDetails = '';
    this.parameterCommonConfig = '';
  }
}

/**
 * Creates a new instance of the `UserDetails` class, which is responsible for managing user details and authentication tokens.
 */
const userDetails = new UserDetails();
export default userDetails;