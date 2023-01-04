export function calculateAgeInYears (date:Date,currantDate:Date) {
    const now = currantDate;
    const current_year = now.getFullYear();
    const year_diff = current_year - date.getFullYear();
    const birthday_this_year = new Date(current_year, date.getMonth(), date.getDate());
    const has_had_birthday_this_year = (now >= birthday_this_year);

    return has_had_birthday_this_year
        ? year_diff
        : year_diff - 1;
}