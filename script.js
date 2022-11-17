const token = "ec596b0dca8a476a97adbc01f748b53e";
const baseUrl = "https://api.football-data.org/v4";

function getStandings() {
  const url = `${baseUrl}/competitions/2000/standings`

  axios.get(url, {
    headers: {
      "X-Auth-Token": `${token}`
    }
  })
  .then((response) => {
    console.log(response.data)
  });

}

getStandings(); 