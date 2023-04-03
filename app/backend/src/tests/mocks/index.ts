export const teamsMock = [
    {
        "id": 7,
        "teamName": "Flamengo"
      },
    {
        "id": 12,
        "teamName": "Palmeiras"
    }
];

export const userMock = {
    username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

export const matchMock = [
    {
        "id": 16,
        "homeTeamId": 11,
        "homeTeamGoals": 0,
        "awayTeamId": 7,
        "awayTeamGoals": 0,
        "inProgress": false,
        "awayTeam": {
          "id": 7,
          "teamName": "Flamengo"
        },
        "homeTeam": {
          "id": 11,
          "teamName": "Napoli-SC"
        }
      },
      {
        "id": 20,
        "homeTeamId": 7,
        "homeTeamGoals": 0,
        "awayTeamId": 9,
        "awayTeamGoals": 1,
        "inProgress": false,
        "awayTeam": {
          "id": 9,
          "teamName": "Internacional"
        },
        "homeTeam": {
          "id": 7,
          "teamName": "Flamengo"
        }
      },
      {
        "id": 28,
        "homeTeamId": 16,
        "homeTeamGoals": 3,
        "awayTeamId": 7,
        "awayTeamGoals": 0,
        "inProgress": false,
        "awayTeam": {
          "id": 7,
          "teamName": "Flamengo"
        },
        "homeTeam": {
          "id": 16,
          "teamName": "São Paulo"
        }
      },
]