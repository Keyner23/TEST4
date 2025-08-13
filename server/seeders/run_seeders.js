import { loadPlataforms } from "./laod_plataform.js";
import { loadBilling } from "./load_billings.js";
import { loadStatusDb } from "./load_status.js";
import { loadTransaction } from "./load_transaction.js";
import { loadusersdatabase } from "./load_users.js";

(async () => {
    try {
        console.log('🚀 Iniciando seeders...');

        // await loadusersdatabase()
        // await loadStatusDb()
        // await loadPlataforms()
        // await loadTransaction()
        // await loadBilling()

        console.log('✅ Todos los seeders ejecutados correctamente.');
    } catch (error) {
        console.error('❌ Error ejecutando los seeders:', error.message);
    } finally {
        process.exit();
    }
})()