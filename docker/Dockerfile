FROM ubuntu:20.04
RUN \
  # configure the "yeoman" user
  groupadd yeoman && \
  useradd yeoman -s /bin/bash -m -g yeoman -G sudo && \
  echo 'yeoman:yeoman' |chpasswd && \
  mkdir /home/yeoman/generator && \
  export DEBIAN_FRONTEND=noninteractive && \
  export TZ=Europe\Paris && \
  ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \
  apt-get update && \
  # install utilities
  apt-get install -y \
	  wget \
    sudo && \
  # install node.js
  wget https://nodejs.org/dist/v18.15.0/node-v18.15.0-linux-x64.tar.gz -O /tmp/node.tar.gz && \
  tar -C /usr/local --strip-components 1 -xzf /tmp/node.tar.gz && \
  # install yeoman
  npm install -g yo && \
  # cleanup
  apt-get clean && \
  rm -rf \
    /home/yeoman/.cache/ \
    /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/*

# install generator
RUN npm install -g generator-generator

# expose the working directory
USER yeoman
ENV PATH $PATH:/usr/bin
WORKDIR "/home/yeoman/generator"
VOLUME ["/home/yeoman/generator"]
CMD ["yo", "generator"]