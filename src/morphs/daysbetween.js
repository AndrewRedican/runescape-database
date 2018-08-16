export default function daysBetween(date1,date2){
    const
        one_day       = 1000 * 60 * 60 * 24,
        date1_ms      = date1.getTime(),
        date2_ms      = date2.getTime(),
        difference_ms = Math.abs(date2_ms - date1_ms)
    return Math.round(difference_ms/one_day) 
}