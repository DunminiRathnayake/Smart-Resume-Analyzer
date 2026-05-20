# 🚀 Smart Resume Analyzer

An advanced, AI-powered resume analysis and optimization platform built with the MERN stack and Google Gemini Pro API. This application evaluates resumes against target job descriptions to provide real-time ATS scoring, keyword extraction, skill gap assessments, personalized cover letters, interview preparation questions, and targeted LinkedIn profile suggestions.

---

## ✨ Key Features

*   **🔒 Secure Authentication:** Modern registration and login system protected with state-of-the-art JWT (JSON Web Tokens) encryption.
*   **📄 PDF Resume Parsing:** Secure multi-format upload with automated PDF text extraction directly in the backend.
*   **📊 Comprehensive ATS Scoring:** Real-time analysis evaluating keyword matching, formatting, structure, and readability to provide an absolute ATS compatibility score.
*   **🔍 Skill Gap Analysis:** Categorized display showing detected skills side-by-side with missing skills required by the target job description.
*   **📈 Actionable Feedback:** Clean, prioritized cards outlining Strengths, Weaknesses, and Concrete Improvement suggestions.
*   **✍️ Personalized AI Cover Letter:** Automatically drafts a tailored, high-converting cover letter based on your matched skills.
*   **💡 Smart Interview Preparation:** Generates categorized mock interview questions (Technical, Project-based, Behavioral, and Alignment) tailored to your profile gaps.
*   **💼 LinkedIn Profile Optimizer:** Analyzes the resume and target role to suggest optimizations for headlines, About sections, featured projects, and skill keywords.
*   **📥 On-the-Fly PDF Downloads:** Instantly compiles and streams a beautifully formatted, multi-page PDF Analysis Report directly to the browser.
*   **📂 History Dashboard:** View previous analyses, deletion control, and access historical scores anytime.

---

## 🛠️ Tech Stack

### **Frontend**
*   **Library:** React.js (v19)
*   **Build Tool:** Vite (v8)
*   **Styling:** Tailwind CSS (Modern Glassmorphism & custom gradients)
*   **State & Routing:** React Router DOM (v7) & React Context API
*   **Animations:** Framer Motion

### **Backend**
*   **Runtime Environment:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB Atlas (Mongoose ODM)
*   **API Client:** Axios
*   **File Upload:** Multer (with secure PDF parsing)

### **AI & PDF Processing**
*   **AI Engine:** Google Gemini Pro API (`@google/generative-ai`)
*   **PDF Generation:** PDFKit (highly styled multi-page PDF rendering)

---

## 📸 Screenshots Section

> *Placeholder: Add professional screenshots or GIFs of your application landing, dashboard, and PDF output here.*

---

## ⚙️ Environment Variables

Create a `.env` file in the `/server` directory and configure the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

---

## 🚀 Installation & Local Run Guide

Follow these steps to run both the frontend and backend servers locally:

### **1. Clone the Repository**
```bash
git clone https://github.com/DunminiRathnayake/Smart-Resume-Analyzer.git
cd Smart-Resume-Analyzer
```

### **2. Setup Backend Server**
```bash
cd server
npm install
# Create .env and configure variables
npm run dev
```

### **3. Setup Frontend Client**
In a new terminal window:
```bash
cd client
npm install
npm run dev
```

The frontend application will boot at `http://localhost:5173/` and securely proxy requests to the backend server running at `http://localhost:5000/`.

---

## 🔌 API Endpoints Summary

### **Authentication**
*   `POST /api/auth/register` - Create a new user profile.
*   `POST /api/auth/login` - Authenticate user and retrieve JWT token.
*   `GET /api/auth/me` - Get current authenticated user profile.

### **Resume Analysis**
*   `POST /api/resumes/analyze` - Upload resume (PDF) and target job description for full AI evaluation.
*   `GET /api/resumes` - Retrieve list of all historical analyses for the current user.
*   `GET /api/resumes/:id` - Fetch single analysis report details.
*   `DELETE /api/resumes/:id` - Permanently delete analysis record.
*   `GET /api/resumes/:id/report` - Stream beautifully formatted PDF report of the analysis.

---

## 🔮 Future Enhancements

*   **Multi-format Uploads:** Support for DOCX and TXT resume formats.
*   **Interactive Mock Interviews:** Speech-to-text enabled AI voice mock interviews.
*   **Job Recommendation Engine:** Automatically fetch and suggest real-time job openings matching the resume score.
*   **Public Link Sharing:** Allow sharing the generated MERN reports using secure public access URLs.

---

## ✍️ Author

*   **Dunmini Rathnayake** - [GitHub Profile](https://github.com/DunminiRathnayake)
