# Digital Bible Journal

A little journal I'd actually want to open every morning. Bible verses on one side, your own thoughts on the other, and a calm, floating interface so it doesn't feel like homework.

## What's inside

- **Old Testament and New Testament**: 292 and 230 verses (KJV, public domain), 522 in total. Filter by book, search them, favorite them, mark them as read, copy them, and write your own note under each one.
- **Search**: look through every verse at once. Try "peace", "fear" or "love".
- **Favorite Verses**: everything you hearted, in one place.
- **Reading Tracker**: progress bars for both testaments.
- **Gratitude Journal, Prayer Journal, Hymns, Chapter Summary, Keywords, Sermon Notes, Notes**: write as much as you like. Everything saves while you type.
- **SOAP Bible Study**: Scripture, Observation, Application, Prayer, with room for each.
- **Prayer List**: add requests, tick them off when God answers.
- **Habit Tracker**: the last 7 days, with streaks.
- **Verse of the day** on the home screen, plus a dark mode (the moon button).
- **Backup / Restore**: download your journal as a file and load it back anytime.

## How to use it

1. Keep the `dbjv1` folder together. Don't move files out of it.
2. Double-click `index.html`. It opens in any modern browser. No install, no server, no account.
3. Tap a tile and start writing.

On a phone or tablet, open `index.html` in the browser, then "Add to Home Screen" so it feels like an app.

## What's in the folder

Everything sits in one flat folder, no subfolders:

- `index.html`: the page itself (structure only)
- `style.css`: my own design (colors, floating animation, dark mode)
- `tailwind.css`: Tailwind utilities (built, `tw-` prefix)
- `bootstrap.min.css` and `bootstrap.bundle.min.js`: Bootstrap
- `bootstrap-icons.min.css` plus `bootstrap-icons.woff2` and `.woff`: the icons
- `data.js`: all the Bible verses
- `app.js`: the app logic
- `README.md`: this file

Bootstrap handles the layout, forms, buttons and toasts. Tailwind handles the gradients, rounded corners and shadows. Tailwind classes carry a `tw-` prefix so the two never fight each other. Everything is bundled locally, so it works offline too.

It's built mobile-first: a bottom tab bar on phones, a 2-column home grid that grows to 5 columns on desktop, and a scrollable habit table on narrow screens.

## Where does my writing go?

It's saved in your browser (localStorage), only on your device. Nothing is uploaded anywhere. Because of that:

- Clearing your browser data wipes the journal, so press **Backup** once in a while.
- Using a different browser or device means starting fresh. Use Restore to bring your backup over.

## Making it yours

All the verses live in `data.js`, one per line in the format `Book 1:1|Verse text`. Add your own lines and they show up automatically. Colors are the variables at the top of `style.css`.

## Notes

- The Google Fonts link is optional. Offline, it falls back to your system fonts. Dark mode follows your device by default.
- Animations turn off automatically if your device is set to reduce motion.
- Verse text is from the King James Version, which is in the public domain.

Made with care. God bless your reading. 🙏
