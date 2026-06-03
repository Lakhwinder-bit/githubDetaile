const db = require('../utils/databaseUtils');

exports.setUser = async (userData) => {
  const {
    username,
    name,
    bio,
    avatar,
    profile_url,
    public_repos,
    total_stars,
    total_forks,
    top_language,
  } = userData;

  const [result] = await db.execute(
    `INSERT INTO githubuserdetails
    (
      username,
      name,
      bio,
      avatar,
      profile_url,
      public_repos,
      total_start,
      total_forks,
      top_language
    )
    VALUES (?,?,?,?,?,?,?,?,?)`,
    [
      username,
      name,
      bio,
      avatar,
      profile_url,
      public_repos,
      total_stars,
      total_forks,
      top_language,
    ]
  );

  return result;
};


exports.sendData = async()=>{
try {
  const [rows] = await db.query('SELECT * FROM githubuserdetails')
  return rows;
} catch (error) {
  console.error(error)
  throw error
}
}
exports.userExists = async (username) => {
  // SELECT id FROM 
  // githubuserdetails WHERE 
  // username = 'Lakhwinder-bit' LIMIT 1;
  const [rows] = await db.query(
    "SELECT id FROM githubuserdetails WHERE username = ? LIMIT 1",
    [username]
  );

  return rows.length > 0;
};

exports.deleteUsers = async()=>{
  const result = db.query(
    "TRUNCATE TABLE githubdetails.githubuserdetails"
  )
  return result;

}
