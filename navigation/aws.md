---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /prism/aws
---

## AWS Deployment Process for Backend/Database

### Prerequisites

1. **AWS Account**: Get the active AWS account from Mr. Mortensen. [AWS](https://aws.amazon.com/).
2. **IAM User**: Create an IAM user - Identity and Access Management, so that we have permissions we need.
3. **AWS CLI**: Install and configure the AWS CLI on your local machine. Follow the instructions [here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).

### Test Server

Ensure you have a working frontend-to-backend test server. If it does not work locally, there is no need to try it on deployment.

### Subdomain

Setup DNS endpoint through AWS Route 53.

```yml
Server: https://flask2025.nighthawkcodingsociety.com/
Domain: nighthawkcodingsociety.com
Subdomain: flask2025
```

### Port (Backend)

Select a unique port for your application. Update all locations:

- **main.py**: Prepare the localhost test server port to run on the same port for consistency.
  ```python
  if __name__ == "__main__":
      app.run(debug=True, host="0.0.0.0", port="8087")
  ```

- **Dockerfile**: Prepare this file to run a server as a virtual machine on the deployment host.
  ```dockerfile
  FROM docker.io/python:3.11
  WORKDIR /
  RUN apt-get update && apt-get upgrade -y && \
      apt-get install -y python3 python3-pip git
  COPY . /
  RUN pip install --no-cache-dir -r requirements.txt
  RUN pip install gunicorn
  ENV GUNICORN_CMD_ARGS="--workers=1 --bind=0.0.0.0:8087"
  EXPOSE 8087
  ENV FLASK_ENV=production
  CMD [ "gunicorn", "main:app" ]
  ```

- **docker-compose.yml**: Prepare this file to serve as the “make” for Docker.
  ```yaml
  version: '3'
  services:
      web:
          image: flask2025
          build: .
          env_file:
              - .env
          ports:
              - "8087:8087"
          volumes:
              - ./instance:/instance
          restart: unless-stopped
  ```

- **nginx_file**: Prepare this file for reverse proxy (the way this works is that the information is sent from the internet to the application and back to the requester.)
  ```nginx
  server {
      listen 80;
      listen [::]:80;
      server_name prism.nighthawkcodingsociety.com;
      location / {
          proxy_pass http://localhost:8085; (MINE)
          if ($request_method = OPTIONS) {
              add_header "Access-Control-Allow-Credentials" "true" always;
              add_header "Access-Control-Allow-Origin"  "https://nighthawkcoders.github.io" always;
              add_header "Access-Control-Allow-Methods" "GET, POST, PUT, DELETE, OPTIONS, HEAD" always;
              add_header "Access-Control-Allow-MaxAge" 600 always;
              add_header "Access-Control-Allow-Headers" "Authorization, Origin, X-Origin, X-Requested-With, Content-Type, Accept" always;
              return 204;
          }
      }
  }
  ```

### Port (Frontend)

Prepare the frontend to access your domain and ports to match your localhost, port, and domain settings.

- **assets/api/config.js**:
  ```javascript
  export var pythonURI;
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      pythonURI = "http://localhost:8085"; (MINE)
  } else {
      pythonURI = "https://prism.nighthawkcodingsociety.com";
  }
  ```

### Accessing AWS EC2

Login to AWS Console using our account.

### Application Setup

1. **Finding a Port**: Run `docker ps` to make sure port 8085 is open
2. **On localhost setup Docker files using VSCode**: Make sure the Dockerfile and docker-compose.yml match port 8085 on AWS EC2.

### Server Setup

1. **Clone backend repo**: `git clone github.com/server/project.git my_unique_name`
2. **Navigate to repo**: `cd my_unique_name`
3. **Build site**: `docker-compose up -d --build`
4. **Test site**: `curl localhost:8085` (replace ‘8—’ with your port number)

### Route 53 DNS

Go to AWS Route 53 and setup DNS subdomain for backend server.

### Nginx setup

1. **Navigate to nginx**: `cd /etc/nginx/sites-available`
2. **Create an nginx config file**: `sudo nano projectUniqueName`
3. **Activate configuration**: `cd /etc/nginx/sites-enabled`, then `sudo ln -s /etc/nginx/sites-available/projectUniqueName /etc/nginx/sites-enabled`
4. **Validate**: `sudo nginx -t`
5. **Restart nginx**: `sudo systemctl restart nginx`

### Certbot Config

Run command below and follow prompts:
```bash
sudo certbot --nginx
```

--- FIX EVERYTHING AFTER THIS

### Changing Code will require Deployment Updates

1. **Make sure to git pull before making changes**
2. **Open terminal in VSCode and run python3 main.py**
3. **Make changes that are needed**
4. **Commit your changes locally**
5. **Test docker-compose up or sudo docker-compose up in your VSCode terminal**
6. **Sync change from UI or git push from terminal**

### Pulling Changes into AWS EC2 deployment

1. **Navigate to your repo**: `cd ~/my_unique_name`
2. **docker-compose down**
3. **git pull**
4. **Rebuild your docker container**: `docker-compose up -d --build`

### Optional, Troubleshooting checks on AWS EC2

1. **Try to curl**: `curl localhost:8---` (replace ‘8—’ with your port number)
2. **Run docker-compose ps**
3. **Run docker ps**

### Cockpit Navigation

Login to Cockpit by accessing your subdomain. The left navigation bar in Cockpit presents a few options that you can select:

- **Overview**
- **Logs**
- **Storage**
- **Networking**
- **Accounts**
- **Services**
- **Software Updates**
- **Terminal**
- **Update hostname and system time**
- **User account settings**

### Congratulations!

Congratulations on deploying your site with AWS!