const axios = require("axios");

exports.anylizeGithub = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is not defined.",
      });
    }
    const [userResponse, reposResponse] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos`),
    ]);

    const repos = reposResponse.data;
    const user = userResponse.data;

    let totalStart = 0;
    let totalFroks = 0;
    const languages = {};

    for (const repo of repos) {
      totalStart += repo.stargazers_count;
      totalFroks += repo.forks;

      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    }

    let max = 0;
    let topLanguage = "";
    for (const lang in languages) {
      if (languages[lang] > max) {
        max = languages[lang];
        topLanguage = lang;
      }
    }
    console.log(topLanguage)

    return res.status(200).json({
      success: true,
      message: "User fatch succesfully..",
      userData: {
        name: user.name,
        bio: user.bio,
        avatar: user.avatar_url,
        user_url: user.html_url,
        public_repo: user.public_repos,
        totalStart,
        totalFroks,
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
