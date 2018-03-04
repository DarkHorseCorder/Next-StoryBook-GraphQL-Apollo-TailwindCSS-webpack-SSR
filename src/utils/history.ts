import { createBrowserHistory, History } from 'history';

let history: History;

function getHistory(): History {
  // only create once
  if (history) {
    return history;
  }
  history = createBrowserHistory();
  return history;
}
export default getHistory;
