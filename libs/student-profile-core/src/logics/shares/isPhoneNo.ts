export const isPhoneNo = (mobile: string) => {
    const r = RegExp(/^((0)\d{9,9})$/);
    return r.test(mobile);
  };