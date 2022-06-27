const token = ""; // obtain from stackexchange
const fetchStackoverflowQuestions = async (tag) => {
  const res = await fetch(
    `https://api.stackexchange.com/questions?site=stackoverflow&tagged=${tag}&key=${token}`
  );
  const data = await res.json();
  return data.items.length;
};
export default fetchStackoverflowQuestions;
