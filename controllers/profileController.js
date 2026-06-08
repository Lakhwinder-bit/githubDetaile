const axios = require("axios");
const db = require("../utils/databaseUtils");
const {
  setUser,
  sendData,
  userExists,
  deleteUsers,
} = require("../models/githubmodel");

exports.anylizeGithub = async (req, res) => {
  console.log(req.url);
  try {
    const { username } = req.body;
  console.log("Username:", username);
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
        languages[repo.language] = (languages[repo.language] || 0) + 1;
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
        message: "User already exists",
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
return res.redirect("/data");
    // return res.status(200).json({
    //   success: true,
    //   message: "User fetched and saved successfully",
    //   userData: {
    //     username: user.login,
    //     name: user.name,
    //     bio: user.bio,
    //     followers: user.followers,
    //     publicRepos: user.public_repos,
    //     avatar: user.avatar_url,
    //     profile_url: user.html_url,
    //     totalStars,
    //     totalForks,
    //     topLanguage,
    //   },
    // });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.giveData = async (req, res) => {
  try {
    const resultUser = await sendData();

    if (!resultUser || resultUser.length === 0) {
      return res.render("data", {
        data: [],
      });
    }

    const filter = req.query.filter;

    let users = resultUser;

    if (filter === "stars") {
      const topStarsUser = resultUser.reduce((max, user) =>
        user.total_stars > max.total_stars ? user : max
      );

      users = [topStarsUser];
    }

    if (filter === "repos") {
      const topReposUser = resultUser.reduce((max, user) =>
        user.public_repos > max.public_repos ? user : max
      );

      users = [topReposUser];
    }

    res.render("data", {
      data: users,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send(error.message);
  }
};

exports.deleteData = async (req, res) => {
  try {
    await deleteUsers();
    return res.status(200).json({
      success: true,
      message: "user data deleted succfully...",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.topdata = async(req,res)=>{
  try {
    
  } catch (error) {
    res.status(400).json({
      message:error
    })
  }
}