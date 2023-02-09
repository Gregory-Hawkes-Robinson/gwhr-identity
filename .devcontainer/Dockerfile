# Installs Node.js image
FROM node:18.12.1

# node may come with an older version of npm. Ensure we have a specific npm.
# RUN npm run install -g npm@18.12.1

################################################################################
# Install prerequisites
RUN apt-get update
RUN apt-get install -y \
    lsb-release \
    curl \
    nano
    
RUN npm install -g typescript

# RUN git config user.name "Gregory Hawkes-Robinson"
# RUN git config user.email "greg@boomreturns.com"

# Expose the port
EXPOSE 5001