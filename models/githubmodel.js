// const db = require("../utils/databaseUtils");

// exports.saveProfile = async (data) => {
//   return db.execute(
//     `INSERT INTO githubuserdetails
//     (
//       username,
//       name,
//       bio,
//       avatar,
//       profile_url,
//       public_repos,
//       total_start,
//       total_forks,
//       top_language,
//        followers,

//     )
//     VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
//     [
//       data.username,
//       data.name,
//       data.bio,
//       data.avatar,
//       data.profile_url,
//       data.followers,
//       data.public_repos,
//       data.total_start,
//       data.total_forks,
//       data.top_language,
//     ]
//   );
// };