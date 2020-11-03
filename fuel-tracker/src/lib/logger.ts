const logger = () => {
    return {
        info: (message) => console.info(`${message}`),
        warn: (message) => console.warn(`${message}`),
        error: (error) => console.error(`${error && error.stack ? error.stack : (error || '')}`),
    };
};

export default logger();
