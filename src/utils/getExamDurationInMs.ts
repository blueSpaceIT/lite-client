const getExamDurationInMs = (duration: {
    hours: number;
    minutes: number;
    seconds: number;
}) => {
    return (
        (duration.hours * 3600 + duration.minutes * 60 + duration.seconds) *
        1000
    );
};

export default getExamDurationInMs;
