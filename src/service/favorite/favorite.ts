export const getFavoriteListLocal = (): string => {
    return localStorage.getItem('favoriteList') || '';
};

export const setFavoriteListLocal = (list: string): void => {
    localStorage.setItem('favoriteList', list);
};

export const setItemToFavoriteList = (id: string, favList: string): string[] => {
  let list: string[] = favList.split(',') || [];

  if (list.length === 0) {
    list.push(id);
  } else {
    if (list.some((itemId: string) => itemId === id)) {
      list = list.filter((itemId: string) => itemId !== id) || [];
    } else {
      list.push(id);
    };
  };

  return list;
};