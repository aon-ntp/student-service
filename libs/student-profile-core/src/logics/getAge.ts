import { Result } from '@inh-lib/common';

export type GetAgeType = typeof getAge

export function getAge(date: Date, currantDate: Date):Result<number> {

  try {
    const now = currantDate;
    const current_year = now.getFullYear();
    const year_diff = current_year - date.getFullYear();
    const birthday_this_year = new Date(
      current_year,
      date.getMonth(),
      date.getDate()
    );
    const has_had_birthday_this_year = now >= birthday_this_year;

    return has_had_birthday_this_year
      ? Result.ok(year_diff)
      : Result.ok(year_diff - 1);
  } catch (error) {
   return Result.fail(error as Error);
  }
}
