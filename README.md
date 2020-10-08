# SerMon
Extremely simple Server Monitor in a docker container.

![Screemshot](screenshot.png)

### Setup
1. Download `docker-compose.yml` file from this repo.
2. Create `data` folder (in the same location).
3. Create `data/config.json` file, e.g.:
```json
{
    "refreshInterval": 5000,
    "hostname": "Home Server",
    "hostip": "192.168.1.1",
    "notifications": {
        "slack": "https://hooks.slack.com/services/<web-hook-token>"
    },
    "system": [
        { "name": "Temperature", "source": "temp",      "unit": "°C", "warning": 40, "alert": 60 },
        { "name": "RAM",         "source": "meminfo",   "unit": "GB", "warning": 24, "alert": 28 },
        { "name": "1 min",       "source": "loadavg1",  "unit": "%",  "warning": 30, "alert": 60 },
        { "name": "5 min",       "source": "loadavg5",  "unit": "%",  "warning": 30, "alert": 60 },
        { "name": "15 min",      "source": "loadavg15", "unit": "%",  "warning": 30, "alert": 60 }
    ],
    "disks": [
        { "name": "System", "mnt": "/mnt/root" },
        { "name": "Backup", "mnt": "/mnt/backup" }
    ],
    "services": [
        { "name": "DNS", "url": "tcp://192.168.1.1:53" },
        { "name": "Google", "url": "https://google.com" },
        { "name": "Facebook", "url": "https://facebook.com" },
        { "name": "Fake", "url": "http://192.168.1.123" }
    ]
}
```
3. Run `docker-compose up -d`
4. Open `serverIP:3010` in your favourite Firefox browser :smile:

### TODO - Next
- [x] move all data to store
- [x] make server run periodically (e.g. every 3 - 5 sec)
- [x] add service summary (5 online, 1 offline) at the top
- [x] logo/icon
- [x] add `du` for /dev/sd* (as progressbars)
- [x] notifications & alerts
- [x] Allow to configure data displayed (e.g. gauges) based on the configured data sources
- [x] Allow to configure constraints/alert triggers
- [ ] log data in a db of sort
- [ ] show historical data (ping times, uptime)
- [ ] replace config with edit page




### 3rd party libs
- [gauges](https://canvas-gauges.com/)
