# Insights & Innovations — Website Source

Welcome to the source code for `innovateinsightfully.com`. This is a static HTML/CSS/JS site, which means: no database, no server, no build step. Three files (`index.html`, `about.html`, `styles.css`) plus images and fonts make up the entire site.

---

## Quick preview right now

Before doing anything else, see the site working on your computer:

1. Open the `insights-and-innovations` folder
2. Double-click `index.html`
3. Your default browser will open with the full site
4. Click around. Resize the window to see the mobile layout. Test the form (it'll show a configuration message until you set up Formspree).

That's the entire site running locally. No installation, no setup. If something looks wrong here, it'll look wrong on the live site too, so this is your testing environment.

---

## File map

```
insights-and-innovations/
├── index.html          ← Home page: pitch-focused
│                          (Hero → About teaser → How We Work → Services → ConnectInk → Contact)
├── about.html          ← About subpage: depth
│                          (Hero → Mission/Vision → Story → Team → Partners → How We Work expanded → CTA)
├── styles.css          ← All styling for both pages
├── scripts.js          ← Mobile nav, form submission
├── README.md           ← This file
├── images/
│   ├── gradient-hero.jpg
│   ├── gradient-connectink.jpg
│   ├── gradient-contact.jpg
│   ├── connectink-logo-cream.png    (for dark backgrounds)
│   ├── connectink-logo-navy.png     (for cream backgrounds, in case you need it)
│   └── cycle-diagram.svg
└── fonts/
    └── NeueMontreal-*.otf  (8 font weight files)
```

---

## Editing content

### To change text on the page

1. Open the HTML file (`index.html` for home, `about.html` for the about page) in any text editor
2. Find the text you want to change — it's between HTML tags, like:
   ```html
   <h1>Where insight becomes innovation.</h1>
   ```
3. Change the text between the tags. Don't touch the tags themselves.
4. Save the file. Refresh your browser.

**You can't break the site by editing text content.** Worst case, you save a typo. Just don't delete the `<` or `>` brackets.

### To swap an image

1. Save your new image into the `images/` folder
2. Use the same filename as the one you're replacing (e.g., to swap the hero gradient, save your new image as `gradient-hero.jpg` — it'll overwrite the old one)
3. Refresh the browser

For the team portrait placeholders (the gradient blocks for Rahul and Julio):

1. Get a portrait photo of each person (cropped to roughly 4:5 portrait ratio)
2. Save as `rahul.jpg` and `julio.jpg` in the `images/` folder
3. In `about.html`, find the team section and replace:
   ```html
   <div class="member-photo rahul" role="img" aria-label="Portrait placeholder for Rahul Patel">
     <span class="member-photo-label">Portrait</span>
   </div>
   ```
   with:
   ```html
   <img src="images/rahul.jpg" alt="Rahul Patel" class="member-photo">
   ```
4. Do the same for Julio.

### To change colors site-wide

Open `styles.css`. Near the top, find this section:

```css
:root {
  --cream:     #F2EDED;
  --navy:      #11132A;
  --blue:      #4490D9;
  ...
}
```

Change the hex codes. Every place that color is used on the site updates automatically.

### To change fonts

The fonts live in the `fonts/` folder. To swap to a different font, replace the .otf files with your new ones and update the `@font-face` declarations at the top of `styles.css` to match your new font's filename.

---

## Setting up the contact form (5 minutes, do this before launching)

The form sends submissions to your email via Formspree, which is a free service.

1. Go to **formspree.io** and sign up using `rahul@innovateinsightfully.com`
2. Create a new form. Name it "Insights & Innovations Contact"
3. Formspree gives you an endpoint URL that looks like:
   ```
   https://formspree.io/f/abc12345
   ```
4. Open `index.html` and find this line near the contact section:
   ```html
   <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
   ```
5. Replace `YOUR_FORMSPREE_ID` with your actual ID (the part after `/f/`, e.g., `abc12345`)
6. Save the file
7. Test by submitting the form. The first time you do, Formspree sends a confirmation email — click the link in that email to activate the form.

After this, every form submission arrives in your inbox.

Formspree free tier: 50 submissions/month. More than enough for a consultancy site. If you ever exceed it, paid plans start at $10/month.

---

## Publishing the site

Two options. GitHub Pages is what we recommend.

### Option 1: GitHub Pages (recommended)

**Time: ~15 minutes for first setup. ~30 seconds per future update.**

#### One-time setup

1. **Create a GitHub repository.** Go to github.com, click "+ New repository."
   - Name it `insights-and-innovations` (or whatever you want)
   - Make it Public (GitHub Pages requires this on the free tier)
   - Don't initialize with a README (you already have one)
   - Click "Create repository"

2. **Upload the files.** You have two ways:

   **Easy way:** GitHub's web uploader.
   - On your new empty repo page, click "uploading an existing file"
   - Drag the entire contents of your `insights-and-innovations` folder into the upload area
   - Wait for all files to upload (the font files are biggest, ~50KB each)
   - Click "Commit changes" at the bottom

   **Better way (using Git):**
   ```bash
   cd path/to/insights-and-innovations
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/insights-and-innovations.git
   git push -u origin main
   ```

3. **Turn on GitHub Pages.** In your repo:
   - Click "Settings" (top tab)
   - Click "Pages" (left sidebar)
   - Under "Source," select "Deploy from a branch"
   - Branch: `main`, folder: `/ (root)`
   - Click "Save"
   - GitHub gives you a URL like `https://your-username.github.io/insights-and-innovations/`
   - Wait 1-2 minutes, then visit that URL. Your site is live.

