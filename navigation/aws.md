---
layout: post 
search_exclude: true
show_reading_time: false
permalink: /prism/aws
author: Mihir B, Manas G, Adi K, Yash P, Pranav S, Anvay V
---

## AWS Deployment Process for Backend/Database

### Prerequisites

1. **AWS Account**: Get the active AWS account from Mr. Mortensen. [AWS](https://aws.amazon.com/).
2. **IAM User**: Create an IAM user - Identity and Access Management, so that we have permissions we need.
3. **AWS CLI**: Install and configure the AWS CLI on local machine. Follow the instructions [here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).

### Test Server

Ensure that we have a working frontend-to-backend test server. If it does not work locally, there is no need to try it on deployment.

### Subdomain

Setup DNS endpoint through AWS Route 53.

```yml
Server: https://prism2025.nighthawkcodingsociety.com/
Domain: nighthawkcodingsociety.com
Subdomain: prism2025
```

### Port (Backend)

Select a unique port for the application. Update all locations:

- **main.py**: Prepare the localhost test server port to run on the same port for consistency.
  ```python
  if __name__ == "__main__":
      app.run(debug=True, host="0.0.0.0", port="8505")
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
  ENV GUNICORN_CMD_ARGS="--workers=1 --bind=0.0.0.0:8505"
  EXPOSE 8505
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
              - "8505:8505"
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
          proxy_pass http://localhost:8505; (MINE)
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

Prepare the frontend to access our domain and ports to match our localhost, port 8505 (OURS OURS OURS OURS OURS), and domain settings.

- **assets/api/config.js**:
  ```javascript
  export var pythonURI;
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      pythonURI = "http://localhost:8505";
  } else {
      pythonURI = "https://prism2025.nighthawkcodingsociety.com";
  }
  ```

## Accessing AWS EC2

Login to AWS Console using our account.
Access EC2 Dashboard and launch an instance.
Select CSP

![Our EC2]({{site.baseurl}}/images/fake_ec2.png)

Alternatively, use Cockpit:

At cockpit.stu.nighthawkcodingsociety.com
Username is ubuntu
Password hint is 3 Musketeers

## Application Setup

1. **Finding a Port**: Run `docker ps` to make sure port 8505 is open
2. **On localhost setup Docker files using VSCode**: Make sure the Dockerfile and docker-compose.yml match port 8505 on AWS EC2.
- Use docker-compose up in the repo folder
- Access the server after it's done building in browser on localhost:8505

## Server Setup

1. **Clone backend repo**: `git clone https://github.com/illuminati1618/prism_backend.git`
2. **Navigate to repo**: `cd prism_backend`
3. **Build site**: `docker-compose up -d --build`
4. **Test site**: `curl localhost:8505`

### Route 53 DNS

Go to AWS Route 53 and setup DNS subdomain for backend server.

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

1. **Try to curl**: `curl localhost:8505`
2. **Run docker-compose ps**
3. **Run docker ps**

# AWS Flowchart (How it works/Process)

