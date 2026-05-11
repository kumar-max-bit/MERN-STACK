const userDetails=[];

const displayUsers=()=>{
    console.log(userDetails);
};

const postUser = (user) => {
    userDetails.push(user);
};

const deleteUser = (username) => {
    const index = userDetails.findIndex(user => user.username === username);
    if (index !== -1) {
        userDetails.splice(index, 1);
        console.log(`User ${username} deleted.`);
    } else { 
        console.log(`User not found: ${username}`);
    }
};

const updateUser = (username, updatedData) => {
    const index = userDetails.findIndex(user => user.username === username);
    if (index !== -1) {
        userDetails[index] = { ...userDetails[index], ...updatedData };
        console.log(`User ${username} updated.`);
    } else {
        console.log(`User not found: ${username}`);
    }
};

const findUser = (username) => {
    const user = userDetails.find(user => user.username === username);
    if (user) {
        console.log("User found:", user);
        return user;
    } else {
        console.log(`User not found: ${username}`);
        return null;
    }
};

const clearAllUsers = () => {
    userDetails.length = 0;
    console.log("All users cleared.");
};

const addUserWithValidation = (user) => {
    if (!user.username || !user.age) {
        console.log("Invalid user data: username and age are required.");
        return;
    }
    postUser(user);
    console.log(`User ${user.username} added with validation.`);
};

const getUserCount = () => {
    console.log(`Total users: ${userDetails.length}`);
    return userDetails.length;
};

// --- Script Execution ---
// This block demonstrates the functionality of the defined functions.

console.log("--- Starting User Storage Script ---");

postUser({username:"John",age:30,city:"New York"});
postUser({username:"Jane",age:25,city:"Los Angeles"});
displayUsers(); 

deleteUser("John");
displayUsers();

updateUser("Jane", { age: 26, city: "San Francisco" });
displayUsers();

findUser("Jane");

addUserWithValidation({ username: "Alice", age: 28, city: "Chicago" });
displayUsers();

getUserCount();

clearAllUsers();
displayUsers();

console.log("--- Script Finished ---");

module.exports = { displayUsers, postUser, deleteUser, updateUser, findUser, clearAllUsers, addUserWithValidation, getUserCount };

 let userDetails = [];

const displayUser = () => {
  return userDetails;
};

const postUsers = (user) => {
  userDetails.push(user);
};

const deleteUser = (name) => {
  const afterUsersDelete = userDetails.filter((user) => user.name != name);
  userDetails = afterUsersDelete;
};

const displayUserBasedEmail = (email) => {
  const afterEmailFilterUser = userDetails.filter(
    (user) => user.email == email,
  );
  return afterEmailFilterUser;
};

//edit name based Email
const updateName = (name, email) => {
  const foundUser = userDetails.filter((user) => user.email == email);
  if (foundUser.length == 1) {
    foundUser[0].name = name;
  } else {
    console.log("email not found");
  }
};

module.exports = {
  updateName,
  displayUser,
  postUsers,
  deleteUser,
  displayUserBasedEmail,
};