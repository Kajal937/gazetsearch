module.exports = {
  env: {
    // Define environment variables based on the current environment
    ENV_FILE: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local',
    BE_URL: process.env.BE_URL
  },
  images: {
    domains: ['technofixstore.s3.eu-north-1.amazonaws.com', 't3.ftcdn.net','img.freepik.com'], // Add your allowed domains here
  },
};

