# Francesco Giordano — Personal Academic Website

Static site. No build step required. Open `index.html` in a browser to preview locally.

## Files

| File | Purpose |
|---|---|
| `index.html` | About / homepage |
| `research.html` | Working papers and other work |
| `more.html` | Placeholder (coming soon) |
| `contact.html` | Contact information |
| `style.css` | All shared styles |
| `cv.pdf` | Add your CV here (not included) |
| `CNAME` | Custom domain (GitHub Pages) |

## Deployment: GitHub Pages

1. Push all files to the root of a GitHub repository (e.g. `username/username.github.io` for a user site, or any repo for a project site).
2. In the repository, go to **Settings → Pages**.
3. Under **Branch**, select `main` (or `master`) and the root folder `/`, then click **Save**.
4. Your site will be live at `https://username.github.io` (user site) or `https://username.github.io/repo-name` (project site) within a minute or two.

## Deployment: Custom Domain

1. Replace `yourdomain.com` in `CNAME` with your actual domain (e.g. `francescogiordano.com`).
2. Push all files including `CNAME` to your GitHub repository and enable Pages as above — GitHub will automatically pick up the `CNAME`.
3. At your domain registrar, add an **A record** pointing your root domain to GitHub's servers:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
   Or add a **CNAME record** pointing `www` to `username.github.io`.
4. DNS propagation typically takes a few minutes to a few hours.
5. HTTPS is provisioned automatically by GitHub once DNS resolves.

## Updating content

- **Photo**: Replace the `<div class="photo-placeholder">` in `index.html` with `<img src="photo.jpg" alt="Francesco Giordano" class="photo">` and add `.photo { width:120px; height:120px; border-radius:50%; object-fit:cover; }` to `style.css`.
- **CV**: Drop your `cv.pdf` into the same folder as the HTML files.
- **Profile links**: Update the `href` attributes on the action links in `index.html` (HEC Paris page, Google Scholar, SSRN).
- **Paper PDFs**: Add `<a class="paper-pdf" href="paper.pdf" target="_blank">PDF</a>` inside any `.paper-entry` in `research.html`.
