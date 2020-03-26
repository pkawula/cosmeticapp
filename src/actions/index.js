export const Clients = {
  get: () => window.localStorage.getItem('clients'),
  save: item => {
    if (window.localStorage.getItem('clients')) {
      const clients = JSON.parse(window.localStorage.getItem('clients'));
      clients.push(item);

      window.localStorage.setItem('clients', JSON.stringify(clients));
    } else {
      window.localStorage.setItem('clients', JSON.stringify([item]));
    }
  },
};
