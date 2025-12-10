export interface TriangleData {
  count: number;
  sticks: number;
  formula: string;
}

export enum TabView {
  VISUALIZER = 'VISUALIZER',
  AI_TUTOR = 'AI_TUTOR'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}