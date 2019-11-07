import moment from 'moment' ;
moment.locale('pt-BR');

export const formatDate = (date) => {
  if (date) {
      const options = {
      day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'
      };    
      let formatter = new Intl.DateTimeFormat('pt-BR', options);
      if (formatter.resolvedOptions().timeZone.toLowerCase() === 'etc/unknown') {
      options.timeZone = 'UTC';
      formatter = new Intl.DateTimeFormat('en-US', options);
      }    
      return formatter.format(new Date(date));
  }
}

export const sortByDateWithMoment = (array, field) => {
  return array.sort(function compare(a, b) {
    var dateA = new Date(a[field]);
    var dateB = new Date(b[field]);
    return dateB - dateA;
  });
}

export const generateRandomNumberSmallerThan24 = () => {
  const randomNumber = Math.floor(Math.random() * 100);
  return randomNumber <= 24 ? randomNumber : generateRandomNumberSmallerThan24();
}

export const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100);
}