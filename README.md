# Torrvision

## A torrent player in the browser

## what's included

- [x] read magnet links and info hashes
- [x] select file to play if more than one are found
- [x] save downloaded files once torrent is completed

****

## Important

I'm currently rebuilding the project from the ground up: you can get an idea of the new design [here](https://www.figma.com/file/OtJol3c385qlI6tmKGta8Y/Torvision?node-id=0%3A1)

## Technical Stack

⚛ React

⚛ Tailwind CSS

⚛ HeroIcons

🕸 [Webtorrent](https://webtorrent.io/)

****

## What's to come

- [ ] playlist selection (change file once one is playing)
- [ ] save files as they get downloaded
- [ ] verify if there is at least one playable media
- [ ] make the video player a fixed size

## What's to develop

- [ ] drag and drop a torrent file to skip fetching metadata
- [x] refactoring using react hooks instead of classes
- [x] better component separations
- [ ] caching system (not having to download the same torrent twice in the same session)

## Want to help? Found a mistake? have a suggestion?

### Open an issue and feel free to submit pull requests!

## How to contribute

the application was built using create-react-app; simply clone the repository and run

```sh
yarn && yarn start
```
