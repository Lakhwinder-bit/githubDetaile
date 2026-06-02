const axios = require("axios");
const db = require("../utils/databaseUtils");

exports.anylizeGithub = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    const [userResponse, reposResponse] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos`),
    ]);

    const user = userResponse.data;
    const repos = reposResponse.data;

    let totalStars = 0;
    let totalForks = 0;
    const languages = {};

    for (const repo of repos) {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;

      if (repo.language) {
        languages[repo.language] =
          (languages[repo.language] || 0) + 1;
      }
    }

    let max = 0;
    let topLanguage = "N/A";

    for (const lang in languages) {
      if (languages[lang] > max) {
        max = languages[lang];
        topLanguage = lang;
      }
    }

    // Save directly in MySQL
    await db.execute(
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
        user.login,
        user.name,
        user.bio,
        user.avatar_url,
        user.html_url,
        user.public_repos,
        totalStars,
        totalForks,
        topLanguage,
      ]
    );

    return res.status(200).json({
      success: true,
      message: "User fetched and saved successfully",
      userData: {
        username: user.login,
        name: user.name,
        followers: user.followers,
        publicRepos: user.public_repos,
        totalStars,
        totalForks,
        topLanguage,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};