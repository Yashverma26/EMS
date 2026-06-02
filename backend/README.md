Backend setup

Prerequisites
- Node.js >= 16
- MongoDB (local) or MongoDB Atlas

Setup
1. Install dependencies

```bash
cd backend
npm install
```

2. Create env file

```bash
cp config/.env.example config/config.env
# then edit config/config.env and set MONGO_URI
```

3. Run in development

```bash
npm run dev
```

Notes
- `config/config.env` is ignored by git (see .gitignore). Do not commit secrets.
- Default port is 5000 if `PORT` is not set.
