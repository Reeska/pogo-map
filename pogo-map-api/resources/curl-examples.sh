#!/usr/bin/env bash

# Create raid
curl --http1.1 -H "Content-Type: application/json" \
-d '{
"gymId": "3",
"hatchTime": "2018-04-03T22:30:14.141Z"
}' http://localhost:3000/raids | jq

# Get raid
curl --http1.1 -H "Content-Type: application/json" \
http://localhost:3000/raids/d8fa9a00-377a-11e8-b309-bd89d6da8526 | jq

# Edit raid
curl --http1.1 -H "Content-Type: application/json" \
-X PUT \
-d '{
"gymId": "2",
"hatchTime": "2018-04-03T22:30:14.141Z",
"raidStartTime": "2018-04-03T23:30:14.141Z"
}' http://localhost:3000/raids/d8fa9a00-377a-11e8-b309-bd89d6da8526 | jq

# Add player
curl --http1.1 -H "Content-Type: application/json" \
-d '{
"nickname": "Reeska",
"accounts": 1
}' http://localhost:3000/raids/d8fa9a00-377a-11e8-b309-bd89d6da8526/players | jq