# Bitchsky Social App 🧙

Hey, bitches! This is the codebase for the Bitchsky app, based on [social.daniela.lol](https://github.com/kittibytess/deer-social) and prior [Bluesky](https://github.com/bluesky-social/social-app) forks.

Get the app itself:

- **Web: [bitchsky.app](https://bitchsky.app)**
- **iOS: [Soon™](https://large-type.com/#%F0%9F%99%80)?**
- **Android: [Github Releases](https://github.com/jollywhoppers/bitchsky-app/releases/latest)**

<a href="https://apps.obtainium.imranr.dev/redirect?r=obtainium://add/https://github.com/jollywhoppers/bitchsky-app/">
<img src="https://github.com/ImranR98/Obtainium/blob/main/assets/graphics/badge_obtainium.png?raw=true"
alt="Get it on Obtainium" align="center" height="54" /></a>

## Improvements on Bluesky

- Funner name (still love you tho bsky!)
- Nicer colors (kinda like gruvbox? not really)
- We call them skeets (at least for English users)
- Attempts to ignore `!no-unauthenticated` labels
- Share links to bitchsky.app or bsky.app
- Embed player works with [stream.place](https://stream.place/) links!
- No push notifications (may be added later)
- Kept as up-to-date as possible (sporadically unstable as a result)

### Experiments

These are all available as options in a sub-page of the app's settings.

- Toggle go.bsky.app link proxying for analytics
- Toggle to see skeets in quotes through blocks and detachments (broken 💔)
- Toggle to trust your own preferred verifiers (and to operate as one yourself)
- Toggle to disable the default app labeler

#### Tweaks

- Toggle to turn non-bsky.social handles into clickable links
- Toggle to combine reskeets in horizontal carousels
- Toggle the following feed fallback to the discover feed
- Toggle displaying images in higher quality
- Toggle to only show a single tab if only one feed is pinned
- Toggle to prevent others from getting notified when you interact with their reskeets
- Toggle similar account recommendations

#### Metrics

You can completely disable the visiblity of all metrics individually, including the number of:

- likes
- reskeets
- quotes
- saves
- replies

#### Gates

- Toggle for an alternate share icon
- Toggle to show feed context for debugging
- Toggle to hide the 'show latest' button
- Toggle to make reply button open thread from feeds
- More may be available in developer mode
  - (Accessible by holding the version in the About settings screen)

## Upcoming or wishful features

- Better OpenGraph support for sharing profiles & skeets (including videos)
- Selecting a custom AppView
- Seeing past blocks in threads (the nuclear block in reply chains)
- Configure the location used to determine regional labelers

### TODO: Xan

- [ ] Update branding (especially colors and app icon) to Bitchsky
  - [ ] ./src/components/WelcomeModal.tsx (tab/hover selector)
  - [ ] ./src/alf/themes.ts (improve contrast, esp. of links)
  - [ ] ./src/lib/styles.ts (change likes color, remove gradient from new skeet button)
  - [ ] ./src/style.css (change links color)
  - [ ] ./assets/app-icons/ (change new bksy logos to fit Bitchsky -remove from social embed!)
  - [ ] social embed stuff (bitchsky logo in image with jollywhoppers logo, use bitchsky icon)
- [ ] Setup App Linking for Android (.well-known w/ app package fingerprint)
- [ ] Automatic PDS detection like other social-app forks (fallback/email addresses to use bitchsky.social)
- [ ] Like of or repost of repost icons in notifications
- [ ] Change followed accounts [on onboarding](https://github.com/blacksky-algorithms/blacksky.community/commit/e36ee43efb4999f070860d7f70122e45b28c1e2b)
- [ ] Change ChatEmptyPill strings for English locale
- [ ] Pronouns+ from forks like [deer.aylac.top](https://github.com/ayla6/deer-social-test)
- [ ] Visual replies indicator like the [Firmament userstyle](https://bitchsky.app/profile/did:plc:jwhxcrf5uvl3vyw7nurecgt5/post/3m4rr3vzmak2a) (and likes?)
- [ ] Additional translation service providers + setting (Deepl, Kagi)
- [ ] Move Mutuals label to the follow button
- [ ] Change defaults (alt text nation, link non-bsky handles, autoplay OFF, hide similar account recommendations)
- [ ] Bitchsky PDS and .social site (list good songs containing 'bitch' in their titles)

#### Bugs

- [ ] Fix app crash on tapping profile header (./src/view/com/util/UserBanner.tsx)
- [ ] Fix regression causing zooming in to break on image lightboxes

### Even more wishful or far off

- [ ] Collapse labels past a customizable number (from the same labeler?) into a labeler clip "(+)"
- [ ] Submit releases to the Google Play Store and iOS App Store
- [ ] Likes tab on profiles for other users
- [ ] Move from GitHub to Tangled?
- [ ] Experimental toggle between handle and DID in share links?
- [ ] New fun language/locale(s) like Minecraft
- [ ] Move TOS and privacy policy to Jollywhoppers website?
- [ ] Rewrite ALF for M3 Expressive (with in-app color slider like red dwarf, for web?)

## Development Resources

This is a [React Native](https://reactnative.dev/) application, written in the TypeScript programming language. It builds on the `atproto` TypeScript packages (like [`@atproto/api`](https://www.npmjs.com/package/@atproto/api)), which are also open source, but in [a different git repository](https://github.com/bluesky-social/atproto).

There is vestigial Go language source code (in `./bskyweb/`), for a web service that returns the React Native Web application in the social app deployment. However, it is not used in current Bitchsky deployments.
For Bitchsky, the intended deployment is with a webserver that can serve static files, and reroute to `index.html` as needed. [Bitchsky](https://bitchsky.app) is currently hosted on [Cloudflare Pages](https://pages.cloudflare.com/).

The [Build Instructions](./docs/build.md) are a good place to get started with the app itself. If you use nix (and especially direnv) then `flake.nix` will get you a working environment for the web version of the app.

The Authenticated Transfer Protocol ("AT Protocol" or "atproto") is a decentralized social media protocol. You don't *need* to understand AT Protocol to work with this application, but it can help.
You may wish to reference [resources linked in social-app](https://github.com/bluesky-social/social-app#development-resources). However, please don't harass the Bluesky team with issues or questions pertaining to Bitchsky.

Bitchsky is a fork of the official Bluesky client, social-app. It encompasses a set of schemas and APIs built in the overall AT Protocol framework. The namespace for these "Lexicons" is `app.bsky.*`.

## Contributions

> Bitchsky is a community fork, and we'd love to merge your PR!

As a rule of thumb, the best features for Bitchsky are those that have a disproportionately positive impact on the user experience compared to the maintenance overhead. Unlike some open source projects, since Bitchsky is a soft fork, any features (patches) we add on top of upstream social-app need to be maintained. For example, a change to the way skeets are composed may be very invasive, touching lots of code across the codebase. If upstream refactors this component, we will need to rewrite this feature to be compatible or drop it from the client.

For this reason, only features that require changing only a small amount of code from upstream should be considered.

Without an overriding motivation, opinionated features should exist behind a toggle that is not enabled by default. This allows Bitchsky to cater to as many users as possible.

### Guidelines

- Check for existing issues before filing a new one please.
- Open an issue and give some time for discussion before submitting a PR.
  - This isn't strictly necessary, but the lead developers would love to give their thoughts and scope out your willingness to maintain the feature before you write it.
- Stay away from PRs like...
  - Changing "Quote" to "Bitch."
  - Refactoring the codebase, e.g., to replace React Query with Redux Toolkit, etc.
- Include a new toggle and preference for your feature.

If we don't merge your PR for whatever reason, you are welcome to fork and/or self-host:

## Forking guidelines

Just like social-app, you have our blessing 🪄✨ to fork this application! However, it's very important to make it clear to users when you're giving them a fork.

Please be sure to:

- Change all branding in the repository and UI to clearly differentiate from Bitchsky.
- Change any support links (feedback, email, terms of service, issue tracker, etc) to your own systems.

## Self hosting & personal builds

Self hosting is great! It is our intention that Bitchsky is easy to self host and build on your own. If you host your own instance of Bitchsky, or make your own builds, please make some level of effort to clarify that it is not an "official" build or instance. This can be in the form of a different domain or branding, but can also be as simple as not advertising your hosted instance or builds as "official" releases.

## Security disclosures

If you discover any security issues, please privately disclose them to [xan.lol](https://xan.lol/).
If the issue pertains to infastructure, code, or systems outside the scope of Bitchsky, please refer to the [disclosure guidelines on social-app](https://github.com/bluesky-social/social-app#security-disclosures) if it is hosted by Bluesky PBC. Otherwise, reference the security policy of that system as applicable <3

## License (MIT)

See [./LICENSE](./LICENSE) for the full license.

Bluesky Social PBC has committed to a software patent non-aggression pledge. For details see [the original announcement](https://bsky.social/about/blog/10-01-2025-patent-pledge).

## P.S.

We ❤️ you and all of the ways you support us. Thank you for making Bluesky & Bitchsky so great! ^.^
