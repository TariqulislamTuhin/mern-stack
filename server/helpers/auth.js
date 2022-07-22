import bcrypt from "bcrypt";

/**
 * this function will take users Password as arg and return a promise
 * with either resove hashed Password or reject
 **/
export const hashPassword = (passwordFromUser) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(8, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(passwordFromUser, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

// this will return either true {Matched} or false {Not matched}
export const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
