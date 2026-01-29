const useTimeDifference = (now: number, scheduled: number) => {
    return now - scheduled;
};

export default useTimeDifference;
