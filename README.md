# Clear notes frontend
Make sure you have setup <a href="https://github.com/j0n/clear-notes">Clear notes server</a>
# Setup

`git clone git@github.com:j0n/clear-notes-frontend.git`

## install dependencies
`cd clear-notes-frontend`
`npm i`

## Add Url to server
Add .env and add `API_URL` as parameter
`cp env.sample .env`
`echo "URL_TO_URL_CLEAR_NOTES_SERVER" > .env`

## Start dev server
`npm run dev`

## Build for deploy
Add .env.prod and add URL to you prod server`API_URL` as parameter
`cp env.sample .env.prod`
`echo "URL_TO_URL_CLEAR_NOTES_SERVER" > .env.prod`

Then run `npm bun build`, the frontend code is output to `/dist` copy
to your static folder in your prefered react serving server





