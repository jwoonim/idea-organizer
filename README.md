## <a href="https://ideaorganizer.fun">Idea Organizer</a> 🚀
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

[`Idea Organizer`](https://ideaorganizer.fun) is a fun project and will help you to build a mind map easily.

## Motivation
I was building a mind map on the paper then I wanted to build a project to build a mind map for myself. Hope this project provides a better idea of full stack development using [Next.js](https://nextjs.org).

## Database Design
![Alt text](/database-design.png?raw=true "Database Design")

## Development

### Before you run on a local environment, you need development environments below
| Environments | Versions |
| :------------| :------: |
| [Docker](https://www.docker.com) | v20.10.7 or later |
| [Node.js](https://nodejs.org) | v14.15.3 or later |


### Run
1. `app`
```bash
npm i # Install dependencies from package.json file
```

2. `root`
```bash
docker compose -f docker-compose.dev.yml up --build  # Build images then start containers
```

## License

MIT © [Jaewoon Im](https://github.com/jwoonim)
