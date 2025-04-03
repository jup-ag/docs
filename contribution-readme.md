# Contributing to Jupiter Documentation

This document is a guide for contributing to the Jupiter documentation. If you are not sure what is the best approach to make changes, you can reach out to the team via [Discord](https://discord.gg/jup) or make an issue in this repository.

## Understanding the Documentation Structure

The documentation is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

- **Configuration**: The documentation configuration is located in the `docusaurus.config.js` file.
- **CSS**: The CSS files are located in the `/src/css` folder.
- **Navbar**: The navbar config is located in the `/src/constant.ts` file.
- **Sidebars**: The sidebar config of the dev docs are located in the `sidebars-docs.js` file.
- **Markdown files**: The content of the dev docs is located in the `/docs` folder.

For API schema:

- **Configuration**: The API schema configuration uses the `docusaurus-plugin-openapi-docs` plugin in `docusaurus.config.js`.
- **OpenAPI schemas**: The OpenAPI schemas are located in the `/openapi` folder.
- **OpenAPI generation**:
  - To generate the markdown from the schema run `pnpm docusaurus gen-api-docs <all or a specific id>` or
  - To clean the generated files run `pnpm docusaurus clean-api-docs <all or a specific id>`.
  - The markdown files are generated in the `/docs/api` folder.

## tldr of making changes

- To add a new page, create a new markdown file in the `/docs/<category>` folder.
- To add a new category, create a new folder in the `/docs` folder and every category has its own sidebar and navbar config.
  - Add it to the `/src/constant.ts` file to add to navbar.
  - Add it to the `sidebars-docs.js` file.
