const REACT_HISTORIES_KEY = 'REACT_HISTORIES_KEY';
const pageStatus = { key: '', isPush: true, isChanging: false };

export const histories = (sessionStorage.getItem(REACT_HISTORIES_KEY) || '').split(',').filter(Boolean);

export const isHistoryPush = (location, update) => {
    const key = location.key || location.pathname + location.search;

    if (update && key !== pageStatus.key) {
        const index = histories.lastIndexOf(key);

        if (index > -1) {
            histories.splice(index + 1);
        } else {
            histories.push(key);
        }

        sessionStorage.setItem(REACT_HISTORIES_KEY, histories.join(','));

        Object.assign(pageStatus, {
          isPush: index < 0,
          key
      });
    }

    return pageStatus.isPush;
};

export const setPageChangeStatus = (status = false) => {
  pageStatus.isChanging = status;
}

export const getPageChangeStatus = (status = false) => {
  return pageStatus.isChanging;
}

export const isPageChanging = () => {
  return pageStatus.isChanging === true;
}
