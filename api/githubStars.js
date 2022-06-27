const token = ""; // obtain from github
const fetchGithubStars = async (user, repo) => {
  const res = await fetch(`https://api.github.com/repos/${user}/${repo}`, {
    headers: {
      Authorization: token,
    },
  });
  const data = await res.json();
  return data.stargazers_count;
};
export default fetchGithubStars;
