# 📚 inkWell

**inkWell** is a lightweight **Library Management Console** built using **AWS Lambda**, **DynamoDB**, and **API Gateway**.  
This serverless application allows users to **add**, **delete**, and **update** books seamlessly through a clean and responsive interface.

<img width="382" height="354" alt="Screenshot 2025-07-15 033822" src="https://github.com/user-attachments/assets/71caae1e-9207-41f9-8888-84d98b6be71b" />
<img width="494" height="312" alt="Screenshot 2025-07-15 033757" src="https://github.com/user-attachments/assets/cf31f8db-8f10-4e52-ad88-14b75ba19f13" />


---

## 🚀 Features

- 📖 Add new books to your library
- ✏️ Update existing book details
- ❌ Delete books from the collection
- ☁️ Fully serverless architecture using AWS Lambda
- 🧱 DynamoDB as the persistent data store
- 🌐 API Gateway for RESTful access
- 🖥️ Easy local development setup

---

## 🛠️ Tech Stack

| Layer      | Technology                   |
| ---------- | ---------------------------- |
| Backend    | AWS Lambda (Node.js)         |
| Database   | AWS DynamoDB                 |
| API Layer  | AWS API Gateway              |
| Frontend   | Node.js App (local)          |
| Deployment | Manual setup via AWS Console |

---

## ⚙️ Local Setup Instructions

Follow these steps to get inkWell running locally:

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/soham-0-0-7/inkWell
cd inkwell
```

# ⚙️ Setup Guide for inkWell

Follow the step-by-step instructions below to set up and run **inkWell** locally using AWS Lambda, API Gateway, and DynamoDB.

---

## 2️⃣ Create a Lambda Function

1. Go to the [AWS Lambda Console](https://console.aws.amazon.com/lambda).
2. Click **Create function**.
3. Choose **Author from scratch**.
4. Set a function name and choose the **Node.js runtime**.
5. Create or select an appropriate **IAM role** with permissions to access DynamoDB.
6. Once the function is created, replace the default Lambda code with the contents of `lambda.js` from this repository.

---

## 3️⃣ Setup API Gateway

1. Go to the [API Gateway Console](https://console.aws.amazon.com/apigateway).
2. Click **Create API** and select **REST API** (not HTTP or WebSocket).
3. Add the following endpoints and connect each to your Lambda function:
    - `GET /books`
    - `PUT /books`
    - `DELETE /books/{id}`
    - `GET /books/{id}`
4. For each method:
    - Select **Lambda Function** as the integration type.
    - Make sure to enable **CORS** if accessing from a browser.
5. Deploy the API (Create a **new stage** like `dev`) and **copy the invoke URL**.  
   Example: `https://abc123.execute-api.region.amazonaws.com/dev`

---

## 4️⃣ Configure Environment Variable

1. Create a `.env` file in the root directory of your project.
2. Add the following line:

```ini
API_URL = <your-api-gateway-url>
```

#### Working ( video ) --> https://drive.google.com/file/d/1TTe9WPs97-EKlBx4reffwwoQZGcymYmn/view?usp=drive_link 
