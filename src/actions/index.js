export const getClients = () => {
  window.localStorage.getItem('clients');
};

export const saveClient = item => {
  const details = JSON.stringify(item);

  if (window.localStorage.getItem('clients')) {
    const clients = JSON.parse(window.localStorage.getItem('clients'));
    clients.push(details);

    window.localStorage.setItem('clients', JSON.stringify(clients));
  } else {
    window.localStorage.setItem('clients', [details]);
  }
};
