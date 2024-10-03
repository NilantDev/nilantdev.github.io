var Task = {
    getTodayTask: function(data) {
        const currentDate = new Date();
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const diffMilliseconds = currentDate - startOfYear;
        const weekNumber = Math.ceil(diffMilliseconds / (1000 * 60 * 60 * 24 * 7));
        
        return data[weekNumber];
    }
}