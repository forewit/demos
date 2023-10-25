# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.


## deploy to gh-pages
Install : `npm install gh-pages --save-dev`
add "deploy" script: `"deploy": "touch build/.nojekyll && gh-pages -d build -t true"``
add "magic" script: `"magic":"git add . && git commit -am 'na' && git push origin main && vite build && touch build/.nojekyll && gh-pages -d build -t true"``

```bash
npm run deploy
npm run magic
```

## firebase auth

install: `npm install firebase`
configure in `//lib/firebase/firebase.client.js`
store environment variables from firebase console: `/.env` (naming convention for keys "VITE_NAME")