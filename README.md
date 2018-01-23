# Bodhi-API
An open source local API server for interacting with the Bodhi-Core platform and Qtum blockchain.

## Get Started

### 1. Clone project
SSH: 
```
git clone git@github.com:bodhiproject/bodhi-api.git
```
or HTTPS: 
```
git clone https://github.com/bodhiproject/bodhi-api.git
```

### 2. Install dependencies 
```
cd bodhi-api
npm install
```

### 3. Run project
```
npm start
```

### 4. Run Qtum daemon
In order to actually call the Qtum blockchain you will need to start the Qtum daemon. You will need to download the latest [Qtum binary](https://github.com/qtumproject/qtum/releases) first.
```
cd qtum-x.xx.xx/bin
./qtumd -testnet -logevents -printtoconsole -rpcuser=bodhi -rpcpassword=bodhi
```

## Commands

### Fixing lint issues
```
npm run lint:fix
```
