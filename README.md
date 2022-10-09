# playdust-ui

## Development Setup

### Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Environment variables

The following variables are needed to connect to deployed DBs/APIs:

- OPENSEARCH_USER
- OPENSEARCH_PASSWORD
- OPENSEARCH_URL
- PLAYDUST_API_HOST

These should be added to an `.env` file, values can be found in [Vercel](https://vercel.com/playdust/playdust-ui/settings/environment-variables)

**NOTE: If the values of these variables are sent via Discord, a trailing `/` may get appended to the OPENSEARCH_URL/PLAYDUST_API_HOST values. If the trailing slashes are not removed, the local deployment will be unable to properly query OpenSearch.**

### Local API connection

Enviroment variables are needed to connect to our API, follow these steps for correct configuration

- Clone API project [here](https://github.com/Coral-Reef-Art/auction-house-api)
- Run API project with another port (PORT=8000 npm run dev)
- Create a .env.local file in the root folder
- Add API_HOST key with API server URL as value

All those steps are for connection in local to our API.

# Terminology

### App

- the top level entity
- playdust-ui utilizes a single next.js page, that utilizes hash routing to move between **tabs**
- the playdust **app** contains 1 to many **tabs**

### Tab

- **Tabs** represents a list of **windows**
- Allows user to quickly flip between these **windows** and are persisted between sessions
- A playdust **tab** has 1 to many **windows**

### Window

- Every **window** has one search input / address bar which defines what it renders.
- **windows** pick the right page to render the content referenced by their search-input/address bar value.
- 1 to many **pages**, within a parent **tab** can be viewed at once

### Page

- Each **page** takes a search-input/address as it's source of truth.
- A single **page** is rendering the results of it's search in isolation.
- A **page** is responsible for bootstrapping itself, and composing its needed **modules**
- Each **page** shares the same interface for props
- **page** states are stored as strings, and each window is responsible for parsing its state

### TS Example

```typescript
export interface Window {
  state: string;
  type: WindowUnion;
}

export interface Tab {
  id: string;
  windows: Window[];
}

export interface App {
  tabs: Tab[];
  selectedTabId: string;
}
```

# Analytics

Analytics are recorded via Google Analytics version 4. For Google Analytics setup, reach out to a user with Google Analytics admin access (stan@playdust.com, eugene@playdust.com, philipp@playdust.com, operations@playdust.com). Configuration of the Google Analytics version 4 measurement id is done through the .env file under the key GOOGLE_ANALYTICS_4_MEASUREMENT_ID and it's current value should be set to G-96LZMYF7WY.

# Coding Guidelines

> The guiding principle for the file/code structure is to be as self documenting as possible to avoid manual maintenance.

```
 src/
 ├─ App/
 ├─ api/
 ├─ _types/
```

## `/api`

The api folder contains all nextJS api endpoints in a folder structure following the data / URL structure.

## `/_types`

`types/` contains all shared type definitions between the `api/` and `App/``

## `/App` (Component Folder Structure)

```
MyComponent/
├─ _atoms/
│  ├─ myAtom.ts
│  ├─ mySelector.ts
├─ _hooks/
│  ├─ useMyHook.ts
├─ _helpers/
│  ├─ myHelper.ts
├─ _types/
│  ├─ myType.ts
├─ _sharedComponents/
│  ├─ MySharedComponent/
│  │  ├─ MySharedComponent.tsx
│  │  ├─ [...]
│  ├─ MyCommonGrid.tsx
├─ MyComponent.tsx
├─ MyComponentTitle.tsx
├─ MyComponentFooter.tsx
├─ MyComponentContent/
│  ├─ MyComponentContent.tsx
│  ├─ [...]
```

1. ### Component (Folders)

   If a component becomes too complicated for a single file, a folder `ComponentName/` is created containing `ComponentName.tsx` and all files related to the component.

   > Every component (file) in the folder, must either be the actual parent component or a direct child of the parent.

   > If reasonable, sub components are named `ComponentName[SubComponent].tsx`. This can be broken or abbrevated in order to prevent component names from getting too long.

1. ### Atoms (and Selectors)

   > Selectors are an implementation detail of atoms

   Atoms are split out into the closest `_atoms/` in the component tree. Atom files should end with `Atom.ts`.

   `_atoms/` should contain a flat list of files.

   > Reused Atoms are moved to the closes shared parent components `_atoms/` folder.

1. ### Hooks

   All external and/or shared logic between components is using the hooks interface.

   Hooks are split out into the closest `_hooks/` folder within the component tree and files are named after the hook they export `useMyHook.ts`

   `_hooks/` should contain a flat list of files.

   > Reused Hooks are moved to the closest shared parent components `_hooks/` folder.

1. ### Types

   Types should be defined as close to data creation as possible. Types should either end in `Type.ts` or `Props.ts`.

   **Whenever possible, types should be defined and verified alongside Atoms and Selectors.**

   `_types/` should contain a flat list of files.

   > Reused types are moved to the closest shared parent components `_types/`

1. ### Helpers

   Code that is reused between `_atoms` and/or `_hooks` goes into the `_helpers/` folder.

   `_helpers_/` should contain a flat list of files.

   > Reused helpers are moved to the closest shared parent components `_helpers/`

1. ### Shared Components

   Usually all components are defined within their parent components folder.

   `_sharedComponents/` should contain a flat list of Components (files or folders).

   > Reused Components are moved to the closest shared parent components `_sharedComponents/` folder.

## Libraries/Conventions/Patterns

1. ### Atom & Hook Factories

   Functions that create `hooks` or `atoms` are prefixed with `make` (ie `makeUseMyHook.tsx` or `makeMyAtom.ts`) and live in `_hooks` or `_atoms` respectively.

1. ### One Single export per file

   To keep the file structure self documenting, each file must only export a single `default` export which it is named after. iE. `MyComponent.tsx` exports `<MyComponent … />`

   > A file can define multiple components/atoms/selectors for internal use, but can only export the one it is named after.

1. ### No Shortcuts on Typescript: No `any` and no (/minimal) type casting.

   The real value of Typescript comes when there are no shortcuts being taken. ¨
   Every shortcut introduces a potential for unexpected failures.

1. ### imports

   When the above folder structure is followed, imports adhere to the following easily visible rules:

   - No `import *` since all files export only `default`.
   - Traversing up (ie `../../../_atoms`)
     - should always lead to a `_[folder]`
     - should never lead to a Component
   - Traversing down Components (ie `./MyComponent/MyComponentTitle`)
     - should always lead to a Component
     - should never lead to a `_[folder]`
   - Traversing into `_[folders]` (ie `./_atoms/myAtom.tsx`) should not exceed 2 levels of depth.
     - Correct: `./_atoms/myAtom.tsx`
     - Correct: `./_sharedComponents/MyComponent/MyComponent`
     - Incorrect: `./_sharedComponents/MyComponent/MyComponentTitle`
       > In this case, `MyComponentTitle` should be moved up to `_sharedComponents/`

1. ### AVOID: `setAtomValue` in component render cycle / `useEffect`

   > Writing to atoms should be triggered by events and not by the render loop.

   Using `setAtomValue` within `useEffect` creates an additional, (usually) avoidable, render loop.

   In (almost) all cases the logic in `useEffect` can be moved to a `selector` to avoid the problem.

   > There can be exceptions to this rule very high up in the app to set default environment atoms (if they can't be passed into `RecoilRoot` for some reason). These should be isolated and commented to explain their necessity.

1. ### Styling Components

   - we are using `emotion` as our CSS implementation
     - the preferred method is to use the `emotion/styled` API to add styles to components
   - [VSCode Syntax Highlighting for styled components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components)

## Build Process, Scripting, & Automation 

In order for a build to succeed the following type/lint checks must pass:

- typescript
- eslint
- prettier
- coding guidelines

The following scripts can can be used to view errors:

```bash
# typescript
yarn tsc:check

# eslint
yarn lint

# prettier
yarn prettier:check

# coding guidelines
yarn guidelines:check
```

The following scripts can attempt to automatically fix errors:

```bash
# eslint
yarn lint:fix

# prettier
yarn prettier:write

# coding guidelines
yarn guidelines:write
```

Also recommended is to use the git commit hook, which will automatically check/fix your staged files before committing. This can be turned on/off with the following scripts:

```bash
# enable git hook
yarn hooks:install

# disable git hook
yarn hooks:uninstall
```
