# Bitchsky Social App 🐶

Hey, bitches! This is the codebase for the Bitchsky Social app, based on [social.daniela.lol](https://github.com/kittibytess/deer-social) based on [deer.social](https://github.com/a-viv-a/deer-social).

Get the app itself:

- **Web: [bitchsky.app](https://bitchsky.app)**
- **iOS: [Soon™](https://large-type.com/#%F0%9F%99%80)?**
- **Android: [Github Releases](github.com/devxan/bitch-social/releases/latest)**

<a href="https://apps.obtainium.imranr.dev/redirect?r=obtainium://add/https://github.com/devxan/bitch-social/">
<img src="https://github.com/ImranR98/Obtainium/blob/main/assets/graphics/badge_obtainium.png?raw=true"
alt="Get it on Obtainium" align="center" height="54" /></a>

## Improvements on Bluesky

- Funner name (still love you tho bsky!)
- Nicer colors (based on coffee...)
- We call them skeets (at least for English users)
- Ignores `!no-unauthenticated` labels
- Share links to bitchsky.app or bsky.app
- Embed player works with [stream.place](https://stream.place/) links!

### Experiments

These are all available as options in a sub-page of the app's settings.

- Toggle go.bsky.app link proxying for analytics
- Toggle to see skeets in quotes through blocks and detachments
- <img src="https://github.com/user-attachments/assets/e5084afd-b17e-43a7-9622-f6d7f19f53ca" width="300px" alt="example quote post removed by author, but still shown" />
- Toggle to trust your own preferred verifiers (and to operate as one yourself)
- Toggle to disable the default app labeler

#### Tweaks

- Toggle to combine reskeets in horizontal carousels
- Toggle the discover feed fallback in the following feed
- Toggle to allow visiting sites from clicking non-bsky.social handles
- Toggle displaying images in higher quality
- Toggle to only show a single tab if only one feed is pinned
- Toggle to prevent others from getting notified when you interact with their reskeets
- Toggle similar account recommendations

#### Metrics

You can disable the visiblity of all skeet metrics individually, including the likes, reskeets, quotes, saves, and reply counts.

#### Gates

- Toggle for an alternate share icon
- A couple others
- More may be available in developer mode

## Upcoming or wishful features

- OpenGraph support for sharing profiles & skeets
- Selecting a custom AppView
- Seeing past blocks in threads (the nuclear block for reply chains)
- Configure the location used to determine regional labelers

### TODO: Xan

- [ ] Update branding (especially colors and app icon) to Bitchsky
  - [ ] ./src/view/icons/
  - [ ] ./src/components/WelcomeModal.tsx
  - [ ] ./assets/
- [ ] Setup App Linking for Android (.well-known w/ app package fingerprint)
- [ ] Remove broken Experiments (constellation instance and TODO note)
- [ ] [Coffee](https://git.ari.lt/coffee) for colors in actual themes
- [ ] Automatic PDS detection like other social-app forks
- [ ] Like of or repost of repost icons from blacksky
- [ ] Change followed accounts [on onboarding](https://github.com/blacksky-algorithms/blacksky.community/commit/e36ee43efb4999f070860d7f70122e45b28c1e2b)
- [ ] Change ChatEmptyPill things for English locale
- [ ] Bitchsky PDS and .social site

### Even more wishful or far off

- [ ] iOS app IPA?
- [ ] Move from GitHub to Tangled?
- [ ] Experimental toggle between handle and DID in share links?
- [ ] Move TOS and privacy policy to Jollywhoppers?

## Development Resources

This is a [React Native](https://reactnative.dev/) application, written in the TypeScript programming language. It builds on the `atproto` TypeScript packages (like [`@atproto/api`](https://www.npmjs.com/package/@atproto/api)), which are also open source, but in [a different git repository](https://github.com/bluesky-social/atproto).

There is vestigial Go language source code (in `./bskyweb/`), for a web service that returns the React Native Web application in the social app deployment. However, it is not used in current Bitchsky deployments.
For Bitchsky, the intended deployment is with a webserver that can serve static files, and reroute to `index.html` as needed. [Bitchsky](https://bitchsky.app) is currently hosted on [Cloudflare Pages](https://pages.cloudflare.com/).

The [Build Instructions](./docs/build.md) are a good place to get started with the app itself. If you use nix (and especially direnv) then `flake.nix` will get you a working environment for the web version of the app.

The Authenticated Transfer Protocol ("AT Protocol" or "atproto") is a decentralized social media protocol. You don't *need* to understand AT Protocol to work with this application, but it can help.
You may wish to reference [resources linked in social-app](https://github.com/bluesky-social/social-app#development-resources). However, please don't harass the Bluesky team with issues or questions pertaining to Bitchsky.

Bitchsky is a fork of the official client, social-app. It encompasses a set of schemas and APIs built in the overall AT Protocol framework. The namespace for these "Lexicons" is `app.bsky.*`.

## Contributions

> Bitchsky is a community fork, and we'd love to merge your PR!

As a rule of thumb, the best features for Bitchsky are those that offer a strong positives that have a disproportionately positive impact on the user experience compared to the maintenance overhead. Unlike some open source projects, since Bitchsky is a soft fork, any features (patches) we add on top of upstream social-app need to be maintained. For example, a change to the way skeets are composed may be very invasive, touching lots of code across the codebase. If upstream refactors this component, we will need to rewrite this feature to be compatible or drop it from the client.

For this reason, bias towards features that change a relatively small amount of code that is present upstream.

Without an overriding motivation, opinionated features should exist behind a toggle that is not enabled by default. This allows Bitchsky to cater to as many users as possible.

**Guidelines:**

- Check for existing issues before filing a new one please.
- Open an issue and give some time for discussion before submitting a PR.
  - This isn't strictly necessary, but I'd love to give my thoughts and scope out your willingness to maintain the feature before you write it.
- Stay away from PRs like...
  - Changing "Post" to "Skeet." 🧌
  - Refactoring the codebase, e.g., to replace React Query with Redux Toolkit or something.
- Include a new toggle and preference for your feature.

If we don't merge your PR for whatever reason, you are welcome to fork and/or self-host:

## Forking guidelines

Just like social-app, you have our blessing 🪄✨ to fork this application! However, it's very important to be clear to users when you're giving them a fork.

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

We ❤️ you and all of the ways you support us. Thank you for making Bluesky & Bitchsky so great!
