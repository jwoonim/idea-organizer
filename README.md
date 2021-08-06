## <a href="https://ideaorganizer.fun">Idea Organizer</a> 🚀
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

[`Idea Organizer`](https://ideaorganizer.fun) is a fun project and will help you to build a mind map easily.

## Motivation
I was building a mind map on the paper then I wanted to build a project to build a mind map for myself. Hope this project provides a better idea of full stack development using [Next.js](https://nextjs.org).

## Database Design
![Alt text](/database-design.png?raw=true "Database Design")

## Screenshots
![Alt text](/index.png?raw=true "Index")
*Index page*

![Alt text](/sign-up-page.png?raw=true "Sign up")
*Sign up page*

![Alt text](/sign-in-page.png?raw=true "Sign in")
*Sign in page*

![Alt text](/find-password-page.png?raw=true "Find password")
*Find password page*

![Alt text](/idea-page2.png?raw=true "Ideas")
*List of ideas page*

![Alt text](/ideas-edit-page.png?raw=true "Ideas edit")
*Create and update ideas page*

![Alt text](/account-settings-page.png?raw=true "Account settings")
*Account settings page*


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
