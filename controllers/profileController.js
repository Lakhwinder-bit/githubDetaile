const axios = require("axios");
const db = require("../utils/databaseUtils");
const { setUser } = require("../models/githubModel");
const { sendData } = require("../models/githubModel");
const { userExists} = require("../models/githubModel");

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

    const exists = await userExists(username);

if (exists) {
  return res.status(409).json({
    success: false,
    message: "User already exists"
  });
}
     await setUser({
      username: user.login,
      name: user.name,
      bio: user.bio,
      avatar: user.avatar_url,
      profile_url: user.html_url,
      public_repos: user.public_repos,
      total_stars: totalStars,
      total_forks: totalForks,
      top_language: topLanguage,
    });

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

exports.giveData = async(req, res)=>{
try {
  const resultUser = await sendData();
if(!resultUser || resultUser.length === 0){
  return res.status(400).json({
    success:false,
    message:"Data is not found try again..."
  })
}else{
  res.status(200).json({
    success:true,
    message:"THis is sucssfully working...",
    data: resultUser,
  })
}

} catch (error) {
  return res.status(400).json({
    success:false,
    message:("This is not working api",error)
  })
}
}