const HOST = process.env.API_URL || 'http://localhost:3000';

let gyms = [];

async function getGyms () {
  if(!gyms.length) {
    gyms = await window
      .fetch(HOST + '/gyms')
      .then(response => response.json())
  }
  return gyms;
}

function postRaid (raid) {
  return window
    .fetch(HOST + '/raids', {
      body: JSON.stringify(raid),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
}

function putRaid (raid) {
  return window
    .fetch(HOST + '/raids/' + raid.id, {
      body: JSON.stringify(raid),
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
}

async function findGymIdByName(name) {
  return (await getGyms()).filter(gym => gym.name === name)
    .map(gym => gym.id)
    .reduce((a, b) => b, {});
}

async function findGymById(id) {
  return (await getGyms()).filter(gym => gym.id === id)
    .reduce((a, b) => b, {});
}

function getActiveRaids() {
  var now = new Date();
  var minimumDate = new Date(now.getTime() - 45*60*1000);
  var maximumDate = new Date(now.getTime() + 60*60*1000);
  return window
    .fetch(HOST + '/raids?start=' + minimumDate.toISOString() + '&end=' + maximumDate.toISOString())
    .then(response => response.json())
}

export {
  getGyms,
  postRaid,
  getActiveRaids,
  findGymIdByName,
  findGymById,
  gyms,
  putRaid
}
