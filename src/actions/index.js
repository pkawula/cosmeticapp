export const Clients = {
  get: () => window.localStorage.getItem('clients'),
  save: item => {
    if (Clients.get()) {
      const clients = JSON.parse(Clients.get());
      clients.push(item);

      window.localStorage.setItem('clients', JSON.stringify(clients));
    } else if (item.length) {
      window.localStorage.setItem('clients', JSON.stringify(item));
    } else {
      window.localStorage.setItem('clients', JSON.stringify([item]));
    }
  },
  delete: () => window.localStorage.removeItem('clients'),
  update: item => {
    Clients.delete();
    Clients.save(item);
  },
};
