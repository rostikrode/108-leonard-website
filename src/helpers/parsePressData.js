const convertDateToString = (date) => {
  const dateString = date.toISOString().substring(0, 10);
  const dateArray = dateString.split("-");
  const month = dateArray[1];
  const day = dateArray[2];
  const year = dateArray[0];

  return `${month}.${day}.${year}`;
}

const parsePressData = (array) => {
  let parsedAndSortedArray = array.map(article => {
    let { acf } = article;
    let { date, pdf, publisher, subtitle, summary, title } = acf;
    let obj = {
      date: new Date(date),
      pdf,
      publisher,
      subtitle,
      summary,
      title
    }
    return obj;
  }).sort((a,b) => {
    return b.date - a.date;
  }).map(acf => {
    return {
      ...acf,
      date: convertDateToString(acf.date)
    }
  });
  
  return parsedAndSortedArray;
}

export default parsePressData;