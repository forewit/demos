## Initial Setup
#### Setup svelte static site
1. install svelte and the static adapter
```bash
npm create svelte@latest
npm i -D @sveltejs/adapter-static
```

2. update svelte.config.js to be compatible with the static adapter and gh-pages
```js
// Change adapter from adapter-auto to adapter-static...
import adapter from '@sveltejs/adapter-static';

// Add the following to config.kit...
const config = {
    // ...
    kit: {
        // ...
		appDir: 'app',
		paths: {
			base: process.env.NODE_ENV === "production" ? "/YOUR_GITHUB_REPO" : "",
		}
	}
}
```

3. add the following to /src/+layout.ts (or create the file):
```ts
export const prerender = true;
export const trailingSlash = "always";
```

#### Setup deploy to gh-pages

1. Install gh-pages
```bash
npm install gh-pages --save-dev
```

1. Add scripts to package.json
```json
{
    "deploy": "touch build/.nojekyll && gh-pages -d build -t true",
    "magic":"git add . && git commit -am 'na' && git push origin main && vite build && touch build/.nojekyll && gh-pages -d build -t true"
}
```

1. How to run (deploy will publish to gh-pages, magic will commit, push, and publish):
```bash
npm run deploy
npm run magic
```
See: https://github.com/metonym/sveltekit-gh-pages

#### Setup firebase

1. Install firebase
```bash
npm install firebase
```

1. Add firebase config to $lib/firebase/firebase.client.js (see [Demos](https://github.com/forewit/demos) repo for an example)

2. Add your environment variables to /.env 
```env
VITE_APIKEY=
VITE_AUTHDOMAIN=
VITE_PROJECTID=
VITE_STORAGEBUCKET=
VITE_MESSAGINGSENDERID=
VITE_APPID=
```

TIP: use Svelte Store for firebase auth & handlers: `stores/authStore.js`
TIP: use +layout.svelte to subscribe to auth updates and keep the Svelte Store up-to-date


#### Setup service-worker and page caching
(see [Demos](https://github.com/forewit/demos) repo for example of a manifest.json and service-worker.js for page caching)

1. create service worker: /src/service-worker.js 
2. create manifest: /static/manifest.json
3. update /src/app.html to include the manifest:
```html
<html lang="en">
    ...
    <head>
        ... 
        <!-- add the following line -->
		<link rel="manifest" href="/demos/manifest.json" />
```