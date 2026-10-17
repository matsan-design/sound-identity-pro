<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Expertise service cards live in one shared ServiceCards component using Button, prepared styles, local selection and native scroll-snap pagination; this preserves existing interactions without duplication or dependencies.
- Keep /free-identity-analysis as a redirect to /our-expertise; this preserves the previously published service URL.
- PageShell accepts an expertise appearance while leaving other pages unchanged; this extends the existing service background across only the expertise page.
