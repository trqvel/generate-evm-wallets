import { mnemonicToEntropy, generateMnemonic } from 'bip39';
import { privateKeyToAccount } from 'viem/accounts';
import * as fs from 'fs';
import * as path from 'path';

async function createWalletFromMnemonic() {
    // Генерируем случайную сид-фразу
    const mnemonic = generateMnemonic();

    // Конвертируем сид-фразу в энтропию и используем как приватный ключ
    const entropy = mnemonicToEntropy(mnemonic);

    // Приватный ключ создается из энтропии напрямую
    const privateKey = `0x${entropy}` as `0x${string}`; // Приведение типа

    // Получаем аккаунт на основе приватного ключа
    const account = privateKeyToAccount(privateKey);

    console.log("Адрес:", account.address);
    console.log("Приватный ключ:", privateKey);
    console.log("Сид-фраза:", mnemonic);

    // Записываем данные в CSV
    await appendToCSV({ address: account.address, privateKey, mnemonic });

    return { address: account.address, privateKey, mnemonic };
}

async function appendToCSV(data: { address: string; privateKey: string; mnemonic: string }) {
    const filePath = path.resolve("wallets.csv");
    const csvLine = `${data.address},${data.privateKey},${data.mnemonic}\n`;

    // Проверяем, существует ли файл
    if (!fs.existsSync(filePath)) {
        // Если файл не существует, добавляем заголовки
        fs.writeFileSync(filePath, "Address,PrivateKey,Mnemonic\n");
    }

    // Добавляем строку с данными в CSV
    fs.appendFileSync(filePath, csvLine);
}

// Создаем кошелек и записываем результат в CSV
createWalletFromMnemonic().catch(console.error);
