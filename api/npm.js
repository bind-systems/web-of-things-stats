const fetchNpmDownloads = async (package1, package2) => {
  const res = await fetch(
    `https://api.npmjs.org/versions/${package1}%2F${package2}/last-week`
  );
  const data = await res.json();
  return Object.values(data.downloads).reduce((a, b) => a + b);
};
export default fetchNpmDownloads;
