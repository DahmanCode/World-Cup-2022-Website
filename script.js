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

function getMatches() {
  const url = `${baseUrl}/matches`

  axios.get(url, {
    headers: {
      "X-Auth-Token": token
    }
  })
  .then((response) => {
    
    const matches = response.data.matches
    
    document.getElementById("matches").innerHTML = ""
    
    for (match of matches) {
      const homeTeam = match.homeTeam
      const awayTeam = match.awayTeam

      const utcDate = match.utcDate
      const matchTime = new Date(utcDate)
      const dateString =matchTime.getUTCFullYear() + " / " + (matchTime.getUTCMonth() + 1) + " / " + matchTime.getUTCDate() + " <br> " + matchTime.getUTCHours() + ":" + matchTime.getUTCMinutes()

      if (homeTeam.name == null) {
        continue
      }

      const content = `
        <div class="col-sm-12" >
            <div class="card shadow rounded-pill mt-5" style="overflow: hidden">                            
                
              <div class="card-body p-0">
                <div class="row">
                  <!-- FIRST TEAM COL -->
                  <div class="col-sm-3 d-flex flex-direction-column justify-content-center align-items-center match" style="border-right: solid 5px #5b0d25;">
                    <div class="d-flex align-items-center justify-content-center" style="text-align: center; margin: auto 0">
                      
                      <div>
                        <div class="flag">
                          <img 
                            class="rounded-circle border border-2" 
                            src="${homeTeam.crest}" 
                            alt=""
                            style="width: 40px; height: 40px; object-fit: cover"
                          >
                        </div>
                        <h5 style="margin:auto 4px">${homeTeam.tla}</h5>
                      </div>
                    </div>

                  </div>
                  
                  <div class="col-sm-6" style="text-align: center">
                    <div class="row">
                      <div class="col-sm-4" style="margin: auto 0px">
                        <h3>
                            ${match.score.fullTime.home ?? '-'}
                        </h3>
                      </div>
                      <div class="col-sm-4">
                        <h6>${match.group}</h6>
                        <h1>X</h1>                                        
                        <h6>${dateString}</h6>
                      </div>
                      <div class="col-sm-4" style="margin: auto 0px">
                        <h3>
                            ${match.score.fullTime.away ?? '-'}
                        </h3>
                      </div>
                    </div>
                  </div>
                  
                  <div class="col-sm-3 d-flex flex-direction-column justify-content-center align-items-center match" style="border-left: solid 5px #5b0d25;">
                    <div class="d-flex align-items-center justify-content-center" style="text-align: center; margin: auto 0">
                    
                      <div>
                        <div class="flag">
                          <img 
                            class="rounded-circle border border-2" 
                            src="${awayTeam.crest}" 
                            alt=""
                            style="width: 40px; height: 40px; object-fit: cover"
                          >
                        </div>
                        <h5 style="margin:auto 4px">${awayTeam.tla}</h5>
                      </div>
                    </div>
                  </div>

                </div>
                </div>

                </div>
        </div>
        <!--// MATCH COL //-->
      `

      document.getElementById("matches").innerHTML += content
    }
    
  })

}

getStandings()

getMatches()