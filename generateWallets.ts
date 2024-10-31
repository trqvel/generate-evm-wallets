import { Wallet } from 'viem';

function createNewWallet() {
    // Создаем новый случайный кошелек
    const wallet = Wallet.createRandom();

    // Получаем адрес, приватный ключ и сид-фразу
    const address = wallet.address;
    const privateKey = wallet.privateKey;
    const mnemonic = wallet.mnemonic?.phrase; // Проверяем, что сид-фраза существует

    console.log("Адрес:", address);
    console.log("Приватный ключ:", privateKey);
    console.log("Сид-фраза:", mnemonic);

    return { address, privateKey, mnemonic };
}

// Создаем кошелек и выводим результат
const newWallet = createNewWallet();
