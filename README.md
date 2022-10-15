# communities
Internal website for Hippo communities

## How to develop the website locally

### 1. Checkout the project

```bash
git clone --recurse-submodules git@github.com:hippo-digital/communities.git
```

### 2. Install dependencies

Requires Node.js

```bash
npm install
```

### 3. Run the project

```bash
npm run dev
```

## Updating content from the Wiki

```bash
git submodule deinit --force _wiki
git submodule update --init --remote --merge --force
```