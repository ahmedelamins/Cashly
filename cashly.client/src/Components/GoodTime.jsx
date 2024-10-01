//greeting 
export const goodTime = () => {
    const hr = new Date().getHours();

    if (hr >= 0 && hr < 12) {
        return "Good morning";
    } else if (hr >= 12 && hr <= 15) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
};