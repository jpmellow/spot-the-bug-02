export interface Bug {
  id: string;
  name: string;
  funFact: string;
  prompt: string;
  coordinates: Coordinate[];
  sceneId: string;
  image: string | null;
}

export interface Scene {
  id: string;
  name: string;
  image: string;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface GameState {
  scenes: Scene[];
  currentSceneId: string | null;
  bugs: Bug[];
  currentBugId: string | null;
  isAdmin: boolean;
  showIntro: boolean;
  addScene: (scene: Omit<Scene, 'id'>) => void;
  updateScene: (id: string, scene: Partial<Omit<Scene, 'id'>>) => void;
  deleteScene: (id: string) => void;
  setCurrentScene: (sceneId: string) => void;
  addBug: (bug: Omit<Bug, 'id'>) => void;
  updateBug: (id: string, bug: Partial<Omit<Bug, 'id'>>) => void;
  deleteBug: (id: string) => void;
  setCurrentBug: (bugId: string) => void;
  toggleAdmin: () => void;
  hideIntro: () => void;
}