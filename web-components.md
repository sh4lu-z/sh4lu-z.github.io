# Using GitHub as a Database

Who needs a dedicated backend when you have the GitHub API? By storing your content as Markdown files in a repository, you get:
- Free hosting
- Version control
- Branching and drafts
- Pull requests for edits!

All it takes is fetching `https://api.github.com/repos/{owner}/{repo}/contents` from the frontend. Decode the Base64, parse the Markdown, and boom! A free CMS.
