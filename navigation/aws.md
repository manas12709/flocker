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
      app.run(debug=True, host="0.0.0.0", port="8085")
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
  ENV GUNICORN_CMD_ARGS="--workers=1 --bind=0.0.0.0:8085"
  EXPOSE 8085
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
              - "8085:8085"
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

### Changing Code will require Deployment Updates

1. **Run git pull before making changes**
2. **Open terminal in VSCode and run python main.py**
3. **Make changes that are needed**
4. **Commit the changes locally**
5. **Test docker-compose up or sudo docker-compose up in VSCode terminal**
6. **Sync change from UI/git push from terminal**

### Pulling Changes into AWS EC2 deployment

1. **Navigate to repo**: `cd ~/prism_2025`
2. **docker-compose down**
3. **git pull**
4. **Rebuild docker container**: `docker-compose up -d --build`

### Troubleshooting checks on AWS EC2

1. **Try to curl**: `curl localhost:8085`
2. **Run docker-compose ps**
3. **Run docker ps**

# AWS Flowchart (How it works/Process)

![Flowchart](https://mermaid.ink/img/pako:eNpdlN1uGjEQhV9ltBe9SiKRqjdUqhQWSEgI2bAQqpqoMrsDuPHaK_80QSHvXq9tNlCuMPOdGc8cD-9JIUtMusmay9diS5WBWf_7UoD7XJHcuB-e4fz8B_TIWG6YACPhapE_B6LnQylJFVKDMLq6h7lGdRLtk5HQhnIOXyCVYs02VmGTA9LxKJJ9Tw7IDLWBsSwohxzV3zbToInvR2t4leqFic0ehiRHY2ufZyqtK_7tK-R2VcqKMvG_TEjzKR10yJC9xTIjrS3q0OIgqIb-cO0KcCwM9GjxgqKETLpRBOLaEzdkXpdN203Fi3oHr8xsIajwhL_x_IhkCmvqmu9Ll1KtGccIjDxw2wKlB84LWdVS48Wu4hG89eBdCwpnydvvJhOspYIpuplphEzJt12U3HnJuJUMlRSmaSiYcfFHR3DswfsTn2GQXsbwvQ9PSMqlwHYqU6xlBCYeeCA9y3gJOXOTsdpNPLYbqQdPZcHqYHLEUqsObWbeuNwWBWq9h8dodmt0f5KfkEPKuHtVe8g6ZKakXXHUWykPBYK9D0Hx6A_TmHLSDLB9l9QweXg8U8_l5Ily5m3-4prVzUIEUcRyj83I1ApIUZmVq9pYkefjSMw8MSepWzRIt1RsULtkfay53FUoDIR3dPBh7lsKzzPie5h3nL6qmHHKzOrtIRJaezpW-tVqdZcks7xNBEx8Gnt0hZM0T_6wOJmkMyhebxEm7jYo7M4eFh0yxZV3PVh9NKrGAFYc7pkdp5jINsNPMhCly5-cJRUqt0-l-0d6b-BlYrZY4TLpuq8lVS_LZCk-HEetkflOFEnXKItnibvrZpt015Rrd7J-on1GN4pW7a81Fb-kPJw__gHKGpKg?type=png)

## Quick Notes on Deployment (From Mortenson's Slack Message)

To login to the deployment server on AWS EC2 you will use cockpit backdoor.
https://cockpit.stu.nighthawkcodingsociety.com/ 

The username for the account is shown in the image and is "ubuntu" in all lowercase.You will need to DM Mr. Mortenson if you will be Deployment admin for the 3 Musketeer password.

## First Time Install (Steps in Order)

### 1. **Login**
- Log into your development environment (your computer, a cloud server, or a remote machine).
- This could mean using SSH (`ssh user@server`), logging into a local terminal, or signing into a version control platform like GitHub.

### 2. **Clone your repo**
- Copy the project repository from GitHub (or another Git-based platform) onto your local machine.
- Example command:
  
  ```bash
  git clone https://github.com/your-username/your-repo.git
  cd your-repo
  ```

### 3. **In your project directory, create a `.env` file with passwords**
- The `.env` file stores environment variables like database passwords, API keys, or secret keys.
- This file is usually ignored by Git to keep credentials secure.
- Example:
  
  ```bash
  touch .env
  nano .env
  ```
  Inside `.env`, you might add:
  
  ```
  DB_USER=username
  DB_PASSWORD=supersecretpassword
  ```

### 4. **Run `./scripts/db_init.py`**
- This script likely initializes the database by creating tables, inserting default values, or running migrations.
- To execute:
  
  ```bash
  python3 ./scripts/db_init.py
  ```
  
- Ensure you have the required dependencies installed:
  
  ```bash
  pip install -r requirements.txt
  ```

### 5. **In your repo, run Docker commands**
- Docker is used to containerize the application, ensuring a consistent environment.

- **Build the Docker images:**
  
  ```bash
  docker-compose build
  ```
  This creates or updates the necessary containers.

- **Run the containers in detached mode (-d for background running):**
  
  ```bash
  docker-compose up -d
  ```
  This starts the application and related services (like a database or web server).

### 6. **Test your server, use `curl` to verify response**
- Check if your container is running:
  
  ```bash
  docker ps
  ```
  This lists all active containers and their assigned ports.

- Send a request to your application to verify it's working:
  
  ```bash
  curl localhost:8085
  ```

### **Security Note**
- **Never** store passwords directly in your code.
- Use `.env` files and **never commit them to GitHub**.
- `.gitignore` should include `.env` to prevent accidental uploads.






