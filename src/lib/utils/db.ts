const DB_NAME = 'tuteurprive_db';
const DB_VERSION = 1;

interface DBSchema {
  profiles: {
    key: string;
    value: any;
  };
  history: {
    key: string;
    value: any;
  };
  settings: {
    key: string;
    value: any;
  };
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains('profiles')) {
        db.createObjectStore('profiles');
      }
      if (!db.objectStoreNames.contains('history')) {
        db.createObjectStore('history');
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings');
      }
    };
  });
}

async function getStore<K extends keyof DBSchema>(
  storeName: K,
  mode: IDBTransactionMode = 'readonly'
): Promise<IDBObjectStore> {
  const db = await openDB();
  const transaction = db.transaction(storeName, mode);
  return transaction.objectStore(storeName);
}

export async function getValue<K extends keyof DBSchema>(
  storeName: K,
  key: string
): Promise<DBSchema[K]['value'] | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const store = await getStore(storeName);
      const request = store.get(key);
      
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    } catch (error) {
      reject(error);
    }
  });
}

export async function setValue<K extends keyof DBSchema>(
  storeName: K,
  key: string,
  value: DBSchema[K]['value']
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const store = await getStore(storeName, 'readwrite');
      const request = store.put(value, key);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    } catch (error) {
      reject(error);
    }
  });
}

export async function deleteValue<K extends keyof DBSchema>(
  storeName: K,
  key: string
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const store = await getStore(storeName, 'readwrite');
      const request = store.delete(key);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getAllValues<K extends keyof DBSchema>(
  storeName: K
): Promise<DBSchema[K]['value'][]> {
  return new Promise(async (resolve, reject) => {
    try {
      const store = await getStore(storeName);
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    } catch (error) {
      reject(error);
    }
  });
}

// Migration utility
export async function migrateFromLocalStorage() {
  try {
    // Migrate profiles
    const profilesData = localStorage.getItem('prof_pandai_profiles');
    if (profilesData) {
      await setValue('profiles', 'profiles', JSON.parse(profilesData));
    }

    // Migrate selected profile
    const selectedProfile = localStorage.getItem('prof_pandai_selected_profile');
    if (selectedProfile) {
      await setValue('settings', 'selectedProfile', selectedProfile);
    }

    // Migrate history
    const historyData = localStorage.getItem('prof_pandai_history');
    if (historyData) {
      await setValue('history', 'history', JSON.parse(historyData));
    }

    // Clear localStorage after successful migration
    localStorage.clear();
  } catch (error) {
    console.error('Error migrating data:', error);
  }
}
