# Campaign links — روابط الحملات

One link per channel. It works on **both** platforms: iPhone lands in the App Store, Android in
Google Play, desktop sees the app page — and every case carries the campaign tag.

## Ready to paste — اكتفائي Ektifai

| Channel | Link |
| --- | --- |
| Instagram bio | `https://binaskar.org/apps/ektifai?c=ig_bio` |
| TikTok bio | `https://binaskar.org/apps/ektifai?c=tt_bio` |
| Snapchat bio | `https://binaskar.org/apps/ektifai?c=sc_bio` |
| YouTube bio / description | `https://binaskar.org/apps/ektifai?c=yt_bio` |

Swap the `c=` token per channel — that is the only part that changes.

### Why one link instead of two

Putting the iOS link in a bio loses every Android install, and vice versa. This link detects the
device and forwards it, so a single bio entry covers both stores with attribution intact:

| Visitor | Lands on |
| --- | --- |
| iPhone / iPad | `https://apps.apple.com/sa/app/id6793854538?ct=ig_bio&mt=8` |
| Android | `https://play.google.com/store/apps/details?id=org.binaskar.ektifai&referrer=utm_source%3Dinstagram%26utm_medium%3Dbio%26utm_campaign%3Dwein_rah_ratbak` |
| Desktop | the app page, with both store buttons tagged |

The direct store links above still work if a placement demands one — they are exactly what this
link produces.

## Reading the numbers

- **iOS** — App Store Connect → App Analytics → Campaigns. The token appears as the campaign name
  (`ig_bio`, `tt_bio`, `sc_bio`). Apple reports installs per campaign only; it does not pass the
  token into the app.
- **Android** — Play Console → Acquisition → Campaign traffic, split by `utm_source` /
  `utm_medium` / `utm_campaign`. The Play Install Referrer also hands the string to the app on
  first launch, so in-app events can be tied back to the channel.

## Options

| Parameter | Purpose | Example |
| --- | --- | --- |
| `c` | Channel token. Also accepted as `ct`. | `?c=ig_bio` |
| `campaign` | Override the campaign name (default `wein_rah_ratbak`). | `?c=ig_bio&campaign=ramadan_2027` |
| `stay` | Do **not** auto-forward; show the app page even on a phone. Useful when the post is about the product rather than the download. | `?c=ig_bio&stay=1` |

### Adding a channel

Any well-formed token works immediately, so a new link never breaks — but an **unregistered** token
reports as `utm_source=<token>` on `utm_medium=onelink`, which lands apart from the registered
channels in Play Console. Registering it is one line in `CHANNELS` in `src/lib/app-links.ts`:

```ts
x_bio: { source: "twitter", medium: "bio" },
```

Registered today: `ig_bio` · `tt_bio` · `sc_bio` · `yt_bio`. Ask before running a campaign on a
channel that is not on that list, so its numbers group correctly from the first click.

Tokens are limited to letters, digits, `_` and `-`, up to 40 characters. Anything else is ignored
and the visitor still reaches the store — attribution is dropped, never the download.

## Other apps

The same pattern works for any app in the registry: `https://binaskar.org/apps/{app}?c={channel}`,
e.g. `https://binaskar.org/apps/hido?c=ig_bio`. Fursara is a browser extension, so its page lists
the browser stores instead.
