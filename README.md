# eren.icu

Personal portfolio and web home for **eren.icu**.

## Configuration

Shared site text, bio sections, social links, and works live in `site.config.json`.

- `site`: Name, handle, domain suffix, email, focus line, headline, subheadline, contact prompt, and social links.
- `about`: Bio intro, background paragraphs, and stack groups.
- `works`: List of projects (`title`, `year`, `category`, `status`, `featured`, `url`, `repo`, `links`, `summary`, `description`, and `tags`).

Project previews are rendered as GitHub-style repository cards by `src/components/github-repo-preview.tsx`. Page-specific headings and descriptions remain in their route files under `src/app`.

## Pages

- `/`: Overview, selected works, introduction, and contact details
- `/about`: Background, technical stack, and contact links
- `/works`: Filterable showcase of projects and experiments
- `/contact`: Direct email, GitHub, and Telegram links

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```
