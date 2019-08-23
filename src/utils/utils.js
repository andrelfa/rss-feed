export const formatDate = (date) => {
  if (date) {
      const options = {
      day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC'
      };    
      let formatter = new Intl.DateTimeFormat('pt-BR', options);
      if (formatter.resolvedOptions().timeZone.toLowerCase() === 'etc/unknown') {
      options.timeZone = 'UTC';
      formatter = new Intl.DateTimeFormat('en-US', options);
      }    
      return formatter.format(new Date(date));
  }
}