# SOV / ORE Expo Router app

A mobile-first Expo + React Native + TypeScript app with Expo Router and a premium ORE-inspired dark theme. The current build uses dummy product data only and is safe to extend without live APIs.

## Project structure

- `app/` route files and tab layout
- `components/` shared UI primitives and screen templates
- `constants/` theme tokens and tab metadata
- `hooks/` layout helpers for mobile and web
- `lib/` dummy screen data
- `assets/` static assets

## Run the app

1. Install dependencies with `npm install`.
2. Start the Expo dev server with `npm start`.
3. Open platform targets with:
   - `npm run ios`
   - `npm run android`
   - `npm run web`

## Notes

- The tab experience is optimized for phones first and remains compatible with Expo web.
- No real APIs, wallets, or blockchain calls are wired yet.
