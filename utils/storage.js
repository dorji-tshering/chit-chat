/**
 * handles storing and retrieving data(user_id) from local storage
 * type check so that it does not throw error during static generation/server side rendering which generates HTML on the server
 */
export const saveToStorage = (key, value) => {
    if(typeof window !== 'undefined') {
        return window.localStorage.setItem(key, value);
    }
}

export const getFromStorage = (key) => {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key);
    }
}

export const removeFromStorage = () => {
    if (typeof window !== 'undefined') {
        window.localStorage.clear();
    }
}