export const stringToDate = (string: string) => {
  const date : string[] = string.split(/[\s,-]+/);
  const months: string[] = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const _date = `${Number(date[2])} ${months[Number(date[1])-1]} ${date[0]}`
  return _date;
};
