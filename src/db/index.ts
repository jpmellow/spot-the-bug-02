import initSqlJs from 'sql.js';

let db: any = null;
let initialized = false;

const initDb = async () => {
  if (initialized) return db;

  try {
    const SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    });

    // Create a new database
    db = new SQL.Database();

    // Initialize tables
    db.run(`
      CREATE TABLE IF NOT EXISTS scenes (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        image TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS bugs (
        id TEXT PRIMARY KEY,
        scene_id TEXT NOT NULL,
        name TEXT NOT NULL,
        fun_fact TEXT NOT NULL,
        prompt TEXT NOT NULL,
        coordinates TEXT NOT NULL,
        image TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (scene_id) REFERENCES scenes(id) ON DELETE CASCADE
      );
    `);

    initialized = true;
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Helper function to ensure database is initialized
const ensureDb = async () => {
  if (!db) {
    await initDb();
  }
  return db;
};

// Scene operations
export const getScenes = async () => {
  try {
    const db = await ensureDb();
    const result = db.exec('SELECT * FROM scenes ORDER BY created_at DESC');
    return result[0]?.values?.map((row: any) => ({
      id: row[0],
      name: row[1],
      image: row[2],
    })) || [];
  } catch (error) {
    console.error('Error getting scenes:', error);
    return [];
  }
};

export const addScene = async (scene: any) => {
  try {
    const db = await ensureDb();
    db.run(
      'INSERT INTO scenes (id, name, image) VALUES (?, ?, ?)',
      [scene.id, scene.name, scene.image]
    );
    return true;
  } catch (error) {
    console.error('Error adding scene:', error);
    throw error;
  }
};

export const updateScene = async (id: string, scene: any) => {
  try {
    const db = await ensureDb();
    const updates = Object.entries(scene)
      .filter(([_, value]) => value !== undefined)
      .map(([key]) => `${key} = ?`)
      .join(', ');

    if (updates) {
      db.run(
        `UPDATE scenes SET ${updates} WHERE id = ?`,
        [...Object.values(scene), id]
      );
    }
    return true;
  } catch (error) {
    console.error('Error updating scene:', error);
    throw error;
  }
};

export const deleteScene = async (id: string) => {
  try {
    const db = await ensureDb();
    db.run('DELETE FROM scenes WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting scene:', error);
    throw error;
  }
};

// Bug operations
export const getBugs = async () => {
  try {
    const db = await ensureDb();
    const result = db.exec('SELECT * FROM bugs ORDER BY created_at DESC');
    return result[0]?.values?.map((row: any) => ({
      id: row[0],
      sceneId: row[1],
      name: row[2],
      funFact: row[3],
      prompt: row[4],
      coordinates: JSON.parse(row[5]),
      image: row[6],
    })) || [];
  } catch (error) {
    console.error('Error getting bugs:', error);
    return [];
  }
};

export const addBug = async (bug: any) => {
  try {
    const db = await ensureDb();
    db.run(
      `INSERT INTO bugs (id, scene_id, name, fun_fact, prompt, coordinates, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        bug.id,
        bug.sceneId,
        bug.name,
        bug.funFact,
        bug.prompt,
        JSON.stringify(bug.coordinates),
        bug.image,
      ]
    );
    return true;
  } catch (error) {
    console.error('Error adding bug:', error);
    throw error;
  }
};

export const updateBug = async (id: string, bug: any) => {
  try {
    const db = await ensureDb();
    const updates = Object.entries(bug)
      .filter(([_, value]) => value !== undefined)
      .map(([key]) => {
        const dbKey = key === 'sceneId' ? 'scene_id' :
                     key === 'funFact' ? 'fun_fact' :
                     key === 'coordinates' ? 'coordinates' : key;
        return `${dbKey} = ?`;
      })
      .join(', ');

    if (updates) {
      db.run(
        `UPDATE bugs SET ${updates} WHERE id = ?`,
        [
          ...Object.values(bug).map(value =>
            value === bug.coordinates ? JSON.stringify(value) : value
          ),
          id,
        ]
      );
    }
    return true;
  } catch (error) {
    console.error('Error updating bug:', error);
    throw error;
  }
};

export const deleteBug = async (id: string) => {
  try {
    const db = await ensureDb();
    db.run('DELETE FROM bugs WHERE id = ?', [id]);
    return true;
  } catch (error) {
    console.error('Error deleting bug:', error);
    throw error;
  }
};