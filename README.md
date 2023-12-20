# 🎶 Spotify Clon

![just-the-basics](./public/page.png)

## 🚀 Project Structure

This is the proyect structure of the spotify clon

```text
/
├── public/
│   ├── fonts/
│   ├── musics/
│   └── songPlayAnimation.gif
├── src/
│   ├── components/
│   │   ├── AsideMenu.astro
│   │   ├── CardPlayButton.jsx
│   │   ├── Greetings.svelte
│   │   ├── MusicsTables.jsx
│   │   ├── Player.jsx
│   │   ├── PlayListItemCard.astro
│   │   ├── SideMenuCard.astro
│   │   ├── SideMenuItem.astro
│   │   └── Slider.tsx
│   ├── icons/
│   │   ├── Home.astro
│   │   ├── Library.astro
│   │   └── Search.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   ├── colors.ts
│   │   └── data.ts
│   ├── pages/
│   │   ├── api/
│   │   │   └──get-info-playlist.json.js
│   │   ├── playlist/
│   │   │   └── [id].astro
│   │   └── index.astro
│   └── store/
│       └── playerStore.ts
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

##### This proyect is based in the video of midulive