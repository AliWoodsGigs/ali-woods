# Ali Woods Gigs

This monorepo contains the website and content management system UI for [aliwoodsgigs.com](https://aliwoodsgigs.com).

- `apps/web` - Nextjs web application, used to render webpages
- `apps/cms` - Sanity Studio UI, used to manage content in Sanity.io

## Admin Linkts
- [Vercel](https://vercel.io) - Manage Website and CMS Studio deployment
- [Sanity](https://www.sanity.io/manage/) - Manage CMS Project
- [Sanity Studio](https://ali-woods-cms.vercel.app/) - Manage Content
- [Google Analytics](https://analytics.google.com/analytics/web/?authuser=1#/p428985150/) - View usage statistics

## Key Technologies
- [Nextjs](https://nextjs.org) - Website framework
- [Sanity](https://www.sanity.io/) - Content Management System
- [Turborepo](https://turbo.build/) - Monorepo build management

## Getting Started

To get started with this project, follow these steps:

- Ensure you have `npm` and `node` installed. The project should run with Node v18 or greater
- Clone this respository
```shell
git clone git@github.com:agarioch/ali-woods.git
```
- For convenience, install `turbo` globally to make the command available on path. Alternatively you can run `npx turbo`
- Install packages from the project root
```shell
npm install
```
- In the `/apps/web` folder create a `.env` file with the relevant environment variable values, following the `.env.example` template
- Run both applications in development mode
```shell
turbo run develop
```
- Access the applications at `localhost:3000` and `localhost:3333`

## Deployment
The project is deployed on Vercel. Deployments are automatically created whenever changes are pushed to the GitHub repository.

Content is stored in the Sanity Content Lake, there is no local database or CMS server to setup. If you need to make changes to the Sanity project you need access to the `ali-woods` project on https://www.sanity.io/manage, 

### Development workflow

- Commit changes to `develop` (or new feature) branch
- Push changes to GitHub remote origin

```shell
git checkout develop
# make changes to the apps code
git add .
git commit -m 'feat: add some example change'
git push origin develop
```

- Vercel should automatically create a new deployment with the latest changes
- Manually test the deployment (view all deployments at `https://vercel.com/{user}/{project-name}/deployments`)

### Production workflow

- When ready to push live, merge changes into `main` branch & push to GitHub or create a pull request and merge via GitHub

```shell
git checkout main
git merge develop
git push origin main
```

## Other Notes
- Analytics are enabled at Google Analytics
- Webhooks will trigger automatic page rebuilds whenever CMS content is updated

## Future Improvements
With additional time the following improvements could be made to this project:

**Content**
 - [ ] Allow content admins to order video
 - [ ] Allow content admins to update copy
 - [ ] Allow content admins to update SEO metadata
 - [ ] Allow content admins to create and edit new pages e.g. blogposts or about
 - [ ] Replace email capture with newsletter service

 **Website**
 - [ ] Add modern format images to improve page loading speed
 - [ ] Replace hero background png with svg pattern to improve loading speed and allow animation

## Disclaimer

**Designs:**
- The designs, including but not limited to graphics, and visual elements, are the intellectual property of the designer, [Ed Williams](https://www.edwilliamsdesign.com/).

**Content:**
- All content, including text, media, and any other client-provided material, is owned by [Ali Woods](https://aliwoodsgigs.com). 
- Ali is solely responsible for ensuring that all images, content, and materials uploaded to the website do not infringe upon any copyrights or intellectual property rights.


**Code:**
- The source code and associated files provided for this project were created by [Alistair Garioch](https://github.com/agarioch) and are offered "AS IS" with no warranties, neither expressed nor implied. The code is provided without any commitments to ongoing support.
- By using this code, you acknowledge and accept the terms mentioned above.

