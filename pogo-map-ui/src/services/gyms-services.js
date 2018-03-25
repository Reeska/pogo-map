function getGyms () {
  return window
    .fetch('http://localhost:3000/gyms')
    .then(response => response.json())
}

function postRaid (raid) {
  return window
    .fetch('http://localhost:3000/raids', {
      body: JSON.stringify(raid),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
}

function getActiveRaids() {
  var now = new Date();
  var minimumDate = new Date(now.getTime() - 45*60*1000);
  var maximumDate = new Date(now.getTime() + 60*60*1000);
  return window
    .fetch('http://localhost:3000/raids?start=' + minimumDate.toISOString() + '&end=' + maximumDate.toISOString())
    .then(response => response.json())
}

export {
  getGyms,
  postRaid,
  getActiveRaids
}
