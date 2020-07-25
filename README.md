# Warcraft Classic Logs Bot

Interacts with the https://classic.warcraftlogs.com API to provide Discord chat commands

![](https://i.imgur.com/irBp7fz.png)

## Features

* `?wcl config` Configure the realm name and region. Note: This must be done once by an administrator before the bot can be used.
* `?wcl player <name> <DPS, Healer, Tank>` Retrieves latest parses for a given player and spec (optional)

## Prerequisites

* `node ^12.18.x`
* `postgres`

## Installation

Create a .env file at the root of the project with the following:
```
ENV= #[develop, production]
TOKEN= #discord bot token
TEST_TOKEN= #test discord bot token
DB_URI= #postgres connection uri
```

1. `npm install`
2. `npm run develop`

## To do

[Trello](https://trello.com/b/vlfpkSkx)
