# IDon-DecentralizedID-Management-System

1. Run the Hardhat and create fake accounts:

```shell
npx --yes hardhat node
```

1. Configure MetaMask to include Hardhat localhost:
    - Network Name: Hardhat Local
    - New RPC URL: [http://127.0.0.1:8545](http://127.0.0.1:8545/)
    - Chain ID: 31337
    - Currency Symbol: ETH

1. Deploy the contract:

```shell
npx --yes hardhat run scripts/deploy.js --network localhost
``` 

1. Running Client app:

```shell
npm start
```

1. Running Third-Party server:

```shell
npm run dev
``` 

1. Links:
    - Client app: http://localhost:3000/
    - Third-Party app: http://localhost:3050/




