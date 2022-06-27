const fetchGithubRepos = async (topic) => {
  const res = await fetch(
    `https://api.github.com/search/repositories?q=topic:${topic}`
  );
  const data = await res.json();
  return data.total_count;
};
export default fetchGithubRepos;