4. **Connect your custom domain.**
   - In Pages settings, find "Custom domain"
   - Enter `innovateinsightfully.com` and click Save
   - GitHub creates a `CNAME` file in your repo automatically
   - Go to your domain registrar (where you bought the domain)
   - Update DNS records:
     - Add 4 A records pointing to GitHub's IPs:
       ```
       185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
       ```
     - Add a CNAME record for `www` pointing to `your-username.github.io`
   - DNS changes take 1-24 hours to propagate
   - Once they do, your site is live at `innovateinsightfully.com`
   - Check the "Enforce HTTPS" box in Pages settings (may need to wait an hour for the certificate to issue)

#### To update the site later

1. Edit any file in your local folder (or directly on GitHub.com)
2. Save changes
3. If editing locally: push to GitHub
   ```bash
   git add .
   git commit -m "Description of what you changed"
   git push
   ```
4. Within 1-2 minutes, your live site updates automatically.

### Option 2: Cloudflare Pages

Same idea, slightly faster deploys (~30s vs ~2min), and includes built-in form handling (though we're already using Formspree). Setup at pages.cloudflare.com — connect your GitHub repo, follow their prompts.

### Option 3: Drag-and-drop to Netlify

If you really don't want to deal with GitHub:

1. Go to app.netlify.com
2. Drag your entire `insights-and-innovations` folder onto their "Deploy" area
3. Done. They give you a `*.netlify.app` URL
4. Connect your custom domain in their dashboard

Downside: to update later, you have to re-drag the whole folder. No version history. Not recommended long term.

---

## Using Claude Code to edit (recommended for ongoing work)

Once your site is in a GitHub repo, you can use Claude Code to make changes by talking instead of editing files manually.

1. Install Claude Code: https://docs.claude.com/en/docs/agents-and-tools/claude-code
2. Open your terminal, navigate to your site folder
3. Run `claude` to start a session
4. Tell Claude what you want changed:
   - "Change the hero headline to X"
   - "Add a new section about workshops between Services and ConnectInk"
   - "The contact form colors look off, can you fix them?"
   - "Add a new partner called X"
5. Claude reads your files, makes the changes, and you review before committing

This is the easiest way to maintain the site without learning HTML/CSS in depth.

---

## Common edits, quick reference

### Add a new partner logo

In `about.html`, find the `partners-grid` section. Add a new line:
```html
<div class="partner">New Partner Name</div>
```

When you have actual logo files, replace the text with an `<img>`:
```html
<div class="partner"><img src="images/logos/partner-name.svg" alt="Partner Name"></div>
```

### Update a team bio

Find the `member-bio` paragraph in `about.html`. Edit the text inside. (Team only appears on the About page now — home page is intentionally focused on the pitch.)

### Change the email address the form sends to

You don't. The form sends to wherever your Formspree account is configured. Log into Formspree to change the destination email.

### Add a blog or case studies

Static HTML doesn't have a CMS, so you'd add new pages manually (e.g., `case-study-1.html`). For more than a handful of pages, consider migrating to a CMS-backed system later. We can revisit this when it's needed.

---

## Troubleshooting

**"The fonts don't look right."** Browsers can't load fonts when you open `index.html` by double-clicking — they need a local server. Fix: in your terminal, run `cd insights-and-innovations && python3 -m http.server 8000`, then open `http://localhost:8000` in your browser. Fonts will work properly.

**"The form isn't working."** Make sure you've completed Formspree setup (see above) and replaced `YOUR_FORMSPREE_ID` in `index.html`.

**"My update didn't appear on the live site."** GitHub Pages takes 1-2 minutes to rebuild after a push. Hard refresh your browser (Cmd+Shift+R / Ctrl+Shift+R) to bypass cached files.

**"The site looks broken on my phone."** Open the desktop version and resize your browser window to mobile width to test. If it looks broken there too, something's off. If it only looks broken on the actual phone, clear your phone's browser cache.

---

## Things you'll want to do before/after launch

### Before launch (essential)
- [ ] Set up Formspree and replace `YOUR_FORMSPREE_ID`
- [ ] Replace team portrait placeholders with real photos (or accept gradient placeholders for v1)
- [ ] Replace the About video placeholder or remove it if you're not making the video yet
- [ ] Update partner names if any are wrong
- [ ] Click every link to make sure they go where you expect
- [ ] Read every word for typos
- [ ] Test the form by submitting it from a fresh browser

### Soon after launch
- [ ] Add Google Analytics or Plausible (privacy-friendly alternative)
- [ ] Add a favicon (the small icon in browser tabs) — save as `favicon.ico` in the root folder
- [ ] Set up search engine indexing (Google Search Console)
- [ ] Real partner logos as SVG files in `images/logos/`
- [ ] Replace the ConnectInk product preview placeholder with a real screenshot

### Eventually
- [ ] Add case studies as new pages
- [ ] Add a newsletter signup (Buttondown, ConvertKit, or similar)
- [ ] Add a blog (would require some restructuring or a static site generator like Astro)

---

## Asking for help

If you get stuck or want to make a change you're not sure how to do, you have a few options:

- Open the file and use Claude Code (recommended for code changes)
- Ask Claude in chat (paste relevant parts of the file)
- Hire a freelance front-end developer for a couple hours ($50-150)

You own the entire codebase. It's portable, standards-based HTML/CSS/JS. Any developer in the world can pick it up.

---

Built with care. Edit with confidence.
