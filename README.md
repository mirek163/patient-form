# Systém pro správu pacientů

## Přehled
Formulář pro správu pacientů a záznamů. Frontend napsaný v React.js a backend postavený na Node.js a Express.js, který je propojen s databází MySQL.

## Jak spustit projekt na localu

### Backend
1. Složka backend:
   ```bash
   cd backend
   ```
2. Instalace knihoven:
   ```bash
   npm install
   ```
3. Doplnění souboru `.env` s následujícími údaji:
   ```env
   DB_HOST=host
   DB_USER=user
   DB_PASS=password
   DB_NAME=database_name
   JWT_SECRET=wt_secret
   PORT=port
   ```
4. Spustit backend server:
   ```bash
   node index.js
   ```
   Po spuštění serveru bude databáze inicializována s následujícími daty:
   - Uživatel: `doctor@test.cz` s `doctor` rolí a heslo `doctor@test.cz`.
   - Pacientem `Jan Novák` a jeden přislušný záznam `Zlomenina nohy`

### Frontend
1. Složka frontend:
   ```bash
   cd frontend
   ```
2. Instalace knihoven:
   ```bash
   npm install
   ```
3. Spustit vývojový server frontendu:
   ```bash
   npm start
   ```

