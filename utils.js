export const formatDate = (date) => 
Intl.DateTimeFormat(navigator.language,{dateStyle:"short",timeStyle: "short"}).format(date);  // a data foi formatada para o formato local do navegador