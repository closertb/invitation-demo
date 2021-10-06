const servers = {
  local: {
    mock: '//server.closertb.site/client',
    admin: 'http://localhost:3000',
  },
  production: {
    mock: '//server.closertb.site/client',
    admin: 'https://closertb.site/api',
  },
};

const getServers = () => servers[process.env.NODE_ENV || 'production'];

export default getServers;
