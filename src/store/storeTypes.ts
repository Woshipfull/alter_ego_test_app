export type News = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export interface INewsStore {
  news: Array<News>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: Array<string | undefined>;
  startPoint: number;
}

export interface IAppStateStore {
  isAutorised: boolean,
}

export interface IState {
  news: INewsStore,
  appState: IAppStateStore,
}