![Flowchart](https://i.ibb.co/PsVPh0WP/pako-e-Npdl-N1u-Gj-EQh-V9lt-Be9-Si-KRqjd-Uqh-QWSEg-I2b-AQqpqo-Mrs-Du-PHa-K-80-QSHv-Xq9t-Nl-Cu-MPOd-G.png)

## Quick Notes on Deployment (From Mortenson's Slack Message)

To login to the deployment server on AWS EC2 you will use cockpit backdoor.
https://cockpit.stu.nighthawkcodingsociety.com/ 

The username for the account is shown in the image and is "ubuntu" in all lowercase.You will need to DM Mr. Mortenson if you will be Deployment admin for the 3 Musketeer password.

## First Time Install (Steps in Order)

### 1. **Run `./scripts/db_init.py`**
- This script likely initializes the database by creating tables, inserting default values, or running migrations. This will reset the data tables.
- To execute:
  
  ```bash
  python3 ./scripts/db_init.py
  ```
  
- Ensure you have the required dependencies installed:
  
  ```bash
  pip install -r requirements.txt
  ```

### 2. **In your repo, run Docker commands**
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

### 3. **Test your server, use `curl` to verify response**
- Check if your container is running:
  
  ```bash
  docker ps
  ```
  This lists all active containers and their assigned ports.

- Send a request to your application to verify it's working:
  
  ```bash
  curl localhost:8505
  ```

### **Security Note**
- **Never** store passwords directly in your code.
- Use `.env` files and **never commit them to GitHub**.
- `.gitignore` should include `.env` to prevent accidental uploads.


---

## **NGINX & Certbot Setup**

### **Route 53 DNS**

Go to AWS Route 53 and set up a DNS subdomain for the backend server.

### **NGINX Setup**

1.  **Go to nginx directory and create an Nginx config file**:
    
    ```bash
    cd /etc/nginx/sites-available
    sudo nano prism
    
    ```
    
2.  **Add the following config:**
    
    ```nginx
    server {
        listen 80;
        listen [::]:80;
        server_name prism2025.nighthawkcodingsociety.com;
        location / {
            proxy_pass http://localhost:8505;
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
    
3.  **Save the file** (`Ctrl + X`, then `Y`, then `Enter`).
    
4.  **Activate configuration**:
    
    ```bash
    cd /etc/nginx/sites-enabled
    sudo ln -s /etc/nginx/sites-available/prism /etc/nginx/sites-enabled
    
    ```
    
5.  **Check for all proper configs and restart Nginx**:
    
    ```bash
    sudo nginx -t
    sudo systemctl restart nginx
    
    ```
    
6.  **Test if Nginx is serving requests**:  
    Open **[http://prism2025.nighthawkcodingsociety.com](http://prism2025.nighthawkcodingsociety.com/)** in our browser.
    

----------

### **Certbot Configuration for HTTPS**

Here are all the steps we will follow to install Certbot to deploy our site

1.  **Install Certbot**:
    
    ```bash
    sudo apt-get install certbot python3-certbot-nginx
    ```
    
2.  **Run Certbot to get SSL certificate**:
    
    ```bash
    sudo certbot --nginx
    ```
    
3.  **Follow the prompts**:
    -   Select `prism2025.nighthawkcodingsociety.com` from the list.
    -   Choose option `2` because it will redirect us from HTTP to HTTPS, which is more secure.
4.  **Restart Nginx**:
    
    ```bash
    sudo systemctl restart nginx
    ```
    
5.  **Test HTTPS access**:  
    Open **[https://prism2025.nighthawkcodingsociety.com](https://prism2025.nighthawkcodingsociety.com/)** in our browser.

----------

## **Updating Deployment**

### **Changing Code in VSCode**

Steps:
1.  **Run `git pull` before making changes**.
2.  **Open terminal in VSCode and run `python main.py`**.
3.  **Make changes that are needed**.
4.  **Commit the changes locally**.
5.  **Test `docker-compose up` or `sudo docker-compose up` in VSCode terminal**.
6.  **Push changes to GitHub**.

### **Pulling Changes into AWS EC2 Deployment**

1.  **Navigate to repo**:
    
    ```bash
    cd ~/prism_2025
    ```
    
2.  **Stop running containers**:
    
    ```bash
    docker-compose down
    ```
    
3.  **Pull the latest code**:
    
    ```bash
    git pull
    ```
    
4.  **Rebuild the docker container**:
    
    ```bash
    docker-compose up -d --build
    ```
    

----------

## **Debugging NGINX**

  - If something fails, we will **check Nginx logs**:
    
    ```bash
    sudo tail -f /var/log/nginx/error.log
    ```

## Notes from CB Big Idea 4:

The internet is just a network of connected computers, and AWS provides a bunch of services such as compute, storage, and networking.

TCP handshake to establish a connection:
<br>
<img src="https://i.ibb.co/4nrSWrrQ/676fffa13937ff6a6bdaa846-627cb3d4fcfd563ee9f2d43d-How-does-TCP-work.jpg">
<br>

### What happens when you open a webpage hosted on AWS:

When you open a webpage hosted on AWS, your browser sends a request through the Internet to a remote server on AWS. Routers and switches help forward the packets until they reach the AWS server, which returns the webpage data. This process uses TCP/IP protocols and handshake to ensure reliable transfer. Once the data arrives back at your computer, the browser displays the webpage content.
<br>
The network layer of the TCP/IP protocol is responsible for accepting and delivering the packets that contain the data of our website.
