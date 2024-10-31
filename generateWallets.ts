import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { privateKeyToAccount } from 'viem/accounts';
import * as fs from 'fs';
import * as path from 'path';
import { HDKey } from '@scure/bip32';
import chalk from 'chalk';

async function generateWallet() {
    const mnemonic = generateMnemonic();
    const seed = mnemonicToSeedSync(mnemonic);
    const hdkey = HDKey.fromMasterSeed(seed);
    const node = hdkey.derive("m/44'/60'/0'/0/0");
    const privateKey = `0x${Buffer.from(node.privateKey!).toString('hex')}` as `0x${string}`;
    const account = privateKeyToAccount(privateKey);

    await appendToCSV({ address: account.address, privateKey, mnemonic });
    return { address: account.address, privateKey, mnemonic };
}

async function createWallets(count: number) {
    const chalk = (await import('chalk')).default;
    for (let i = 0; i < count; i++) {
        await generateWallet();
    }
    console.log(chalk.green.bold(`${count} wallets successfully generated and added to wallets.csv`));
}

async function appendToCSV(data: { address: string; privateKey: string; mnemonic: string }) {
    const filePath = path.resolve("wallets.csv");
    const csvLine = `${data.address},${data.privateKey},${data.mnemonic}\n`;

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "Address,PrivateKey,Mnemonic\n");
    }

    fs.appendFileSync(filePath, csvLine);
}

const walletCount = 10;
createWallets(walletCount).catch(console.error);