const token = "ec596b0dca8a476a97adbc01f748b53e";
const baseUrl = "https://api.football-data.org/v4/competitions/2000";

function getStandings() {
  const url = `${baseUrl}/standings`

  axios.get(url, {
    headers: {
      "X-Auth-Token": token
    }
  })
  .then((response) => {
    
    const standings = response.data.standings
    
    document.getElementById("standings").innerHTML = ""
    for (standing of standings) {
      
      let tableContent = ""
      
      for(row of standing.table) {

        tableContent += `
        <li class="list-group-item">
          <div class="row">
            <div class="col-sm-4 d-flex justify-content-center align-items-center" style="text-align: center;">
              <span class="flag">
                <img class="rounded-circle border border-2" src="${row.team.crest}" alt="" style="height: 40px; width: 40px; object-fit: cover; ">
              </span>
              <h5 style="margin: auto 4px;">
                <b>${row.team.tla}</b>
              </h5>
            </div>
            <div class="col-sm-2" style="text-align: center;">
            ${row.won}
            </div>
            <div class="col-sm-2" style="text-align: center;">
            ${row.lost}
            </div>
            <div class="col-sm-2" style="text-align: center;">
            ${row.draw}
            </div>
            <div class="col-sm-2" style="text-align: center;">
              <b>${row.points}</b>
            </div>
          </div>
        </li>
        `
      }

      const content = `
      <div class="col-sm-6 mb-4">
          <div class="card shadow border-none">
            <div class="card-header">
              <b>${standing.group}</b>
            </div>
            <div class="row m-0 secondRow">
              <div class="col-sm-4" style="text-align: center;">
                team
              </div>
              <div class="col-sm-2" style="text-align: center;">
                W
              </div>
              <div class="col-sm-2" style="text-align: center;">
                L
              </div>
              <div class="col-sm-2" style="text-align: center;">
                D
              </div>
              <div class="col-sm-2" style="text-align: center;">
                pts
              </div>
            </div>
            <ul class="list-group list-group-flush">

                ${tableContent}

            </ul>
          </div>
        </div>
      `

      document.getElementById("standings").innerHTML += content
    }
  })

}

getStandings()