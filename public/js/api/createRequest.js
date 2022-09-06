/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    const requestParam = [];
    let url;

    if (options.method === 'GET') {
        if (Object.keys(options).includes('data')) {
            if (options.data != undefined) {
                for (let i of Object.entries(options.data)) {
                    const key = i[0],
                        value = i[1];   
                    requestParam.push(`${key}=${value}`);
                }
            } else {
                url = `${options.url}`;
            }
        }
        url = `${options.url}?${requestParam.join('&')}`;
    } 
    else {
        if (Object.keys(options).includes('data')) {
            for (let i of Object.entries(options.data)) {
                const key = i[0],
                    value = i[1];
                formData.append(`${key}`, `${value}`);
            }
            url = `${options.url}`;
        }
    }


    xhr.responseType = 'json';
    xhr.withCredentials = true;
    try {
        xhr.open(options.method, url);
        xhr.send(formData);
    } catch (e) {
        return new Error('Не удалось загрузить данные' + xhr.status);
    }
    xhr.onload = () => options.callback(xhr.error, xhr.response);
};

