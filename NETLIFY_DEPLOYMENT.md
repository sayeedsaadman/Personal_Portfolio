# Deploy the portfolio on Netlify

The code is ready for Netlify. No live deployment or Gmail notification has been configured from this workspace.

The current `dist/` folder and `portfolio-netlify.zip` are already built for Netlify. You can use the folder immediately. To use the archive, extract it and upload the extracted folder containing `index.html`.

## Option A — upload the built folder

1. In PowerShell, open `D:\Portfolio` and run:

   ```powershell
   npm ci
   npm run build:netlify
   ```

2. Sign in to your Netlify account and open [Netlify Drop](https://app.netlify.com/drop).
3. Drag the **`D:\Portfolio\dist` folder** into the dropzone. Upload the compiled folder, not `src`, `node_modules`, or the whole repository.
4. Open the generated site URL to review it. You can change the project name or add a custom domain in the project's settings.
5. Complete the Forms steps below before relying on the contact form.

Manual uploads do not run a build. For later changes, run `npm run build:netlify` again and upload the new `dist` folder to the **existing project's Deploys page**. [Official manual deployment documentation](https://docs.netlify.com/deploy/create-deploys/).

## Enable submissions and Gmail notifications

1. Open your Netlify project and go to **Forms**.
2. Enable **form detection** if it is disabled.
3. Redeploy the same `dist` folder from the project's Deploys page. Form detection runs when Netlify processes a deploy.
4. Check that a form named **contact** appears. The shipped HTML includes its detection markup and the fields `name`, `email`, and `message`. [Official form setup documentation](https://docs.netlify.com/manage/forms/setup/).
5. Under **Forms → Submission notifications**, choose **Add notification** and select an email notification.
6. Enter **sayeedssaadman272491@gmail.com** as the recipient, choose the `contact` form when the UI offers a form filter, and save.
7. On the live site, submit a recognizable test message with a valid reply email.
8. Confirm the submission appears in Netlify Forms, then check Gmail Inbox and Spam. Netlify's email notification uses the visitor's `email` field as the reply-to address. [Official notification documentation](https://docs.netlify.com/manage/forms/notifications/).

The on-page success message confirms an accepted HTTP submission; it does not prove receipt in Gmail. Treat setup as complete only after the live test appears in both Netlify and Gmail.

## Option B — automatic deploys from GitHub

1. Create a repository under your GitHub account and push this project's source and lockfile. Exclude `node_modules`, `dist`, and private `.env.local` files.
2. In Netlify, choose **Add new project → Import an existing project**, connect GitHub, and select the repository.
3. Use these settings:

   | Setting                     | Value                         |
   | --------------------------- | ----------------------------- |
   | Base directory              | Repository root (leave blank) |
   | Build command               | `npm run build`               |
   | Publish directory           | `dist`                        |
   | Node                        | `22`                          |
   | Public environment variable | `VITE_NETLIFY_FORMS=true`     |

   `netlify.toml` already declares these build settings. [Official project setup documentation](https://docs.netlify.com/manage/projects/add-new-project/).

4. Deploy, then complete the Forms and Gmail steps above. After enabling form detection, trigger another deploy.
5. Future pushes to the configured production branch rebuild the site.

## If the form does not work

- **“Prepare email draft” on a hosted URL:** rebuild with `npm run build:netlify`, or set `VITE_NETLIFY_FORMS=true` for Git builds, then redeploy. Changing a dashboard variable alone does not change an already-built frontend.
- **No `contact` form in Netlify:** enable detection, then redeploy. Confirm the uploaded folder contains `index.html`.
- **Submission error:** check the browser's connection, the Netlify form, and current Forms usage limits in the account.
- **Submission in Netlify but no email:** check the notification recipient and Gmail Spam; form storage and email notification are separate.
- **Localhost prepares a draft:** this is intentional. Netlify Forms is tested on the deployed URL.

Review the mobile layout and send the live form test before sharing the URL publicly.
